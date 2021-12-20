import { SettingsTypeClassInt } from './settings';
import { Toy } from '../appData/toys';
import { ValueFilterTypes } from '../appData/valueFIlterTypes';
import { ValueFilter, ValueFilterInt } from '../components/valueFilter';
import { RangeFilter, RangeFilterInt } from '../components/range';
import { SortFilter, SortFilterInt } from '../components/sort';
import { ToyCard } from '../components/toyCard';

export default class App {
  settings: SettingsTypeClassInt;

  toys: Toy[];

  toysContainer: HTMLElement;

  valueFilterTypes: ValueFilterTypes;

  valueFilter: ValueFilterInt;

  rangeFilterCount: RangeFilterInt;

  rangeFilterYear: RangeFilterInt;

  sortFilter: SortFilterInt;

  constructor(settings: SettingsTypeClassInt, toys: Toy[], valueFilterTypes: ValueFilterTypes) {
    this.settings = settings;
    this.toys = toys;
    this.toysContainer = document.querySelector('.toys-container')!;
    this.valueFilterTypes = valueFilterTypes;
    this.valueFilter = new ValueFilter(this.valueFilterTypes, this.settings.current.values);
    this.rangeFilterCount = new RangeFilter(this.settings.current.ranges.count, 1, 'count');
    this.rangeFilterYear = new RangeFilter(this.settings.current.ranges.year, 10, 'year');
    this.sortFilter = new SortFilter(this.settings, this.toys);
  }

  init() {
    this.valueFilter.init();
    this.rangeFilterCount.init();
    this.rangeFilterYear.init();
    this.listenValueFilter();
    this.listenRageFilter();
    this.listenSortFilter();
    this.listenReset();
    this.showToys(this.toys);
  }

  listenValueFilter() {
    document.querySelectorAll('.filter__button_value').forEach((button) => {
      button.addEventListener('click', () => {
        setTimeout(() => {
          this.refreshResult();
        }, 0);
      });
    });
  }

  listenRageFilter() {
    this.rangeFilterCount.slider.noUiSlider.on('end', () => {
      this.toysContainer.innerHTML = '';
      this.showToys(this.rangeFilterYear.filter(this.rangeFilterCount.filter(this.toys)));
    });

    this.rangeFilterYear.slider.noUiSlider.on('end', () => {
      this.toysContainer.innerHTML = '';
      this.showToys(this.rangeFilterYear.filter(this.rangeFilterCount.filter(this.toys)));
    });
  }

  listenSortFilter() {
    const select = document.querySelector('.filter__select');
    select!.addEventListener('change', (event) => {
      const selectedElement = <HTMLSelectElement>event.target;
      this.settings.current.sortState = +selectedElement.value;
      this.refreshResult();
    });
  }

  showToys(filteredToys: Toy[]): void {
    filteredToys.forEach((toy) => {
      const toyCard = new ToyCard(toy);
      this.toysContainer.appendChild(toyCard.fill());
    });
  }

  refreshResult() {
    this.toysContainer.innerHTML = '';
    this.sortFilter.sort();
    this.showToys(
      this.valueFilter.filter(
        this.rangeFilterYear.filter(
          this.rangeFilterCount.filter(this.toys)
        )
      )
    );
    // this.showToys(this.rangeFilterYear.filter(this.rangeFilterCount.filter(this.toys)));
  }

  listenReset() {
    document.querySelector('.reset')?.addEventListener('click', () => {
      this.settings.reset(() => {
        this.sortFilter.reset();
        this.rangeFilterCount.reset();
        this.rangeFilterYear.reset();
        this.refreshResult();
      });
    });
  }
}
