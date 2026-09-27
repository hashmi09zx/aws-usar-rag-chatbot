export interface Source {
  source: string | null;
  chunk: number | null;
  text: string;
}

export interface ChatRequest {
  question: string;
  top_k: number;
}

export interface ChatResponse {
  answer: string;
  sources: Source[];
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  sources?: Source[];
  timestamp: string;
  isError?: boolean;
}

export type ConnectionStatusType = 'checking' | 'connected' | 'offline';

export interface RecentQuery {
  id: string;
  question: string;
  timestamp: string;
  top_k: number;
}
