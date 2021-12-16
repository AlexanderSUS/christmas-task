import Ball from './assets/ball.svg';
import Bell from './assets/bell.svg';
import Cone from './assets/cone.svg';
import Snowflake from './assets/snowflake.svg';
import Toy from './assets/toy.svg';

const colors = [
  {
    name: 'красный',
    value: '#ffffff'
  },
  {
    name: 'желтый',
    value: '#fdd700'
  },
  {
    name: 'красный',
    value: '#fd0000'
  },
  {
    name: 'синий',
    value: '#2299eb'
  },
  {
    name: 'зелёный',
    value: '#08aa05'
  },
];

const shapes = [
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
];

const sizes = [
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
]

const valueFilterData = {
  shape: shapes,
  color: colors,
  size: sizes
}

export default valueFilterData;
