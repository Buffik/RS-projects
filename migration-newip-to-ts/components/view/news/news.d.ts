import { INewsItem } from '../../../types';
import './news.css';
import '../../../../src/assets/images/newsPlaceholder.jpg';
declare class News {
    draw(data: INewsItem[]): void;
}
export default News;
