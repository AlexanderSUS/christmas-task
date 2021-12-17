import './index.scss';
import { ValueFilterTypes } from '../../../appData/valueFIlterTypes';

export interface ValueFIlterInt {

  filterTypes: ValueFilterTypes;
  settings: boolean[];
  filter: HTMLElement;

  fillValues(): void;
  render(): HTMLElement;
}

export class ValueFilter implements ValueFIlterInt{

  filterTypes: ValueFilterTypes;
  settings: boolean[];
  filter: HTMLElement;


  constructor(valueFilterTypes: ValueFilterTypes , settings: boolean[] = [false, false, false, false, false, false]) {
    this.filterTypes = valueFilterTypes;
    this.settings = settings;
    this.filter = document.createElement('section');
    this.filter.classList.add('value-filter');
    this.filter.innerHTML = `<h3 class="value-filter__title">ФИЛЬТРЫ ПО ЗНАЧЕНИЮ</h3>
                            <div class="value-filter__container shapes">
                              <h6 class="value-filter__subtitle">форма:</h6>
                            </div>
                            <div class="value-filter__container colors">
                              <h6 class="value-filter__subtitle">цвет:</h6>
                            </div>
                            <div class="value-filter__container sizes">
                              <h6 class="value-filter__subtitle">размер:</h6>
                            </div>
                            <div class="value-filter__container">
                              <h6 class="value-filter__subtitle favourite">только любиыме:</h6>
                              <input class="value-filter__input" type="checkbox">
                            </div>`;
  }

  fillValues(): void {
    Object.keys(this.filterTypes).forEach((key, index) => {
      const propertyLis =  this.filterTypes[key as keyof typeof this.filterTypes];
      const filter = this.filter.querySelector(`.${key}`);

      propertyLis.forEach((element) => {

        const button = document.createElement('button');
        button.classList.add('filter-button');

        if (this.settings[index] === true) {
          button.classList.add('active');
        }

        if (element.value[0] !== '#') {
          const buttonImage = document.createElement('img');
          buttonImage.classList.add('filter-button__image');
          buttonImage.src = element.value;
          button.appendChild(buttonImage);
        } else {
        button.classList.add('filter-button_color'); 
        button.style.backgroundColor = element.value;
        }      

        filter?.appendChild(button);
      });
    });
  }

  render() {
    this.fillValues();
    return this.filter;
  }
}
