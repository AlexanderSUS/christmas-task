import './index.scss';
import filter from './filters/filters';

const main = document.createElement('main');
main.classList.add('main');
main.appendChild(filter);

export default main;
