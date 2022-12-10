import { queryElement } from '../../types/checkQueryElements';
import AppController from '../controller/controller';
import { AppView } from '../view/appView';

class App {
  protected controller: AppController = new AppController();
  protected view: AppView = new AppView();

  start() {
    const mainFrame = queryElement(document, HTMLDivElement, '.sources');
    mainFrame.addEventListener('click', (e) => this.controller.getNews(e, (data) => this.view.drawNews(data)));
    this.controller.getSources((data) => this.view.drawSources(data));
  }
}

export default App;
