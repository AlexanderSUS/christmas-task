import { AppDataInt } from '../appData/appdata';
import { Section, SectionInt } from './section';

export interface GamePageInt extends SectionInt {
  create(): HTMLElement;
}

export default class GamePage extends Section {
  appData: AppDataInt;

  constructor(gamePage: string, appData: AppDataInt) {
    super(gamePage);
    this.appData = appData;
  }

  create() {
    return this.section;
  }
}
