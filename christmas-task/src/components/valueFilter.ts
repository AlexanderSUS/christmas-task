/* eslint-disable class-methods-use-this */
import { AppDataInt } from '../appData/appdata';
import { Toy } from '../appData/toys';
import ValueFilterButton, { ValueFilterButtonInt } from './valueButton';

export interface ValueFilterInt {
  parent: HTMLElement;
  appData: AppDataInt;
  valueFilterButton: ValueFilterButtonInt;
  filter(toy: Toy[]): Toy[];
  init(): void;
  reset(): void;
}

export class ValueFilter implements ValueFilterInt {
  parent: HTMLElement;

  appData: AppDataInt;

  valueFilterButton: ValueFilterButtonInt;

  constructor(parent: HTMLElement, appData: AppDataInt) {
    this.parent = parent;
    this.appData = appData;
    this.valueFilterButton = new ValueFilterButton();
  }

  init() {
    Object.keys(this.appData.valueFilterProps).forEach((key) => {
      const container = this.parent.querySelector(`.${key}`);
      this.appData.valueFilterProps[key].forEach((element, index) => {
        const button = this.valueFilterButton.create('filter__button_value', key, index, this.appData, element.value[0] !== '#', element.value);
        container?.appendChild(button);
      });
    });
  }

  filter(toys: Toy[]): Toy[] {
    return this.getFavouritesList(this.getFilteredList(this.getFilteredList(this.getFilteredList(toys, 'shapes'), 'colors'), 'sizes'));
  }

  private getFavouritesList(toys: Toy[]): Toy[] {
    const favorites: Toy[] = [];
    if (this.appData.isFavoriteFilterEnabled) {
      toys.forEach((toy) => {
        if (toy.favorite) {
          favorites.push(toy);
        }
      });
      return favorites;
    }
    return toys;
  }

  private getFilteredList(toys: Toy[], key: string): Toy[] {
    const filtered = <Set<Toy>> new Set();
    let filterEnabled = false;

    toys.forEach((toy) => {
      this.appData.values[key].forEach((selected, index) => {
        if (selected) {
          filterEnabled = true;
          if (toy[key.slice(0, -1) as keyof typeof toy] === this.appData.valueFilterProps[key][
            index].name) {
            filtered.add(toy);
          }
        }
      });
    });
    return filterEnabled ? Array.from(filtered) : toys;
  }

  reset() {
    this.resetFavoriteFilter();
    this.resetValueFilter();
  }

  private resetValueFilter() {
    this.parent.querySelectorAll('.active').forEach((element) => {
      element.classList.remove('active');
    });
  }

  private resetFavoriteFilter() {
    const checkbox = this.parent.querySelector('.filter__input') as HTMLInputElement;
    checkbox.checked = false;
  }
}
