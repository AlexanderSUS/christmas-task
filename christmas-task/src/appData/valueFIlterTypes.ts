import Ball from '../assets/svg/ball.svg';
import Bell from '../assets/svg/bell.svg';
import Cone from '../assets/svg/cone.svg';
import Snowflake from '../assets/svg/snowflake.svg';
import Toy from '../assets/svg/toy.svg';

export type ValueFilterType = {
  [key: string]: string;
}

export type ValueFilterTypes = {
  [key: string]: ValueFilterType[];
}

const valueFilterTypes: ValueFilterTypes = {
  colors: [
    {
      name: 'белый',
      value: '#ffffff',
    },
    {
      name: 'желтый',
      value: '#fdd700',
    },
    {
      name: 'красный',
      value: '#fd0000',
    },
    {
      name: 'синий',
      value: '#2299eb',
    },
    {
      name: 'зелёный',
      value: '#08aa05',
    },
  ],
  shapes: [
    {
      name: 'шар',
      value: Ball,
    },
    {
      name: 'колокольчик',
      value: Bell,
    },
    {
      name: 'шишка',
      value: Cone,
    },
    {
      name: 'снежинка',
      value: Snowflake,
    },
    {
      name: 'фигурка',
      value: Toy,
    },
  ],
  sizes: [
    {
      name: 'большой',
      value: Ball,
    },
    {
      name: 'средний',
      value: Ball,
    },
    {
      name: 'малый',
      value: Ball,
    },
  ],
};

export default valueFilterTypes;
