import noUiSlider from 'nouislider';
import { Toy } from '../appData/toys';

export interface RangeFilterInt {
  name: string;
  step: number;
  ranges: number[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  ranges: number[];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  slider: any;

  constructor(ranges: number[], step: number, targetName: string) {
    this.name = targetName;
    this.step = step;
    this.ranges = ranges;
    // eslint-disable-next-line no-undef
    this.slider = document.getElementById(this.name);
  }

  init() {
    this.createInputRange();
    this.initRangeListener();
  }

  createInputRange() {
    noUiSlider.create(this.slider, {
      start: [this.ranges[0], this.ranges[1]],
      step: this.step,
      range: {
        min: this.ranges[0],
        max: this.ranges[1],
      },
    });
  }

  initRangeListener() {
    const outputMin = document.querySelector(`.${this.name}-min`);
    const outputMax = document.querySelector(`.${this.name}-max`);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const outputs = [outputMin, outputMax] as any;
    const settings = this.ranges;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.slider.noUiSlider.on('update', (values: any, handle: any) => {
      outputs[handle].innerHTML = values[handle].slice(0, -3);
      settings[handle] = +values[handle].slice(0, -3);
    });
  }

  filter(toys: Toy[]): Toy[] {
    return toys.filter((toy) => +toy[
      this.name as keyof typeof toy
    ] >= this.ranges[0] && +toy[this.name as keyof typeof toy] <= +this.ranges[1]);
  }

  reset() {
    this.slider.noUiSlider.reset();
  }
}
