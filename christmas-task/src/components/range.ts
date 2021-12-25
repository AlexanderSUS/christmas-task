/* eslint-disable @typescript-eslint/no-explicit-any */
import noUiSlider from 'nouislider';
import { Toy } from '../appData/toys';
import { AppDataInt } from '../appData/appdata';

export interface RangeFilterInt {
  parent: HTMLElement;
  name: string;
  step: number;
  appData: AppDataInt;
  slider: any; // use 'any' due to noUiSlider namespace issue

  init(): void;
  filter(toys: Toy[]): Toy[];
  reset(): void;
}

export class RangeFilter implements RangeFilterInt {
  parent: HTMLElement;

  name: string;

  step: number;

  appData: AppDataInt;

  slider: any;

  constructor(
    parent: HTMLElement,
    appData: AppDataInt,
    step: number,
    targetName: string,
  ) {
    this.parent = parent;
    this.name = targetName;
    this.step = step;
    this.appData = appData;
    // eslint-disable-next-line no-undef
    this.slider = this.parent.querySelector(`#${this.name}`);
  }

  init() {
    this.createInputRange();
    this.initRangeListener();
  }

  private createInputRange() {
    noUiSlider.create(this.slider, {
      start: [this.appData.ranges[this.name][0], this.appData.ranges[this.name][1]],
      step: this.step,
      range: {
        min: this.appData.ranges[this.name][0],
        max: this.appData.ranges[this.name][1],
      },
    });
  }

  private initRangeListener() {
    const outputMin = this.parent.querySelector(`.${this.name}-min`);
    const outputMax = this.parent.querySelector(`.${this.name}-max`);
    const outputs = [outputMin, outputMax] as any;
    const data = this.appData.ranges[this.name];

    this.slider.noUiSlider.on('update', (values: any, handle: any) => {
      outputs[handle].innerHTML = values[handle].slice(0, -3);
      data[handle] = +values[handle].slice(0, -3);
    });
  }

  filter(toys: Toy[]): Toy[] {
    return toys.filter((toy) => +toy[this.name as keyof typeof toy
    ] >= this.appData.ranges[
      this.name
    ][0] && +toy[this.name as keyof typeof toy] <= +this.appData.ranges[this.name][1]);
  }

  reset() {
    this.slider.noUiSlider.reset();
  }
}
