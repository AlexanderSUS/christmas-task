import './style/index.scss';
import header from './components/header/header';
import main from './components/main/main';
import footer from './components/footer/footer';

const root = document.getElementById('root');
root?.appendChild(header);
root?.appendChild(main);
root?.appendChild(footer);

