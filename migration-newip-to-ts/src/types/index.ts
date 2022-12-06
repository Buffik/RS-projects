export interface NewsAPI {
  status: string;
  totalResults: number;
  articles: NewsItem[];
}

export interface NewsItem {
  source: NewsItemSource;
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

export interface NewsItemSource {
  id: string | null;
  name: string;
}

export interface SourcesAPI {
  status: string;
  sources: SourcesItem[];
}

export interface SourcesItem {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  language: string;
  country: string;
}
