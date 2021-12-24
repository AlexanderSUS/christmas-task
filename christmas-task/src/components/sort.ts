import { AppDataInt } from '../appData/appdata';

export interface SortFilterInt {
  parent: HTMLElement;
  toysPageData: AppDataInt;
  selectElement: HTMLSelectElement
  sort():void;
  reset(): void;
}

export class SortFilter {
  parent: HTMLElement;

  toysPageData: AppDataInt;

  selectElement: HTMLSelectElement;

  constructor(parent: HTMLElement, toysPageData: AppDataInt) {
    this.parent = parent;
    this.toysPageData = toysPageData;
    this.selectElement = <HTMLSelectElement> this.parent.querySelector('.filter__select');
  }

  private sortByAlphabet() {
    this.toysPageData.toys.sort((a, b) => {
      const name1 = a.name.toLowerCase();
      const name2 = b.name.toLowerCase();
      if (name1 > name2) { return 1; }
      if (name1 < name2) { return -1; }
      return 0;
    });
  }

  private sortByAlphabetReverse() {
    this.toysPageData.toys.sort((a, b) => {
      const name1 = a.name.toLowerCase();
      const name2 = b.name.toLowerCase();
      if (name1 < name2) { return 1; }
      if (name1 > name2) { return -1; }
      return 0;
    });
  }

  private sortByNumber() {
    this.toysPageData.toys.sort((a, b) => +a.num - +b.num);
  }

  private sortByQuantity() {
    this.toysPageData.toys.sort((a, b) => +a.count - +b.count);
  }

  private sortByQuantityReverse() {
    this.toysPageData.toys.sort((a, b) => +b.count - +a.count);
  }

  private sortByYear() {
    this.toysPageData.toys.sort((a, b) => +a.year - +b.year);
  }

  private sortByYearReverse() {
    this.toysPageData.toys.sort((a, b) => +b.year - +a.year);
  }

  sort() {
    switch (this.toysPageData.sortState) {
      case 0: this.sortByNumber(); break;
      case 1: this.sortByAlphabet(); break;
      case 2: this.sortByAlphabetReverse(); break;
      case 3: this.sortByQuantity(); break;
      case 4: this.sortByQuantityReverse(); break;
      case 5: this.sortByYear(); break;
      case 6: this.sortByYearReverse(); break;
      default: this.sortByNumber();
    }
  }

  reset() {
    this.selectElement.selectedIndex = 0;
  }
}
