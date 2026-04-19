import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const SYSTEM_PROMPT = `You are an expert web developer who creates stunning, production-ready websites.
When given a prompt, generate a COMPLETE single-file HTML document with:
- Modern, beautiful design using CSS variables and best practices
- Fully responsive layout (mobile-first)
- Smooth animations and micro-interactions
- Proper semantic HTML5 structure
- Inline CSS in a <style> tag
- Optional vanilla JS in a <script> tag
- Use Google Fonts via @import for typography
- Use a professional color palette appropriate for the context
- High attention to detail: shadows, border-radius, spacing, typography hierarchy
- NO external dependencies except Google Fonts
- The complete HTML must be self-contained in one file

Respond with ONLY the complete HTML document. No explanations, no markdown code blocks, just pure HTML starting with <!DOCTYPE html>.`;

function generateTitle(prompt: string): string {
  const words = prompt.trim().split(/\s+/).slice(0, 6).join(' ');
  return words.charAt(0).toUpperCase() + words.slice(1);
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const { prompt } = await req.json();

    if (!prompt || typeof prompt !== "string") {
      return new Response(
        JSON.stringify({ error: "prompt is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const apiKey = Deno.env.get("ANTHROPIC_API_KEY");
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "ANTHROPIC_API_KEY is not configured. Please add it to your Supabase Edge Function secrets." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const anthropicResponse = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-3-5-haiku-20241022",
        max_tokens: 8192,
        stream: true,
        system: SYSTEM_PROMPT,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!anthropicResponse.ok) {
      const err = await anthropicResponse.json();
      return new Response(
        JSON.stringify({ error: err.error?.message || "Anthropic API error" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        const reader = anthropicResponse.body!.getReader();
        const decoder = new TextDecoder();
        let fullHtml = "";

        const send = (data: object) => {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
        };

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            const lines = chunk.split("\n");

            for (const line of lines) {
              if (!line.startsWith("data: ")) continue;
              const raw = line.slice(6).trim();
              if (raw === "[DONE]") continue;

              try {
                const event = JSON.parse(raw);
                if (
                  event.type === "content_block_delta" &&
                  event.delta?.type === "text_delta"
                ) {
                  const text = event.delta.text;
                  fullHtml += text;
                  send({ type: "text", content: text });
                }
              } catch {
                // skip
              }
            }
          }

          const title = generateTitle(prompt);
          const { data: saved } = await supabase
            .from("generations")
            .insert({
              prompt,
              html_output: fullHtml,
              title,
              model: "claude-3-5-haiku-20241022",
            })
            .select()
            .single();

          send({ type: "done", generation: saved });
        } catch (err) {
          const msg = err instanceof Error ? err.message : "Stream error";
          send({ type: "error", message: msg });
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        ...corsHeaders,
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Internal server error";
    return new Response(
      JSON.stringify({ error: msg }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
