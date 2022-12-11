import { INewsAPI, ISourcesAPI } from '../../types';
import { ButtonUp } from './buttonUP/buttonUP';
import News from './news/news';
import Sources from './sources/sources';
export declare class AppView {
    readonly news: News;
    readonly sources: Sources;
    buttonUp: ButtonUp;
    drawNews(data: INewsAPI): void;
    drawSources(data: ISourcesAPI): void;
}
export default AppView;
