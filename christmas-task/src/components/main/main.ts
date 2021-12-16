import './index.scss';
import valueFilter from './value_filter/valueFilter';

const main = document.createElement('main');
main.classList.add('main');
main.appendChild(valueFilter);

export default main;
