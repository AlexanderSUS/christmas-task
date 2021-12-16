import 'nouislider/dist/nouislider.css';
import './index.scss';
import section from './index.html';
import htmlToElement from '../../../../utils/htmlToElement';
import { Slider } from './slider/slider';
import data from '../../../../appData/data';

const rangeFilter = htmlToElement(section) as HTMLElement;

const sliders = ['count', 'year'];

//  array of steps for sliders value: '1' for toy's range, '10' for year's range
const steps = [1, 10];

// const minCountRange = Math.min(...data.map(({ count }) => +count));
// const maxCountRange = Math.min(...data.map(({ count }) => +count));

// const minYearRange = Math.min(...data.map(({ year }) => +year));
// const maxYearRange = Math.min(...data.map(({ year }) => +year));

if (rangeFilter !== null) {
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

    const sliderElement = rangeFilter.querySelector(`#${sliders[index]}`);
    const slider = new Slider(+minRange, +maxRange, sliders[index], sliderElement as HTMLElement, steps[index]);

    fillRageData(minRange, maxRange, sliders[index])

    slider.render();
  });

  function fillRageData(min: string | boolean, max: string | boolean, rangeType: string):void {
    let RangeElements = rangeFilter.querySelectorAll(`.${rangeType}`);
    RangeElements.forEach((element, index) => {
      element.textContent = arguments[index];
    })
  }
}
export default rangeFilter;
