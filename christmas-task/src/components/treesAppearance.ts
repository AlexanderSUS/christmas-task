import { AppDataInt } from '../appData/appdata';

export interface TreesAppearanceInt {
  parent: HTMLElement
  appData: AppDataInt;
  init(): void;
}

export class TreesAppearance implements TreesAppearanceInt {
  parent: HTMLElement;

  appData: AppDataInt;

  constructor(parent: HTMLElement, appData: AppDataInt) {
    this.parent = parent;
    this.appData = appData;
  }

  init() {
    const treeContainer = this.parent.querySelector('.tree-selection');
    this.appData.trees.forEach((tree, index) => {
      const treeElement = document.createElement('div');
      treeElement.classList.add('tree-element');
      treeElement.style.backgroundImage = `url(../assets/tree/${index + 1}.png)`;
      treeContainer?.appendChild(treeElement);
    });
  }
}
