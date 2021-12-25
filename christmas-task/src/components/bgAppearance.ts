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
    const bgContainer = this.parent.querySelector('.background-selection');
    this.appData.backgrounds.forEach((bg, index) => {
      bgContainer?.appendChild(this.createBgElement(index));
    });
  }

  private createBgElement(index: number) {
    const bgElement = document.createElement('div');
    bgElement.classList.add('bg-element');
    bgElement.setAttribute('data-index', `${index}`);
    bgElement.style.backgroundImage = `url(${this.appData.backgrounds[index].src})`;

    this.selectListener(bgElement);

    return bgElement;
  }

  private selectListener(element: HTMLElement) {
    element.addEventListener('click', (e) => {
      const background = e.target as HTMLElement;
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const currentBgNum = +background.getAttribute('data-index')!;
      const stage = this.parent.querySelector('.stage') as HTMLElement;

      this.switchBg(currentBgNum);

      stage.style.backgroundImage = `url(${this.appData.backgrounds[currentBgNum].src})`;
    });
  }

  private switchBg(index: number) {
    this.appData.backgrounds[this.appData.backgrounds.findIndex((el) => el.active)].active = false;
    this.appData.backgrounds[index].active = true;
  }
}
