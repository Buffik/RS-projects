import { INewsAPI, ISourcesAPI } from '../../types';
import AppLoader from './appLoader';
declare class AppController extends AppLoader {
    getSources(callback: (data: ISourcesAPI) => void): void;
    getNews(e: Event, callback: (data: INewsAPI) => void): void;
}
export default AppController;
