import { SourcesItem } from '../../../types';
import './sources.css';

class Sources {
  draw(data: SourcesItem[]) {
    const fragment: DocumentFragment = document.createDocumentFragment();
    const sourceItemTemp: HTMLTemplateElement | null =
      document.querySelector('#sourceItemTemp');

    data.forEach((item) => {
      if (sourceItemTemp) {
        const sourceClone: Node = sourceItemTemp.content.cloneNode(true);
        if (sourceClone instanceof DocumentFragment) {
          if (sourceClone) {
            const sourceItemName: HTMLDivElement | null =
              sourceClone.querySelector('.source__item-name');
            const sourceItem = sourceClone.querySelector('.source__item');
            if (sourceItemName && sourceItem) {
              sourceItemName.textContent = item.name;
              sourceItem.setAttribute('data-source-id', item.id);
            }
          }
        }
        fragment.append(sourceClone);
      }
    });

    const sourcesTemplate: HTMLTemplateElement | null =
      document.querySelector('.sources');
    if (sourcesTemplate) {
      sourcesTemplate.append(fragment);
    }
  }
}

export default Sources;
