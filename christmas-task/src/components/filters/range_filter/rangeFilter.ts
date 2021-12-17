import 'nouislider/dist/nouislider.css';
import './index.scss';
import noUiSlider from 'nouislider';
import { Toy } from '../../../appData/data';

type MinMaxRange = {
  minRange: number;
  maxRange: number;
  step: number;
  target: HTMLElement | null;
}

export interface RangeFilterInt {
  toyData: Toy[];
  rangeFilter: HTMLElement;
  ranges: MinMaxRange[];

  render(): HTMLElement;
  getRangeExtremums(): void;
  createInputRange(element: HTMLElement, min: number, max: number, step: number):void;
  fillRangeExtremums(rangeType: HTMLElement, extremums: number[]):void;
}

export class RangeFilter implements RangeFilterInt{
  toyData: Toy[];
  rangeFilter: HTMLElement;
  ranges: MinMaxRange[];

  constructor(data: Toy[]) {
    this.toyData = data;
    this.ranges = [];
    this.rangeFilter = document.createElement('section');
    this.rangeFilter.classList.add('range-filter');
    this.rangeFilter.innerHTML = `<h3 class="range-filter__title">ФИЛЬТРЫ ПО ДИАПАЗОНУ</h3>
                                  <h6 class="range-filter__subtitle">Количество экземпляров:</h6>
                                  <div class="range-filter__slider-container">
                                    <span class="min-range count"></span>
                                    <div class="range-filter__slider slider-count" id="count"></div>
                                    <span class="max-range count"></span>
                                  </div>
                                  <h6 class="range-filter__subtitle">Год приобретения:</h6>
                                  <div class="range-filter__slider-container">
                                    <span class="min-range year"></span>
                                    <div class="range-filter__slider slider-year" id="year"></div>
                                    <span class="max-range year"></span>
                                  </div>`;
  }

  render() {
    this.getRangeExtremums();
    this.ranges.forEach(element => {
      this.createInputRange(element.target!, element.minRange, element.maxRange, element.step)
      this.fillRangeExtremums(element.target!, [element.minRange, element.maxRange]);
    })
    return this.rangeFilter;
  }

  getRangeExtremums():void {
    this.ranges = [
      {
        minRange: Math.min(...this.toyData.map(({ count }) => +count)),
        maxRange: Math.max(...this.toyData.map(({ count }) => +count)),
        step: 1,
        target: this.rangeFilter.querySelector('#count'),
      },
      {
        minRange: Math.min(...this.toyData.map(({ year }) => +year)),
        maxRange: Math.max(...this.toyData.map(({ year }) => +year)),
        step: 10,
        target: this.rangeFilter.querySelector('#year'),
      },
    ]; 
  }

  fillRangeExtremums(rangeType: HTMLElement, extremums: number[]) {
    const dataElement = rangeType.parentNode?.querySelectorAll('span');
    if (dataElement !== undefined) {
      dataElement.forEach((element, index) => {
        element.textContent = extremums[index].toString();
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
