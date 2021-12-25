import { ContentReturnType, ContentInt } from './content';

export interface RouterInt {
  currentLocation: string;
  target: HTMLElement | null;
  content: ContentReturnType;
  currentContent: HTMLElement;
  init(): void;
}

export default class Router implements RouterInt {
  currentLocation: string;

  target: HTMLElement | null;

  content: ContentReturnType;

  currentContent: HTMLElement;

  constructor(content: ContentInt) {
    this.currentLocation = document.location.hash.slice(1);
    this.target = document.querySelector('main');
    this.content = content.getContent();
    this.currentContent = this.content[this.currentLocation];
  }

  init() {
    window.onload = () => {
      // eslint-disable-next-line prefer-destructuring
      document.location.hash = Object.keys(this.content)[0];
      this.addNewContent();
      this.changeLocationListener();
    };
  }

  private changeLocationListener() {
    window.addEventListener('hashchange', () => {
      this.updatePage();
    });
  }

  private updatePage() {
    if (this.isLocationChanged()) {
      this.updateCurrentLocation();
      this.removeOldContent();
      this.updateCurrentContent();
      this.addNewContent();
    }
  }

  private updateCurrentLocation() {
    this.currentLocation = document.location.hash.slice(1);
  }

  private updateCurrentContent() {
    this.currentContent = this.content[this.currentLocation];
  }

  private removeOldContent() {
    this.target?.removeChild(this.currentContent);
  }

  private addNewContent() {
    this.target?.append(this.currentContent);
  }

  private isLocationChanged() {
    return this.currentLocation !== document.location.hash.slice(1);
  }
}
