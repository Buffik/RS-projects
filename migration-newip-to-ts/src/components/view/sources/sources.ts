import { queryElement, SourcesItem } from '../../../types';
import './sources.css';

class Sources {
  draw(data: SourcesItem[]) {
    const fragment: DocumentFragment = document.createDocumentFragment();
    const sourceItemTemp = queryElement(
      document,
      HTMLTemplateElement,
      '#sourceItemTemp'
    );

    data.forEach((item) => {
      const sourceClone = sourceItemTemp.content.cloneNode(
        true
      ) as HTMLTemplateElement; //assert type to native Node-type
      const sourceItemName = queryElement(
        sourceClone,
        HTMLSpanElement,
        '.source__item-name'
      );
      const sourceItem = queryElement(
        sourceClone,
        HTMLDivElement,
        '.source__item'
      );
      sourceItemName.textContent = item.name;
      sourceItem.setAttribute('data-source-id', item.id);
      fragment.append(sourceClone);
    });

    const sourcesTemplate = queryElement(document, HTMLDivElement, '.sources');

    sourcesTemplate.append(fragment);
  }
}

export default Sources;
