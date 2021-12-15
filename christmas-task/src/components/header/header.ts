import './index.scss';
import navBar from './navigation/index';
import searchBar from './searchbar';

const header = document.createElement('header');
header.classList.add('header');


header.appendChild(navBar);
header.appendChild(searchBar);

export default header;
