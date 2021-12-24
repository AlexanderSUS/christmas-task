import { Section, SectionInt } from './section';

export interface StartPageInt extends SectionInt {
  create(): HTMLElement;
}

export default class StartPage extends Section {
  // eslint-disable-next-line no-useless-constructor
  constructor(startPage: string) {
    super(startPage);
  }

  create() {
    this.init();
    return this.section;
  }

  private init() {
    this.section.querySelector('.start-button')?.addEventListener('click', () => {
      window.location.hash = '#toys';
    });
  }
}
