import 'nouislider/dist/nouislider.css';
import './index.scss';
import section from './index.html';
import htmlToElement from '../../../../utils/htmlToElement';
import { CustomInputRange } from './slider/slider';
import data from '../../../../appData/data';

const rangeFilter = htmlToElement(section) as HTMLElement;

const ranges = new CustomInputRange(data, rangeFilter);

window.onload = () => {
  ranges.render();
}

export default rangeFilter;
