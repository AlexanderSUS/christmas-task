import {SettingsTypeClassInt } from './settings';
import toys, { Toy } from '../appData/toys';
import { ValueFilterTypes } from '../appData/valueFIlterTypes'; 
import { ValueFilter, ValueFIlterInt } from '../components/valueFilter';
import { RangeFilter, RangeFilterInt } from '../components/range';
import { SortFilter, SortFilterInt } from '../components/sort';
import { ToyCard } from '../components/toyCard';

export class App {

  settings: SettingsTypeClassInt;
  toys: Toy[];
  toysContainer: HTMLElement;
  valueFilterTypes: ValueFilterTypes;
  valueFilter: ValueFIlterInt; 
  rangeFilterCount: RangeFilterInt;
  rangeFilterYear: RangeFilterInt; 
  sortFilter: SortFilterInt;

  constructor(settings: SettingsTypeClassInt, toys: Toy[], valueFilterTypes: ValueFilterTypes) {
    this.settings = settings;
    this.toys = toys;
    this.toysContainer = document.querySelector('.toys-container')!;
    this.valueFilterTypes = valueFilterTypes;
    this.valueFilter = new ValueFilter(this.valueFilterTypes, this.settings.current.values);
    this.rangeFilterCount = new RangeFilter(this.settings.current.ranges.year, 1, 'count');
    this.rangeFilterYear = new RangeFilter(this.settings.current.ranges.year, 10, 'year');
    this.sortFilter = new SortFilter(this.settings); 
  }

  init() {
    this.valueFilter.init();
    this.rangeFilterCount.init();
    this.rangeFilterYear.init();
    this.sortFilter.init();
    this.listenSort();
    this.showToys();
  }

  showToys() {
    this.toys.forEach((toy) => {
      const toyCard = new ToyCard(toy);
      this.toysContainer.appendChild(toyCard.fill());
    })
  }

  sortByAlphabet() {
    this.toys.sort((a, b) => {
      const name1 = a.name.toLowerCase();
      const name2 = b.name.toLowerCase();
      if (name1 > name2) { return 1;}
      if (name1 < name2) { return -1;}
      return 0;
    });
  }

  sortByAlphabetReverse() {
    this.toys.sort((a, b) => {
      const name1 = a.name.toLowerCase();
      const name2 = b.name.toLowerCase();
      if (name1 < name2) { return 1;}
      if (name1 > name2) { return -1;}
      return 0;
    });
  }

  sortByQuantity() {
    this.toys.sort((a, b) => +a.count - +b.count)
  }

  sortByQuantityReverse() {
    this.toys.sort((a, b) => +b.count - +a.count)
  }

  listenSort() {
    const selectElement = document.querySelector('.filter__select');
      selectElement!.addEventListener('change', (event) => {
        const pickedElement = <HTMLSelectElement>event.target;
        this.settings.current.sortState = +pickedElement.value;
        this.refreshResult();
    });
  }

  sort() {
    switch (this.settings.current.sortState) {
      case 0: this.sortByAlphabet(); break;
      case 1: this.sortByAlphabetReverse(); break;
      case 2: this.sortByQuantity(); break;
      case 3: this.sortByQuantityReverse(); break;
      default: this.sortByAlphabet();
    }
  }

  refreshResult() {
    this.toysContainer.innerHTML = '';
    this.sort();
    this.showToys();
  }
}
