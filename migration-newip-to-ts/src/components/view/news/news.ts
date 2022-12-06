import { NewsItem } from '../../../types';
import './news.css';

class News {
  draw(data: NewsItem[]) {
    const news =
      data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

    const fragment: DocumentFragment = document.createDocumentFragment();
    const newsItemTemp: HTMLTemplateElement | null =
      document.querySelector('#newsItemTemp');

    news.forEach((item, idx) => {
      if (newsItemTemp) {
        const newsClone: Node = newsItemTemp.content.cloneNode(true);
        if (newsClone instanceof DocumentFragment) {
          if (idx % 2) {
            const newsItem: HTMLDivElement | null =
              newsClone.querySelector('.news__item');

            if (!!newsItem) {
              newsItem.classList.add('alt');
            }
          }
        }

        if (newsClone instanceof DocumentFragment) {
          const newsMetaPhoto: HTMLImageElement | null =
            newsClone.querySelector('.news__meta-photo');
          if (newsMetaPhoto) {
            newsMetaPhoto.style.backgroundImage = `url(${
              item.urlToImage || 'img/news_placeholder.jpg'
            })`;
          }
        } else {
          throw new Error('Something has gone very, very wrong.');
        }

        if (newsClone instanceof DocumentFragment) {
          const newsMetaAuthor: HTMLDivElement | null =
            newsClone.querySelector('.news__meta-author');
          if (newsMetaAuthor) {
            newsMetaAuthor.textContent = item.author || item.source.name;
          }
        }

        if (newsClone instanceof DocumentFragment) {
          const newsMetaDate: HTMLDivElement | null =
            newsClone.querySelector('.news__meta-date');
          if (newsMetaDate) {
            newsMetaDate.textContent = item.publishedAt
              .slice(0, 10)
              .split('-')
              .reverse()
              .join('-');
          }
        }

        if (newsClone instanceof DocumentFragment) {
          const newsDescriptionTitle: HTMLDivElement | null =
            newsClone.querySelector('.news__description-title');
          if (newsDescriptionTitle) {
            newsDescriptionTitle.textContent = item.title;
          }
        }

        if (newsClone instanceof DocumentFragment) {
          const newsDescriptionSource: HTMLDivElement | null =
            newsClone.querySelector('.news__description-source');
          if (newsDescriptionSource) {
            newsDescriptionSource.textContent = item.source.name;
          }
        }

        if (newsClone instanceof DocumentFragment) {
          const newsDescriptionContent: HTMLDivElement | null =
            newsClone.querySelector('.news__description-content');
          if (newsDescriptionContent) {
            newsDescriptionContent.textContent = item.description;
          }
        }

        if (newsClone instanceof DocumentFragment) {
          const newsReadMoreLink: HTMLDivElement | null =
            newsClone.querySelector('.news__read-more a');
          if (newsReadMoreLink) {
            newsReadMoreLink.setAttribute('href', item.url);
          }
        }

        fragment.append(newsClone);
      }
    });

    const newsTemplate: HTMLDivElement | null = document.querySelector('.news');
    if (newsTemplate) {
      newsTemplate.innerHTML = '';
      newsTemplate.appendChild(fragment);
    }
  }
}

export default News;
