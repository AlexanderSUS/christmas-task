import { Toy } from '../appData/data';

type MinMax = {
    minRange: number;
    maxRange: number;
};

export type Values = { colors: boolean[]; shapes: boolean[]; sizes: boolean[] };

export interface SettingsType {
    values: Values;
    ranges: MinMax[];
    favourite: boolean[];
    sortState: number;
}

export interface SettingsTypeClassInt {
  defaultSettings: SettingsType;
  settings: SettingsType;
  reset(): void;
}

export class Settings  implements SettingsTypeClassInt {

  defaultSettings: SettingsType;
  settings: SettingsType;

  constructor(data: Toy[]) {

    this.defaultSettings = {
        values: {
        colors: new Array(5).fill(false) as Array<boolean>,
        shapes: new Array(5).fill(false) as Array<boolean>,
        sizes: new Array(3).fill(false) as Array<boolean>,
      },
      ranges: [
        {
          minRange: Math.min(...data.map(({ count }) => +count)),
          maxRange: Math.max(...data.map(({ count }) => +count)),
        },
        {
          minRange: Math.min(...data.map(({ year }) => +year)),
          maxRange: Math.max(...data.map(({ year }) => +year)),
        },
      ],
      favourite: new Array(60).fill(false),
      sortState: 0,
    }

    this.settings = localStorage.getItem('christmas-settings') ? JSON.parse(localStorage.getItem('christmas-settings')!) : this.defaultSettings;  

  }

  reset() {
    this.settings = this.defaultSettings;
  }
}
