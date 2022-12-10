import { INewsAPI, ISourcesAPI } from '../../types';
import AppLoader from './appLoader';

class AppController extends AppLoader {
  getSources(callback: (data: ISourcesAPI) => void) {
    super.getResp(
      {
        endpoint: 'sources',
      },
      callback
    );
  }

  getNews(e: Event, callback: (data: INewsAPI) => void) {
    let target = e.target as HTMLElement;
    const newsContainer = e.currentTarget as HTMLTemplateElement;

    while (target !== newsContainer && newsContainer && target) {
      if (target.classList.contains('source__item')) {
        const sourceId = target.getAttribute('data-source-id');
        if (newsContainer.getAttribute('data-source') !== sourceId && sourceId) {
          newsContainer.setAttribute('data-source', sourceId);
          super.getResp<INewsAPI>(
            {
              endpoint: 'everything',
              options: {
                sources: sourceId,
              },
            },
            callback
          );
        }
        return;
      }
      target = target.parentNode as HTMLElement;
    }
  }
}

export default AppController;
