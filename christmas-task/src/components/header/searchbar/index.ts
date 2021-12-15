import './index.scss';

const searchBar = document.createElement('div');
searchBar.classList.add('search-bar');

const search = document.createElement('input');
search.classList.add('search-bar__input');
search.setAttribute('type', 'search');
search.setAttribute('autocomplete', 'off');
search.setAttribute('placeholder', 'Поиск игрушек');

const select = document.createElement('div');
select.classList.add('search-bar__output');
const showNumberElement = document.createElement('span');
showNumberElement.classList.add('search-bar__value');
showNumberElement.textContent = '0';
select.appendChild(showNumberElement);

searchBar.appendChild(search);
searchBar.appendChild(select);

export default searchBar;
