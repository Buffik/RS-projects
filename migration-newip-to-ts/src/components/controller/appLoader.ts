import Loader from './loader';

class AppLoader extends Loader {
  constructor() {
    super('https://nodenews.up.railway.app/', {
      apiKey: 'd0922def67184abdbc97ef1b86bf68f4',
    });
  }
}

export default AppLoader;
