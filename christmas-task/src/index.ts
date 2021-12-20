import 'nouislider/dist/nouislider.css';
import './style/index.scss';
import App from './utils/app';
import { Settings } from './utils/settings';
import toys from './appData/toys';
import valueFilterTypes from './appData/valueFIlterTypes';

const app = new App(new Settings(toys), toys, valueFilterTypes);

app.init();
