import 'nouislider/dist/nouislider.css';
import './style/index.scss';
import App from './app';
import { AppData } from './appData/appdata';
import toys from './appData/toys';
import valueFilterProps from './appData/valueFilterProps';

const app = new App(new AppData(toys, valueFilterProps));

app.init();
