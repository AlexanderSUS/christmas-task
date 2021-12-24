import Bg1 from '../assets/bg/1.jpg';
import Bg2 from '../assets/bg/2.jpg';
import Bg3 from '../assets/bg/3.jpg';
import Bg4 from '../assets/bg/4.jpg';
import Bg5 from '../assets/bg/5.jpg';
import Bg6 from '../assets/bg/6.jpg';
import Bg7 from '../assets/bg/7.jpg';
import Bg8 from '../assets/bg/8.jpg';
import Bg9 from '../assets/bg/9.jpg';
import Bg10 from '../assets/bg/10.jpg';

export interface Background {
  src: string;
  active: boolean;
}

const backgrounds: Background[] = [
  {
    src: Bg1,
    active: true,
  },
  {
    src: Bg2,
    active: false,
  },
  {
    src: Bg3,
    active: false,
  },
  {
    src: Bg4,
    active: false,
  },
  {
    src: Bg5,
    active: false,
  },
  {
    src: Bg6,
    active: false,
  },
  {
    src: Bg7,
    active: false,
  },
  {
    src: Bg8,
    active: false,
  },
  {
    src: Bg9,
    active: false,
  },
  {
    src: Bg10,
    active: false,
  },
];

export default backgrounds;
