import 'nouislider/dist/nouislider.css';
import './index.scss';
import { Slider } from './slider/slider';
import data from '../../../appData/data';

const rangeFilter = document.createElement('section');
rangeFilter.classList.add('range-filter');

rangeFilter.innerHTML = `<h3 class="range-filter__title">ФИЛЬТРЫ ПО ДИАПАЗОНУ</h3>
                        <h6 class="range-filter__subtitle">Количество экземпляров:</h6>
                        <div class="range-filter__slider-container">
                          <span class="min-range count"></span>
                          <div class="range-filter__slider" id="count"></div>
                          <span class="max-range count"></span>
                        </div>
                        <h6 class="range-filter__subtitle">Год приобретения:</h6>
                        <div class="range-filter__slider-container">
                          <span class="min-range year"></span>
                          <div class="range-filter__slider" id="year"></div>
                          <span class="max-range year"></span>
                        </div>`;

const sliders = ['count', 'year'];

//  array of steps for sliders value: '1' for toy's range, '10' for year's range
const steps = [1, 10];

sliders.forEach((element, index) => {
  let minRange: string | boolean;
  let maxRange: string | boolean;

  minRange = data[0][element as keyof typeof data[0]];
  maxRange = data[0][element as keyof typeof data[0]];

  data.forEach((toy) => {
    if (+minRange > +toy[element as keyof typeof toy]) {
      minRange = toy[element as keyof typeof toy];
    }
    if (+maxRange < +toy[element as keyof typeof toy]) {
      maxRange = toy[element as keyof typeof toy];
    }
  });

  const sliderElement = rangeFilter.querySelector(`#${sliders[index]}`) as HTMLElement;
  const slider = new Slider(+minRange, +maxRange, sliders[index], sliderElement, steps[index]);

  fillRageData(minRange, maxRange, sliders[index])

  slider.render();
});

function fillRageData(min: string | boolean, max: string | boolean, rangeType: string):void {
  let RangeElements = rangeFilter.querySelectorAll(`.${rangeType}`);
  RangeElements.forEach((element, index) => {
    element.textContent = arguments[index];
  })
}

export default rangeFilter;
