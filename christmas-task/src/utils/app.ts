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
  sort: SortFilterInt;

  constructor(settings: SettingsTypeClassInt, toys: Toy[], valueFilterTypes: ValueFilterTypes) {
    this.settings = settings;
    this.toys = toys;
    this.toysContainer = document.querySelector('.toys-container')!;
    this.valueFilterTypes = valueFilterTypes;
    this.valueFilter = new ValueFilter(this.valueFilterTypes, this.settings.current.values);
    this.rangeFilterCount = new RangeFilter(this.settings.current.ranges.year, 1, 'count');
    this.rangeFilterYear = new RangeFilter(this.settings.current.ranges.year, 10, 'year');
    this.sort = new SortFilter(this.settings); 
  }

  init() {
    this.valueFilter.init();
    this.rangeFilterCount.init();
    this.rangeFilterYear.init();
    this.sort.init();
    this.showToys();
  }

  showToys() {
    
    this.toys.forEach((toy) => {
      const toyCard = new ToyCard(toy);
      this.toysContainer.appendChild(toyCard.fill());
    })

  }
}
