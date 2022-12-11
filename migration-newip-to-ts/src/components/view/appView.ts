import { INewsAPI, ISourcesAPI } from '../../types';
import { ButtonUp } from './buttonUP/buttonUP';
import News from './news/news';
import Sources from './sources/sources';

export class AppView {
  readonly news: News = new News();
  readonly sources: Sources = new Sources();
  buttonUp: ButtonUp = new ButtonUp();

  drawNews(data: INewsAPI) {
    const values = data?.articles ? data?.articles : [];
    this.news.draw(values);
    this.buttonUp.renderButton();
  }

  drawSources(data: ISourcesAPI) {
    const values = data?.sources ? data?.sources : [];
    this.sources.draw(values);
  }
}

export default AppView;
