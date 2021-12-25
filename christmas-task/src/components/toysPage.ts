import { AppDataInt } from '../appData/appdata';
import { ValueFilter, ValueFilterInt } from './valueFilter';
import { RangeFilter, RangeFilterInt } from './range';
import { SortFilter, SortFilterInt } from './sort';
import { ToyCard } from './toyCard';
import { Toy } from '../appData/toys';
import { Section, SectionInt } from './section';

export interface ToysPageInt extends SectionInt {
  appData: AppDataInt;
  toysContainer: HTMLElement;
  valueFilter: ValueFilterInt;
  rangeFilterCount: RangeFilterInt;
  rangeFilterYear: RangeFilterInt;
  sortFilter: SortFilterInt;

  create(): HTMLElement;
}

export default class ToysPage extends Section {
  appData: AppDataInt;

  toysContainer: HTMLElement;

  valueFilter: ValueFilterInt;

  rangeFilterCount: RangeFilterInt;

  rangeFilterYear: RangeFilterInt;

  sortFilter: SortFilterInt;

  constructor(toysPage: string, appData: AppDataInt) {
    super(toysPage);
    this.appData = appData;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.toysContainer = this.section.querySelector('.toys-container')!;
    this.valueFilter = new ValueFilter(this.section, this.appData);
    this.rangeFilterCount = new RangeFilter(this.section, this.appData, this.appData.countStep, 'count');
    this.rangeFilterYear = new RangeFilter(this.section, this.appData, this.appData.yearStep, 'year');
    this.sortFilter = new SortFilter(this.section, this.appData);
  }

  create() {
    this.init();
    return this.section;
  }

  private init() {
    this.valueFilter.init();
    this.rangeFilterCount.init();
    this.rangeFilterYear.init();
    this.listenValueFilter();
    this.listenRageFilter();
    this.listenSortFilter();
    this.listenReset();
    this.listenToysReset();
    this.listenSortFavorites();
    this.showToys(this.appData.toys);
  }

  private listenValueFilter() {
    this.section.querySelectorAll('.filter__button_value').forEach((button) => {
      button.addEventListener('click', () => {
        setTimeout(() => {
          this.refreshResult();
        }, 0);
      });
    });
  }

  private listenRageFilter() {
    this.rangeFilterCount.slider.noUiSlider.on('end', () => {
      this.toysContainer.innerHTML = '';
      this.refreshResult();
    });

    this.rangeFilterYear.slider.noUiSlider.on('end', () => {
      this.toysContainer.innerHTML = '';
      this.refreshResult();
    });
  }

  private listenSortFilter() {
    const select = this.section.querySelector('.filter__select');
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    select!.addEventListener('change', (event) => {
      const selectedElement = <HTMLSelectElement>event.target;
      this.appData.sortState = +selectedElement.value;
      this.refreshResult();
    });
  }

  private listenSortFavorites() {
    this.section.querySelector('.filter__input')?.addEventListener('change', (e) => {
      const input = <HTMLInputElement> e.target;
      this.appData.isFavoriteFilterEnabled = input.checked;
      this.refreshResult();
    });
  }

  private showToys(filteredToys: Toy[]): void {
    this.showNoResult(filteredToys.length);
    filteredToys.forEach((toy) => {
      const toyCardTemplate = new ToyCard(toy);
      const toyCard = toyCardTemplate.fill();
      this.toysContainer.appendChild(toyCard);
      this.listenSelect(toyCard);
    });
  }

  private refreshResult() {
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

  private listenReset() {
    this.section.querySelector('.reset')?.addEventListener('click', () => {
      this.appData.reset(() => {
        this.sortFilter.reset();
        this.rangeFilterCount.reset();
        this.rangeFilterYear.reset();
        this.valueFilter.reset();
        this.refreshResult();
      });
    });
  }

  private listenToysReset() {
    this.section.querySelector('.reset-favorite')?.addEventListener('click', () => {
      this.appData.toys.forEach((toy) => {
        // eslint-disable-next-line no-param-reassign
        toy.selected = false;
      });
      this.section.querySelectorAll('.toy-card').forEach((card) => {
        card.classList.remove('selected');
      });
      const selectedNum = document.querySelector('.selected-toys') as HTMLSpanElement;
      selectedNum.textContent = '0';
    });
  }

  private listenSelect(toyCard: HTMLElement) {
    toyCard.addEventListener('click', () => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const toyNum = +toyCard.getAttribute('data-num')! - 1;
      this.appData.toys[toyNum].selected = !this.appData.toys[toyNum].selected;
    });
  }

  private showNoResult(result: number) {
    const noResult = this.section.querySelector('.no-result') as HTMLSpanElement;
    if (result === 0) {
      noResult.innerHTML = 'Под ваши критерии не подходит ни одна игрушка :( ...';
    } else {
      noResult.innerHTML = '';
    }
  }
}
