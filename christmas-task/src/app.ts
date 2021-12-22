import { AppDataInt } from './appData/appdata';
import { ValueFilter, ValueFilterInt } from './components/valueFilter';
import { RangeFilter, RangeFilterInt } from './components/range';
import { SortFilter, SortFilterInt } from './components/sort';
import { ToyCard } from './components/toyCard';
import { Toy } from './appData/toys';

export default class App {
  appData: AppDataInt;

  toysContainer: HTMLElement;

  valueFilter: ValueFilterInt;

  rangeFilterCount: RangeFilterInt;

  rangeFilterYear: RangeFilterInt;

  sortFilter: SortFilterInt;

  constructor(appData: AppDataInt) {
    this.appData = appData;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.toysContainer = document.querySelector('.toys-container')!;
    this.valueFilter = new ValueFilter(this.appData);
    this.rangeFilterCount = new RangeFilter(this.appData, this.appData.countStep, 'count');
    this.rangeFilterYear = new RangeFilter(this.appData, this.appData.yearStep, 'year');
    this.sortFilter = new SortFilter(this.appData);
  }

  init() {
    this.valueFilter.init();
    this.rangeFilterCount.init();
    this.rangeFilterYear.init();
    this.listenValueFilter();
    this.listenRageFilter();
    this.listenSortFilter();
    this.listenReset();
    this.listenSortFavorites();
    this.showToys(this.appData.toys);
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
      this.refreshResult();
    });

    this.rangeFilterYear.slider.noUiSlider.on('end', () => {
      this.toysContainer.innerHTML = '';
      this.refreshResult();
    });
  }

  listenSortFilter() {
    const select = document.querySelector('.filter__select');
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    select!.addEventListener('change', (event) => {
      const selectedElement = <HTMLSelectElement>event.target;
      this.appData.sortState = +selectedElement.value;
      this.refreshResult();
    });
  }

  listenSortFavorites() {
    document.querySelector('.filter__input')?.addEventListener('change', (e) => {
      const input = <HTMLInputElement> e.target;
      this.appData.isFavoriteFilterEnabled = input.checked;
      this.refreshResult();
    });
  }

  showToys(filteredToys: Toy[]): void {
    this.showNoResult(filteredToys.length);
    filteredToys.forEach((toy) => {
      const toyCardTemplate = new ToyCard(toy);
      const toyCard = toyCardTemplate.fill();
      this.toysContainer.appendChild(toyCard);
      this.listenSelect(toyCard);
    });
  }

  refreshResult() {
    this.toysContainer.innerHTML = '';
    this.sortFilter.sort();
    this.showToys(
      this.valueFilter.filter(
        this.rangeFilterYear.filter(
          this.rangeFilterCount.filter(this.appData.toys),
        ),
      ),
    );
  }

  listenReset() {
    document.querySelector('.reset')?.addEventListener('click', () => {
      this.appData.reset(() => {
        this.sortFilter.reset();
        this.rangeFilterCount.reset();
        this.rangeFilterYear.reset();
        this.valueFilter.reset();
        this.refreshResult();
      });
      // const selected = document.querySelector('.selected-toys') as HTMLSpanElement;
      // if (selected != null) {
      //   selected.textContent = '0';
      // }
    });
  }

  listenSelect(toyCard: HTMLElement) {
    toyCard.addEventListener('click', () => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const toyNum = +toyCard.getAttribute('data-num')! - 1;
      this.appData.toys[toyNum].selected = !this.appData.toys[toyNum].selected;
    });
  }

  // eslint-disable-next-line class-methods-use-this
  showNoResult(result: number) {
    const noResult = document.querySelector('.no-result') as HTMLSpanElement;
    if (result === 0) {
      noResult.innerHTML = 'Под ваши критерии не подходит ни одна игрушка :( ...';
    } else {
      noResult.innerHTML = '';
    }
  }
}
