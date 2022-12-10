import { INewsItem } from '../../../types';
import { queryElement } from '../../../types/checkQueryElements';
import './news.css';

class News {
  draw(data: INewsItem[]) {
    const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

    const fragment: DocumentFragment = document.createDocumentFragment();
    const newsItemTemp: HTMLTemplateElement | null = queryElement(document, HTMLTemplateElement, '#newsItemTemp');

    news.forEach((item, idx) => {
      const newsClone = newsItemTemp.content.cloneNode(true) as HTMLTemplateElement; //assert type to native Node-type

      if (idx % 2) {
        const newsItem = queryElement(newsClone, HTMLDivElement, '.news__item');
        newsItem.classList.add('alt');
      }

      const newsMetaPhoto = queryElement(newsClone, HTMLDivElement, '.news__meta-photo');
      newsMetaPhoto.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;

      const newsMetaAuthor = queryElement(newsClone, HTMLLIElement, '.news__meta-author');
      newsMetaAuthor.textContent = item.author || item.source.name;

      const newsMetaDate = queryElement(newsClone, HTMLLIElement, '.news__meta-date');
      newsMetaDate.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');

      const newsDescriptionTitle = queryElement(newsClone, HTMLHeadingElement, '.news__description-title');
      newsDescriptionTitle.textContent = item.title;

      const newsDescriptionSource = queryElement(newsClone, HTMLHeadingElement, '.news__description-source');
      newsDescriptionSource.textContent = item.source.name;

      const newsDescriptionContent = queryElement(newsClone, HTMLParagraphElement, '.news__description-content');
      newsDescriptionContent.textContent = item.description;

      const newsReadMoreLink = queryElement(newsClone, HTMLAnchorElement, '.news__read-more a');
      newsReadMoreLink.setAttribute('href', item.url);

      fragment.append(newsClone);
    });

    const newsTemplate = queryElement(document, HTMLDivElement, '.news');
    newsTemplate.innerHTML = '';
    newsTemplate.appendChild(fragment);
  }
}

export default News;
