import { AppDataInt } from '../appData/appdata';

export interface LightsInt {
  init(): void;
}

export class Lights implements LightsInt {
  parent: HTMLElement;

  appData: AppDataInt;

  constructor(parent: HTMLElement, appData: AppDataInt) {
    this.parent = parent;
    this.appData = appData;
  }

  init() {
    this.createLights();
  }

  private createLights() {
    const garland = this.parent.querySelector('.lights-container');

    // eslint-disable-next-line no-plusplus
    for (let i = 0, j = this.appData.ligths.minLength; i < this.appData.ligths.maxFlors; i++, j++) {
      garland?.appendChild(this.createGarland(j));
    }
  }

  private createGarland(length: number) {
    const wire = document.createElement('ul');
    wire.classList.add('wire');

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < length; i++) {
      wire.appendChild(this.createBulb());
    }

    return wire;
  }

  // eslint-disable-next-line class-methods-use-this
  private createBulb() {
    const bulb = document.createElement('li');
    bulb.classList.add('bulb');
    return bulb;
  }
}
