import noUiSlider from 'nouislider';
import { Toy } from '../../../../../appData/data';

type MinMaxRange = {
  minRange: number;
  maxRange: number;
  step: number;
  target: HTMLElement | null;
}

export class CustomInputRange {
  ranges: MinMaxRange[];

  constructor(data: Toy[], targetElement: HTMLElement) {
    this.ranges = [
      {
        minRange: Math.min(...data.map(({ count }) => +count)),
        maxRange: Math.max(...data.map(({ count }) => +count)),
        step: 1,
        target: targetElement.querySelector('#count'),
      },
      {
        minRange: Math.min(...data.map(({ year }) => +year)),
        maxRange: Math.max(...data.map(({ year }) => +year)),
        step: 10,
        target: targetElement.querySelector('#year'),
      },
    ];
  }

  render() {
    this.ranges.forEach(element => {
      this.createInputRange(element.target!, element.minRange, element.maxRange, element.step)
      this.fillRangeExtremums(element.minRange, element.maxRange, element.target!);
    })
  }

  fillRangeExtremums(min: number, max: number, rangeType: HTMLElement) {
    const dataElement = rangeType.parentNode?.querySelectorAll('span');
    if (dataElement !== undefined) {
      dataElement.forEach((element, index) => {
        element.textContent = arguments[index];
      });
    }
  }

  createInputRange(element: HTMLElement, min: number, max: number, step: number) {
    const stepSlider = element;
    noUiSlider.create(stepSlider, {
      start: [min, max],
      step: step,
      range: {
        'min': min,
        'max': max,
      }
    });
  }
}
