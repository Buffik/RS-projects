//Types for news from server

export interface INewsAPI {
  status: string;
  totalResults: number;
  articles: INewsItem[];
}

export interface INewsItem {
  source: INewsItemSource;
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

export interface INewsItemSource {
  id: string | null;
  name: string;
}

//--------------------------------

//Types for headers from server

export interface ISourcesAPI {
  status: string;
  sources: ISourcesItem[];
}

export interface ISourcesItem {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  language: string;
  country: string;
}

//--------------------------------

//Types for controller

export type TOptionsForLoader = {
  sources: string;
};

export type TApiKey = {
  apiKey: string;
};

export interface IUrlOptions {
  [index: string]: string;
}

//--------------------------------

//type for handling response Error
export enum ResponseStatus {
  Unauthorized = 401,
  NotFound = 404,
}
