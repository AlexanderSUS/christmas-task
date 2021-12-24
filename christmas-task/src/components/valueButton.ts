/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
import { AppDataInt } from '../appData/appdata';

export interface ValueFilterButtonInt {
  create(buttonClass: string,
    property: string,
    propertyIndex: number,
    toysPageData: AppDataInt,
    isImageButton: boolean,
    color: string,
  ): HTMLButtonElement;
}

export default class ValueFilterButton implements ValueFilterButtonInt {
  private addButtonImage(
    button: HTMLButtonElement,
    toysPageData: AppDataInt,
    property: string,
    propertyIndex: number,
  ) {
    const buttonImage = document.createElement('img');
    buttonImage.classList.add('filter-button__image');
    buttonImage.src = toysPageData.valueFilterProps[property][propertyIndex].value;
    button.appendChild(buttonImage);
  }

  private addButtonColor(button: HTMLButtonElement, color: string) {
    button.classList.add('filter__button_color');
    button.style.backgroundColor = color;
  }

  create(
    buttonClass: string,
    property: string,
    propertyIndex: number,
    toysPageData: AppDataInt,
    isImageButton: boolean,
    color: string,
  ) {
    const button = document.createElement('button');
    button.classList.add(buttonClass);

    button.addEventListener('click', () => {
      button.classList.toggle('active');
      toysPageData.values[property][propertyIndex] = !toysPageData.values[property][propertyIndex];
    });

    if (isImageButton) {
      this.addButtonImage(button, toysPageData, property, propertyIndex);
    } else {
      this.addButtonColor(button, color);
    }
    return button;
  }
}
