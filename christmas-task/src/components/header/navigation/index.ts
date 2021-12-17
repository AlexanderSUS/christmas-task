import TreeLogo from '../../../assets/svg/tree.svg';
import './index.scss';

type Name = string;
type Link = string;

interface INavListItem {
  name: Name;
  link?: Link;
}

export class NavListItemHtmlElement {
  element: HTMLElement;

  constructor(name: Name, link: Link = '#') {
    this.element = document.createElement('a'); 
    this.element.setAttribute('href', link.toLowerCase());
    this.element.textContent = name.toUpperCase();
    this.element.classList.add('navbar__link');
  }
}

const navBar = document.createElement('nav');
navBar.classList.add('navbar')

const navBarList = document.createElement('ul');
navBarList.classList.add('navbar__list');

const toStartLinkImg = document.createElement('img');
toStartLinkImg.src = TreeLogo;
toStartLinkImg.classList.add('navbar__img')

navBar.appendChild(navBarList);

const navBarItems: INavListItem[] = [{name: ''}, {name: 'игрушки'}, {name: 'ёлка'}];

navBarItems.forEach(element => {
  const el = new NavListItemHtmlElement(element.name);
  const li = document.createElement('li');
  li.classList.add('navbar__list-item')
  li.appendChild(el.element);
  navBarList.appendChild(li);
});

navBarList.firstChild?.appendChild(toStartLinkImg);

export default navBar;
