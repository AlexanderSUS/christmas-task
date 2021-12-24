import { ContentInt } from './content';

export default class Router {
  currentLocation: string;

  target: HTMLElement | null;

  content: ContentInt;

  currentContent: HTMLElement;

  constructor(content: ContentInt) {
    this.currentLocation = document.location.hash.slice(1);
    this.target = document.querySelector('main');
    this.content = content;
    this.currentContent = content[this.currentLocation];
  }

  init() {
    window.onload = () => {
      // eslint-disable-next-line prefer-destructuring
      document.location.hash = Object.keys(this.content)[0];
      this.addNewContent();
      this.changeLocationListener();
    };
  }

  changeLocationListener() {
    window.addEventListener('hashchange', () => {
      this.updatePage();
    });
  }

  updatePage() {
    if (this.isLocationChanged()) {
      this.updateCurrentLocation();
      this.removeOldContent();
      this.updateCurrentContent();
      this.addNewContent();
    }
  }

  updateCurrentLocation() {
    this.currentLocation = document.location.hash.slice(1);
  }

  updateCurrentContent() {
    this.currentContent = this.content[this.currentLocation];
  }

  removeOldContent() {
    this.target?.removeChild(this.currentContent);
  }

  addNewContent() {
    this.target?.append(this.currentContent);
  }

  isLocationChanged() {
    return this.currentLocation !== document.location.hash.slice(1);
  }
}
