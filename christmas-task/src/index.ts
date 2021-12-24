import 'nouislider/dist/nouislider.css';
import './style/index.scss';
import startPage from './templates/startPage.html';
import toysPage from './templates/toysPage.html';
import gamePage from './templates/gamePage.html';
import ToysPage from './components/toysPage';
import { AppData } from './appData/appdata';
import toys from './appData/toys';
import valueFilterProps from './appData/valueFilterProps';
import Router from './components/router';
import { Content } from './components/content';
import GamePage from './components/gamePage';
import StartPage from './components/startPage';

const app = new Router(
  new Content(
    new StartPage(startPage),
    new ToysPage(toysPage, new AppData(toys, valueFilterProps)),
    new GamePage(gamePage),
  ),
);

app.init();
