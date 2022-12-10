import { INewsAPI, ISourcesAPI } from '../../types';
import News from './news/news';
import Sources from './sources/sources';

export class AppView {
  readonly news: News = new News();
  readonly sources: Sources = new Sources();

  drawNews(data: INewsAPI) {
    const values = data?.articles ? data?.articles : [];
    this.news.draw(values);
  }

  drawSources(data: ISourcesAPI) {
    const values = data?.sources ? data?.sources : [];
    this.sources.draw(values);
  }
}

export default AppView;
