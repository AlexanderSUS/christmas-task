import { ValueFilterTypes } from '../appData/valueFIlterTypes';
import { FavoriteFilter, Values } from '../utils/settings';
import { Toy } from '../appData/toys';

export interface ValueFilterInt {

  filterTypes: ValueFilterTypes;
  filterStates: Values;
  favoriteFilter: FavoriteFilter;

  createButton(buttonClass: string, key: string, index: number): void;
  addButtonImage(button: HTMLButtonElement, key: string, index: number): void;
  addButtonListener(element: HTMLButtonElement, key: string, index: number): void;
  filter(toy: Toy[]): Toy[];
  getFilteredList(toys: Toy[], key: string): Toy[];
  init(): void;
  resetValueFilter(): void;
  resetFavoriteFilter(): void;
  reset(): void;
}

export class ValueFilter implements ValueFilterInt {
  filterTypes: ValueFilterTypes;

  filterStates: Values;

  favoriteFilter: FavoriteFilter;

  constructor(
    valueFilterTypes: ValueFilterTypes,
    filterStates: Values,
    favoriteFilter: FavoriteFilter,
  ) {
    this.filterTypes = valueFilterTypes;
    this.filterStates = filterStates;
    this.favoriteFilter = favoriteFilter;
  }

  init() {
    Object.keys(this.filterTypes).forEach((key) => {
      const container = document.querySelector(`.${key}`);
      this.filterTypes[key].forEach((element, index) => {
        const button = this.createButton('filter__button_value', key, index);
        if (element.value[0] !== '#') {
          this.addButtonImage(button, key, index);
        } else {
          button.classList.add('filter__button_color');
          button.style.backgroundColor = element.value;
        }
        container?.appendChild(button);
      });
    });
  }

  createButton(buttonClass: string, key: string, index: number): HTMLButtonElement {
    const button = document.createElement('button');
    button.classList.add(buttonClass);
    this.addButtonListener(button, key, index);
    return button;
  }

  addButtonImage(button: HTMLButtonElement, key: string, index: number) {
    const buttonImage = document.createElement('img');
    buttonImage.classList.add('filter-button__image');
    buttonImage.src = this.filterTypes[key][index].value;
    button.appendChild(buttonImage);
  }

  addButtonListener(element: HTMLButtonElement, key: string, index: number) {
    element.addEventListener('click', () => {
      element.classList.toggle('active');
      this.filterStates[key][index] = !this.filterStates[key][index];
    });
  }

  filter(toys: Toy[]): Toy[] {
    return this.getFavouritesList(this.getFilteredList(this.getFilteredList(this.getFilteredList(toys, 'shapes'), 'colors'), 'sizes'));
  }

  getFavouritesList(toys: Toy[]): Toy[] {
    const favorites: Toy[] = [];
    if (this.favoriteFilter.isEnabled) {
      toys.forEach((toy) => {
        if (toy.favorite) {
          favorites.push(toy);
        }
      });
      return favorites;
    }
    return toys;
  }

  getFilteredList(toys: Toy[], key: string): Toy[] {
    const filtered = <Set<Toy>> new Set();
    let filterEnabled = false;

    toys.forEach((toy) => {
      this.filterStates[key].forEach((selected, index) => {
        if (selected) {
          filterEnabled = true;
          if (toy[key.slice(0, -1) as keyof typeof toy] === this.filterTypes[key][index].name) {
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

  // eslint-disable-next-line class-methods-use-this
  resetValueFilter() {
    document.querySelectorAll('.active').forEach((element) => {
      element.classList.remove('active');
    });
    Object.keys(this.filterStates).forEach((key) => {
      this.filterStates[key].fill(false);
    });
  }

  // eslint-disable-next-line class-methods-use-this
  resetFavoriteFilter() {
    const checkbox = document.querySelector('.filter__input') as HTMLInputElement;
    checkbox.checked = false;
    this.favoriteFilter.isEnabled = false;
  }
}
