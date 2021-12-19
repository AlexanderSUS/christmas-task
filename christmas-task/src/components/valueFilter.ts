import { ValueFilterTypes } from '../appData/valueFIlterTypes';
import { Values } from '../utils/settings';

export interface ValueFIlterInt {

  filterTypes: ValueFilterTypes;
  activeBtns: Values

  fillValues(): void;
  init(): void;
}

export class ValueFilter implements ValueFIlterInt{

  filterTypes: ValueFilterTypes;
  activeBtns: Values;

  constructor(valueFilterTypes: ValueFilterTypes , activeBtns: Values) {
    this.filterTypes = valueFilterTypes;
    this.activeBtns = activeBtns;
  }

  fillValues(): void {
    Object.keys(this.filterTypes).forEach((key) => {
      const propertyLis =  this.filterTypes[key as keyof typeof this.filterTypes];
      const filter = document.querySelector(`.${key}`);

      propertyLis.forEach((element, index) => {

        const button = document.createElement('button');
        button.classList.add('filter__button_value');
        button.addEventListener('click', () => {
          button.classList.toggle('active');
          this.activeBtns[key as keyof typeof this.activeBtns][index] =
          this.activeBtns[key as keyof typeof this.activeBtns][index] ? false : true;
        })

        if (this.activeBtns[key as keyof typeof this.activeBtns][index]) {
          button.classList.add('active');
        }

        if (element.value[0] !== '#') {
          const buttonImage = document.createElement('img');
          buttonImage.classList.add('filter-button__image');
          buttonImage.src = element.value;
          button.appendChild(buttonImage);
        } else {
        button.classList.add('filter__button_color'); 
        button.style.backgroundColor = element.value;
        }      

        filter?.appendChild(button);
      });
    });
  }

  init() {
    this.fillValues();
  }
}
