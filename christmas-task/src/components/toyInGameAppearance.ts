import { AppDataInt } from '../appData/appdata';
import { ToyElement } from './toyImage';

export interface ToysAppearanceInt {
  parent: HTMLElement;
  appData: AppDataInt;
  init(): void;
}

export class ToysAppearance implements ToysAppearanceInt {
  parent: HTMLElement;

  appData: AppDataInt;

  constructor(parent: HTMLElement, appData: AppDataInt) {
    this.parent = parent;
    this.appData = appData;
  }

  private fillToys() {
    const toysContainer = this.parent.querySelector('.toy-selection') as HTMLElement;
    if (this.isAnyToySelected()) {
      this.showSelectedToys(toysContainer);
    } else {
      this.showDefaultToys(toysContainer);
    }
  }

  private isAnyToySelected() {
    return this.appData.toys.find((toy) => toy.selected);
  }

  private showSelectedToys(container: HTMLElement | null) {
    this.appData.toys.forEach((toy) => {
      if (toy.selected) {
        const toyElement = new ToyElement(+toy.num, this.appData);
        container?.appendChild(toyElement.create());
      }
    });
  }

  private showDefaultToys(container: HTMLElement | null) {
    // eslint-disable-next-line no-plusplus
    for (let i = 1; i <= this.appData.maxFavoriteQty; i++) {
      const toyElement = new ToyElement(i, this.appData);
      container?.appendChild(toyElement.create());
    }
  }

  private removeToys() {
    const toys = this.parent.querySelectorAll('.toy-element');
    toys.forEach((toy) => {
      toy.parentNode?.removeChild(toy);
    });
  }

  init() {
    window.addEventListener('hashchange', () => {
      this.removeToys();
      this.fillToys();
    });
  }
}
