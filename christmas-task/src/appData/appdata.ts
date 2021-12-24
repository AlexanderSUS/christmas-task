import { Toy } from './toys';
import { ValueFilterProps } from './valueFilterProps';
import { Tree } from './trees';
import { Background } from './backgrounds';

export type Values = { [key: string]: boolean[] };

export type Ranges = {
  [key: string] : number[];
}

export interface AppDataInt {
  toys: Toy[];
  values: Values;
  ranges: Ranges;
  isFavorite: boolean[];
  sortState: number;
  isFavoriteFilterEnabled: boolean;
  valueFilterProps: ValueFilterProps;
  countStep: number;
  yearStep: number;
  trees: Tree[];
  backgrounds: Background[];
  reset(callback: () => void): void;
  resetFavorites(): void;
  resetValues(): void;
}

export class AppData implements AppDataInt {
  toys: Toy[];

  values: Values;

  ranges: Ranges;

  isFavorite: boolean[];

  sortState: number;

  isFavoriteFilterEnabled: boolean;

  valueFilterProps: ValueFilterProps;

  countStep: number;

  yearStep: number;

  trees: Tree[];

  backgrounds: Background[];

  constructor(toys: Toy[], valueFilterProps: ValueFilterProps, trees: Tree[], bg: Background[]) {
    this.toys = toys;
    this.values = {
      colors: new Array(valueFilterProps.colors.length).fill(false) as Array<boolean>,
      shapes: new Array(valueFilterProps.shapes.length).fill(false) as Array<boolean>,
      sizes: new Array(valueFilterProps.sizes.length).fill(false) as Array<boolean>,
    };
    this.ranges = {
      count: [
        Math.min(...toys.map(({ count }) => +count)),
        Math.max(...toys.map(({ count }) => +count)),
      ],
      year: [
        Math.min(...toys.map(({ year }) => +year)),
        Math.max(...toys.map(({ year }) => +year)),
      ],
    };
    this.isFavorite = toys.map(({ favorite }) => favorite);
    this.isFavoriteFilterEnabled = false;
    this.sortState = 0;
    this.valueFilterProps = valueFilterProps;
    this.countStep = 1;
    this.yearStep = 10;
    this.trees = trees;
    this.backgrounds = bg;
  }

  reset(callback: () => void) {
    this.resetFavorites();
    this.resetValues();
    this.sortState = 0;
    callback();
  }

  resetFavorites() {
    this.isFavoriteFilterEnabled = false;
    this.isFavorite.fill(false);
  }

  resetValues() {
    Object.keys(this.values).forEach((key) => {
      this.values[key].fill(false);
    });
  }
}
