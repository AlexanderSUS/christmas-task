/* eslint-disable @typescript-eslint/no-explicit-any */
import noUiSlider from 'nouislider';
import { Toy } from '../appData/toys';
import { AppDataInt } from '../appData/appdata';

export interface RangeFilterInt {
  name: string;
  step: number;
  appData: AppDataInt;
  slider: any; // use 'any' due to noUiSlider namespace issue

  init(): void;
  createInputRange(): void;
  initRangeListener():void;
  filter(toys: Toy[]): Toy[];
  reset(): void;
}

export class RangeFilter implements RangeFilterInt {
  name: string;

  step: number;

  appData: AppDataInt;

  slider: any;

  constructor(appData: AppDataInt, step: number, targetName: string) {
    this.name = targetName;
    this.step = step;
    this.appData = appData;
    // eslint-disable-next-line no-undef
    this.slider = document.getElementById(this.name);
  }

  init() {
    this.createInputRange();
    this.initRangeListener();
  }

  createInputRange() {
    noUiSlider.create(this.slider, {
      start: [this.appData.ranges[this.name][0], this.appData.ranges[this.name][1]],
      step: this.step,
      range: {
        min: this.appData.ranges[this.name][0],
        max: this.appData.ranges[this.name][1],
      },
    });
  }

  initRangeListener() {
    const outputMin = document.querySelector(`.${this.name}-min`);
    const outputMax = document.querySelector(`.${this.name}-max`);
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
      this.name][0] && +toy[this.name as keyof typeof toy] <= +this.appData.ranges[this.name][1]);
  }

  reset() {
    this.slider.noUiSlider.reset();
  }
}
