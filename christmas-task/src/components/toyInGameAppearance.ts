import { AppDataInt } from '../appData/appdata';

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
        const toyElement = this.createToyElement(+toy.num);
        container?.appendChild(toyElement);
      }
    });
  }

  private showDefaultToys(container: HTMLElement | null) {
    // eslint-disable-next-line no-plusplus
    for (let i = 1; i <= 20; i++) {
      const toyElement = this.createToyElement(i);
      container?.appendChild(toyElement);
    }
  }

  private createToyElement(index: number): HTMLElement {
    const toyElement = document.createElement('div');
    toyElement.classList.add('toy-element');
    toyElement.style.backgroundImage = `url(../assets/toys/${index}.png)`;

    const restedToys = document.createElement('span');
    restedToys.classList.add('rested-toys');
    restedToys.textContent = this.appData.toys[index].count;

    toyElement.appendChild(restedToys);

    return toyElement;
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
