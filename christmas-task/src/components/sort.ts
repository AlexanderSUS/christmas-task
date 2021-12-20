import { SettingsTypeClassInt } from '../utils/settings';
import { Toy } from '../appData/toys';

export interface SortFilterInt {
  settings: SettingsTypeClassInt;
  toys: Toy[]
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
  settings: SettingsTypeClassInt;

  toys: Toy[];

  selectElement: HTMLSelectElement;

  constructor(settings: SettingsTypeClassInt, toys: Toy[]) {
    this.settings = settings;
    this.toys = toys;
    this.selectElement = <HTMLSelectElement>document.querySelector('.filter__select')
  }

  sortByAlphabet() {
    this.toys.sort((a, b) => {
      const name1 = a.name.toLowerCase();
      const name2 = b.name.toLowerCase();
      if (name1 > name2) { return 1; }
      if (name1 < name2) { return -1; }
      return 0;
    });
  }

  sortByAlphabetReverse() {
    this.toys.sort((a, b) => {
      const name1 = a.name.toLowerCase();
      const name2 = b.name.toLowerCase();
      if (name1 < name2) { return 1; }
      if (name1 > name2) { return -1; }
      return 0;
    });
  }

  sortByNumber() {
    this.toys.sort((a, b) => +a.num - +b.num);
  }

  sortByQuantity() {
    this.toys.sort((a, b) => +a.count - +b.count);
  }

  sortByQuantityReverse() {
    this.toys.sort((a, b) => +b.count - +a.count);
  }

  sort() {
    switch (this.settings.current.sortState) {
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
