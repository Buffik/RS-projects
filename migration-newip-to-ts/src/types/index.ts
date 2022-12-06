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

export function checkedQuerySelector(
  parent: Element | Document,
  selector: string
): Element {
  const el = parent.querySelector(selector);
  if (!el) {
    throw new Error(`Selector ${selector} didn't match any elements.`);
  }
  return el;
}

export function queryElement<T extends typeof Element>(
  container: Document | Element,
  type: T,
  selector: string
): InstanceType<T> {
  const el = checkedQuerySelector(container, selector);
  if (!(el instanceof type)) {
    throw new Error(
      `Selector ${selector} matched ${el} which is not an ${type}`
    );
  }
  return el as InstanceType<T>;
}
