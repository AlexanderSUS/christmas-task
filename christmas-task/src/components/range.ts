import noUiSlider from 'nouislider';
import { Toy } from '../appData/toys';

export interface RangeFilterInt {
  name: string;
  step: number;
  ranges: number[];
  slider: any;  //use 'any' due to noUiSlider namespace issue

  init(): void;
  createInputRange(): void;
  initRangeListener():void;
  filterOnUpdate(refresh: () => void): void;
  filter(toys: Toy[]): Toy[]; 
  reset(): void;
}

export class RangeFilter implements RangeFilterInt {
  name: string;
  step: number;
  ranges: number[];
  slider: any; 

  constructor(ranges: number[], step: number, targetName: string) {
    this.name = targetName;
    this.step = step;
    this.ranges = ranges;
    this.slider = document.getElementById(this.name);
  }

  init() {
    this.createInputRange()
    this.initRangeListener();
  }

  createInputRange() {
    noUiSlider.create(this.slider, {
      start: [this.ranges[0], this.ranges[1]],
      step: this.step,
      range: {
        'min': this.ranges[0],
        'max': this.ranges[1],
      }
    });
  }

  initRangeListener() {
    const outputMin = document.querySelector(`.${this.name}-min`)!;
    const outputMax = document.querySelector(`.${this.name}-max`)!;
    const outputs = [outputMin, outputMax] as any;
    const settings = this.ranges;

    this.slider.noUiSlider.on('update', function (values: any, handle: any) {
      outputs[handle].innerHTML = values[handle].slice(0, -3);
      settings[handle] = +values[handle].slice(0, -3);
    });

  }

  filterOnUpdate(refresh: () => void) {
    this.slider.noUiSlider.on('end', () => {
      refresh()
    });
  }

  filter(toys: Toy[]): Toy[] {
    return toys.filter(toy => {
      return +toy[this.name as keyof typeof toy] >= this.ranges[0] && +toy[this.name as keyof typeof toy] <= +this.ranges[1]
    });
  }

  reset() {
    // this.slider.noUiSlider.set(this.ranges);
    this.slider.noUiSlider.reset();
  }
}
