import { Toy } from '../appData/data';

type MinMax = {
    minRange: number;
    maxRange: number;
};

type Values = { colors: boolean[]; shapes: boolean[]; sizes: boolean[] };

interface SettingsType {
    values: Values;
    ranges: MinMax[];
    favourite: boolean[];
}

export interface SettingsTypeClassInt {
  settings: SettingsType;
  loadSettings(): void;
}

export class Settings  implements SettingsTypeClassInt {

  settings: SettingsType;

  constructor(data: Toy[]) {

    this.settings =  {
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
    }
  }

  loadSettings() {
    const savedSettings = localStorage.getItem('christmas-settings');
    if (savedSettings !== null) {
      this.settings = JSON.parse(savedSettings);
    }
  }
}
