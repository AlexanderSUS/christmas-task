import { Toy } from '../appData/toys';

export type Values = { colors: boolean[]; shapes: boolean[]; sizes: boolean[] };

export type Ranges = {
  year: number[],
  count: number[],
}

export interface SettingsType {
    values: Values;
    ranges: Ranges;
    favourite: boolean[];
    sortState: number;
}

export interface SettingsTypeClassInt {
  default: SettingsType;
  current: SettingsType;
  reset(callback: () => void): void;
}

export class Settings  implements SettingsTypeClassInt {

  default: SettingsType;
  current: SettingsType;

  constructor(toys: Toy[]) {

    this.default = {
      values: {
        colors: new Array(5).fill(false) as Array<boolean>,
        shapes: new Array(5).fill(false) as Array<boolean>,
        sizes: new Array(3).fill(false) as Array<boolean>,
      },
      ranges: {
        count: [
          Math.min(...toys.map(({ count }) => +count)),
          Math.max(...toys.map(({ count }) => +count)),
        ],
        year: [
          Math.min(...toys.map(({ year }) => +year)),
          Math.max(...toys.map(({ year }) => +year)),
        ]
      },
      favourite: new Array(60).fill(false),
      sortState: 0,
    }

    this.current = localStorage.getItem('christmas-settings') ? JSON.parse(localStorage.getItem(
      'christmas-settings'
      )!) : JSON.parse(JSON.stringify(this.default));  
  }

  reset(callback: () => void) {
    this.current = JSON.parse(JSON.stringify(this.default));
    callback();
  }
}
