import StartPage, { StartPageInt } from './startPage';
import ToysPage, { ToysPageInt } from './toysPage';
import GamePage, { GamePageInt } from './gamePage';
import { AppDataInt } from '../appData/appdata';

export interface ContentReturnType {
  [key: string]: HTMLElement
}

export interface ContentInt {
  appData: AppDataInt;
  start: StartPageInt;
  toys: ToysPageInt;
  game: GamePageInt;
  getContent(): ContentReturnType;
}

export class Content implements ContentInt {
  appData: AppDataInt;

  start: StartPageInt;

  toys: ToysPageInt;

  game: GamePageInt;

  constructor(appData: AppDataInt, startPage: string, toysPage: string, gamePage: string) {
    this.appData = appData;
    this.start = new StartPage(startPage);
    this.toys = new ToysPage(toysPage, this.appData);
    this.game = new GamePage(gamePage, this.appData);
  }

  getContent() {
    return {
      start: this.start.create(),
      toys: this.toys.create(),
      game: this.game.create(),
    };
  }
}
