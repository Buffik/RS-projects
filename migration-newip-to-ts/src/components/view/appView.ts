import { NewsAPI, SourcesAPI } from '../../types';
import News from './news/news';
import Sources from './sources/sources';

export class AppView {
  news: News = new News();
  sources: Sources = new Sources();

  drawNews(data: NewsAPI) {
    const values = data?.articles ? data?.articles : [];
    this.news.draw(values);
  }

  drawSources(data: SourcesAPI) {
    const values = data?.sources ? data?.sources : [];
    this.sources.draw(values);
  }
}

export default AppView;
