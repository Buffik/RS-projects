import AppController from '../controller/controller';
import { AppView } from '../view/appView';
declare class App {
    protected controller: AppController;
    protected view: AppView;
    start(): void;
}
export default App;
