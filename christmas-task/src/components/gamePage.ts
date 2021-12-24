import { Section, SectionInt } from './section';

export interface GamePageInt extends SectionInt {
  create(): HTMLElement;
}

export default class GamePage extends Section {
  // eslint-disable-next-line no-useless-constructor
  constructor(gamePage: string) {
    super(gamePage);
  }

  create() {
    return this.section;
  }
}
