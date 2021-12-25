import { AppDataInt } from '../appData/appdata';

export interface CompletedAppearanceInt {
  parent: HTMLElement
  appData: AppDataInt;
  init(): void;
}

export class CompmletedAppearance implements CompletedAppearanceInt {
  parent: HTMLElement;

  appData: AppDataInt;

  constructor(parent: HTMLElement, appData: AppDataInt) {
    this.parent = parent;
    this.appData = appData;
  }

  init() {
    const treeContainer = this.parent.querySelector('.completed-trees');
    this.appData.trees.forEach((tree, index) => {
      const treeElement = document.createElement('div');
      treeElement.classList.add('tree-element');
      treeElement.style.backgroundImage = `url(../assets/tree/${index + 1}.png)`;
      treeContainer?.appendChild(treeElement);
    });
  }
}
