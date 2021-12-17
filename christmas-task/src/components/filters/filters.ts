import './index.scss';
import valueFilter from './value_filter/valueFilter';
import rangeFilter from './range_filter/rangeFilter';
import sortContainer from './sort/sort';

const filter = document.createElement('div');
filter.classList.add('filter-container');

filter.appendChild(valueFilter);
filter.appendChild(rangeFilter);
filter.appendChild(sortContainer!);

export default filter;
