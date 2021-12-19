import noUiSlider from 'nouislider';

export interface RangeFilterInt {
  name: string;
  step: number;
  minRange: number;
  maxRange: number;

  init(): void;
  createInputRange():void;
  fillRangeExtremums():void;
}

export class RangeFilter implements RangeFilterInt{
  name: string;
  step: number;
  minRange: number;
  maxRange: number;

  constructor(ranges: number[], step: number, targetName: string) {
    this.name = targetName;
    this.step = step;
    this.minRange = ranges[0];
    this.maxRange = ranges[1];
  }

  init() {
    this.createInputRange()
    this.fillRangeExtremums();
  }

  fillRangeExtremums() {
    document.querySelector(`.${this.name}-min`)!.textContent = this.minRange.toString();
    document.querySelector(`.${this.name}-max`)!.textContent = this.maxRange.toString();
  }

  createInputRange() {
    const stepSlider = document.getElementById(this.name);
    noUiSlider.create(stepSlider!, {
      start: [this.minRange, this.maxRange],
      step: this.step,
      range: {
        'min': this.minRange,
        'max': this.minRange,
      }
    });
  }


}
