import { StartPageInt } from './startPage';
import { ToysPageInt } from './toysPage';
import { GamePageInt } from './gamePage';

export interface ContentInt {
  [key: string]: HTMLElement;
}

export class Content implements ContentInt {
  // eslint-disable-next-line no-undef
  [key: string]: HTMLElement;

  constructor(start: StartPageInt, toys: ToysPageInt, game: GamePageInt) {
    this.start = start.create();
    this.toys = toys.create();
    this.game = game.create();
  }
}
