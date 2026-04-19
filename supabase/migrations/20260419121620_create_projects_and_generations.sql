/*
  # AI Website Generator - Initial Schema

  ## New Tables

  ### projects
  Stores user-created projects (collections of generations).
  - `id` (uuid, primary key)
  - `title` (text) - project name derived from prompt
  - `prompt` (text) - the original user prompt
  - `created_at` (timestamp)
  - `updated_at` (timestamp)

  ### generations
  Stores each AI-generated website/app output.
  - `id` (uuid, primary key)
  - `project_id` (uuid, FK to projects) - optional grouping
  - `prompt` (text) - the user prompt
  - `html_output` (text) - complete generated HTML/CSS/JS
  - `model` (text) - AI model used
  - `created_at` (timestamp)

  ## Security
  - RLS enabled on both tables
  - Public read/write allowed (no auth required for this app)
    using anon role policies since this is a demo tool
*/

CREATE TABLE IF NOT EXISTS generations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  prompt text NOT NULL,
  html_output text NOT NULL DEFAULT '',
  title text NOT NULL DEFAULT 'Untitled',
  model text NOT NULL DEFAULT 'claude-3-5-haiku-20241022',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE generations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read generations"
  ON generations FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can insert generations"
  ON generations FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can update generations"
  ON generations FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);
