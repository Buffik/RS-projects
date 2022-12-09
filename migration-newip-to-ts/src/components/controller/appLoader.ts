import Loader from './loader';

class AppLoader extends Loader {
  constructor() {
    super('https://newsapi.org/v2/', {
      apiKey: 'd0922def67184abdbc97ef1b86bf68f4',
    });
  }
}

export default AppLoader;
