import { Post } from './post';

export type SearchMode = 'suggest' | 'query';
export type SearchQuery = {
  input?: string;
  mode?: SearchMode;
};

export type SearchResult = {
  suggest?: string;
  posts?: Post[];
  autocomplete?: string[];
  most_access?: string[];
};
