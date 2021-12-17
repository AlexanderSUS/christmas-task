import './index.scss';
import { ValueFIlterInt } from './value_filter/valueFilter';
import { RangeFilterInt } from './range_filter/rangeFilter';
import { SortFilterInt } from './sort/sort';

export interface FiltersContainerInt {
  filtersContainer: HTMLElement;
  valueFilter: ValueFIlterInt;
  rangeFilter: RangeFilterInt;
  sortFilter: SortFilterInt;

  render(): HTMLElement;
}

export class FilterContainer {

  filtersContainer: HTMLElement;
  valueFilter: ValueFIlterInt;
  rangeFilter: RangeFilterInt;
  sortFilter: SortFilterInt;

  constructor(valueFilter: ValueFIlterInt, rangeFilter: RangeFilterInt, sortFilter: SortFilterInt) {
    this.filtersContainer =  document.createElement('div');
    this.filtersContainer.classList.add('filter-container');
    this.valueFilter = valueFilter;
    this.rangeFilter = rangeFilter;
    this.sortFilter = sortFilter;
  }

  render() {
    this.filtersContainer.appendChild(this.valueFilter.render())
    this.filtersContainer.appendChild(this.rangeFilter.render())
    this.filtersContainer.appendChild(this.sortFilter.render())

    return this.filtersContainer;
  }
}
