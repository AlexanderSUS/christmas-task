import { ValueFilterTypes } from '../appData/valueFIlterTypes';
import { Values } from '../utils/settings';

export interface ValueFilterInt {

  filterTypes: ValueFilterTypes;
  activeBtns: Values

  createButton(buttonClass: string, key: string, index: number): void;
  addButtonImage(button: HTMLButtonElement, key: string, index: number): void;
  addButtonListener(element: HTMLButtonElement, key: string, index: number): void;
  init(): void;
}

export class ValueFilter implements ValueFilterInt {
  filterTypes: ValueFilterTypes;

  activeBtns: Values;

  constructor(valueFilterTypes: ValueFilterTypes, activeBtns: Values) {
    this.filterTypes = valueFilterTypes;
    this.activeBtns = activeBtns;
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
      this.activeBtns[key][index] = !this.activeBtns[key][index];
    });
  }
}
