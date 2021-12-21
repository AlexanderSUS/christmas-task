import { ValueFilterTypes } from '../appData/valueFIlterTypes';
import { Values } from '../utils/settings';
import { Toy } from '../appData/toys';

export interface ValueFilterInt {

  filterTypes: ValueFilterTypes;
  filterStates: Values

  createButton(buttonClass: string, key: string, index: number): void;
  addButtonImage(button: HTMLButtonElement, key: string, index: number): void;
  addButtonListener(element: HTMLButtonElement, key: string, index: number): void;
  filter(toy: Toy[]): Toy[];
  getFilteredList(toys: Toy[], key: string): Toy[];
  init(): void;
}

export class ValueFilter implements ValueFilterInt {
  filterTypes: ValueFilterTypes;

  filterStates: Values;

  constructor(valueFilterTypes: ValueFilterTypes, filterStates: Values) {
    this.filterTypes = valueFilterTypes;
    this.filterStates = filterStates;
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
    return this.getFilteredList(this.getFilteredList(this.getFilteredList(toys, 'shapes'), 'colors'), 'sizes');
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
}
