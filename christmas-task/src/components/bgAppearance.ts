import { AppDataInt } from '../appData/appdata';

export interface BgAppearanceInt {
  parent: HTMLElement
  appData: AppDataInt;
  init(): void;
}

export class BgAppearance implements BgAppearanceInt {
  parent: HTMLElement;

  appData: AppDataInt;

  constructor(parent: HTMLElement, appData: AppDataInt) {
    this.parent = parent;
    this.appData = appData;
  }

  init() {
    const BgContainer = this.parent.querySelector('.background-selection');
    this.appData.backgrounds.forEach((bg, index) => {
      const BgElement = document.createElement('div');
      BgElement.classList.add('bg-element');
      BgElement.style.backgroundImage = `url(../assets/bg/${index + 1}.jpg)`;
      BgContainer?.appendChild(BgElement);
    });
  }
}
