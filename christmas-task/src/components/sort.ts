import { AppDataInt } from '../appData/appdata';

export interface SortFilterInt {
  appData: AppDataInt;
  selectElement: HTMLSelectElement
  sortByAlphabet(): void;
  sortByAlphabetReverse(): void;
  sortByNumber(): void;
  sortByQuantity():void;
  sortByQuantityReverse():void;
  sort():void;
  reset(): void;
}

export class SortFilter {
  appData: AppDataInt;

  selectElement: HTMLSelectElement;

  constructor(appData: AppDataInt) {
    this.appData = appData;
    this.selectElement = <HTMLSelectElement>document.querySelector('.filter__select');
  }

  sortByAlphabet() {
    this.appData.toys.sort((a, b) => {
      const name1 = a.name.toLowerCase();
      const name2 = b.name.toLowerCase();
      if (name1 > name2) { return 1; }
      if (name1 < name2) { return -1; }
      return 0;
    });
  }

  sortByAlphabetReverse() {
    this.appData.toys.sort((a, b) => {
      const name1 = a.name.toLowerCase();
      const name2 = b.name.toLowerCase();
      if (name1 < name2) { return 1; }
      if (name1 > name2) { return -1; }
      return 0;
    });
  }

  sortByNumber() {
    this.appData.toys.sort((a, b) => +a.num - +b.num);
  }

  sortByQuantity() {
    this.appData.toys.sort((a, b) => +a.count - +b.count);
  }

  sortByQuantityReverse() {
    this.appData.toys.sort((a, b) => +b.count - +a.count);
  }

  sort() {
    switch (this.appData.sortState) {
      case 0: this.sortByNumber(); break;
      case 1: this.sortByAlphabet(); break;
      case 2: this.sortByAlphabetReverse(); break;
      case 3: this.sortByQuantity(); break;
      case 4: this.sortByQuantityReverse(); break;
      default: this.sortByNumber();
    }
  }

  reset() {
    this.selectElement.selectedIndex = 0;
  }
}
