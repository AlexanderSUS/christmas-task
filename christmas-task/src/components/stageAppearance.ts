import { AppDataInt } from '../appData/appdata';

export interface StageAppearanceInt {
  parent: HTMLElement
  appData: AppDataInt;
  init(): void;
}

export class StageAppearance implements StageAppearanceInt {
  parent: HTMLElement;

  appData: AppDataInt;

  constructor(parent: HTMLElement, appData: AppDataInt) {
    this.parent = parent;
    this.appData = appData;
  }

  init() {
    this.showBackground();
    this.showTree();
  }

  private showBackground() {
    const stage = this.parent.querySelector('.stage') as HTMLElement;
    stage.style.backgroundImage = `url(${this.appData.backgrounds[this.appData.backgrounds.findIndex((el) => el.active)].src})`;
  }

  private showTree() {
    const tree = this.parent.querySelector('.tree') as HTMLElement;
    tree.style.backgroundImage = `url(${this.appData.trees[this.appData.trees.findIndex((el) => el.active)].src})`;
  }
}
