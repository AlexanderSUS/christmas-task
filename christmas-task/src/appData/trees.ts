import Tree1 from '../assets/tree/1.png';
import Tree2 from '../assets/tree/2.png';
import Tree3 from '../assets/tree/3.png';
import Tree4 from '../assets/tree/4.png';
import Tree5 from '../assets/tree/5.png';
import Tree6 from '../assets/tree/6.png';

export interface Tree {
  src: string;
  active: boolean;
}

const trees: Tree[] = [
  {
    src: Tree1,
    active: true,
  },
  {
    src: Tree2,
    active: false,
  },
  {
    src: Tree3,
    active: false,
  },
  {
    src: Tree4,
    active: false,
  },
  {
    src: Tree5,
    active: false,
  },
  {
    src: Tree6,
    active: false,
  },
];

export default trees;
