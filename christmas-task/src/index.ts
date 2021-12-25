import 'nouislider/dist/nouislider.css';
import './style/index.scss';

import startPage from './templates/startPage.html';
import toysPage from './templates/toysPage.html';
import gamePage from './templates/gamePage.html';
import toys from './appData/toys';
import trees from './appData/trees';
import backgrounds from './appData/backgrounds';
import valueFilterProps from './appData/valueFilterProps';
import Router from './components/router';

import { AppData } from './appData/appdata';
import { Content } from './components/content';

const app = new Router(
  new Content(
    new AppData(toys, valueFilterProps, trees, backgrounds),
    startPage,
    toysPage,
    gamePage,
  ),
);

app.init();
