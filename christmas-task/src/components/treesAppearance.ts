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
      treeContainer?.appendChild(this.createTreeElement(index));
    });
  }

  private createTreeElement(index: number) {
    const treeElement = document.createElement('div');
    treeElement.classList.add('tree-element');
    treeElement.style.backgroundImage = `url(${this.appData.trees[index].src})`;
    treeElement.setAttribute('data-index', `${index}`);

    this.selectListener(treeElement);

    return treeElement;
  }

  private selectListener(elemet: HTMLElement) {
    elemet.addEventListener('click', (e) => {
      const tree = e.target as HTMLElement;
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const currentTreeIndex = +tree.getAttribute('data-index')!;
      const stageTree = this.parent.querySelector('.tree') as HTMLElement;

      this.switchTree(currentTreeIndex);

      stageTree.style.backgroundImage = `url(${this.appData.trees[currentTreeIndex].src})`;
    });
  }

  private switchTree(index: number) {
    this.appData.trees[this.appData.trees.findIndex((el) => el.active)].active = false;
    this.appData.trees[index].active = true;
  }
}
