/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
import { AppDataInt } from '../appData/appdata';

export interface ValueFilterButtonInt {
  create(buttonClass: string,
    property: string,
    propertyIndex: number,
    appData: AppDataInt,
    isImageButton: boolean,
    color: string,
  ): HTMLButtonElement;

  addButtonColor(button: HTMLButtonElement, color: string): void;

  addButtonImage(
    button: HTMLButtonElement, appData: AppDataInt, property: string, propertyIndex: number): void;
}

export default class ValueFilterButton implements ValueFilterButtonInt {
  addButtonImage(
    button: HTMLButtonElement,
    appData: AppDataInt,
    property: string,
    propertyIndex: number,
  ) {
    const buttonImage = document.createElement('img');
    buttonImage.classList.add('filter-button__image');
    buttonImage.src = appData.valueFilterProps[property][propertyIndex].value;
    button.appendChild(buttonImage);
  }

  addButtonColor(button: HTMLButtonElement, color: string) {
    button.classList.add('filter__button_color');
    button.style.backgroundColor = color;
  }

  create(
    buttonClass: string,
    property: string,
    propertyIndex: number,
    appData: AppDataInt,
    isImageButton: boolean,
    color: string,
  ) {
    const button = document.createElement('button');
    button.classList.add(buttonClass);

    button.addEventListener('click', () => {
      button.classList.toggle('active');
      appData.values[property][propertyIndex] = !appData.values[property][propertyIndex];
    });

    if (isImageButton) {
      this.addButtonImage(button, appData, property, propertyIndex);
    } else {
      this.addButtonColor(button, color);
    }
    return button;
  }
}
