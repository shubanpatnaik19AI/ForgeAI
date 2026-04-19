export interface Generation {
  id: string;
  prompt: string;
  html_output: string;
  title: string;
  model: string;
  created_at: string;
}

export type ViewMode = 'preview' | 'code';
export type AppPage = 'landing' | 'generator';
