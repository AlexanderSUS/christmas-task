import { FilterContainer } from "../components/filters/filters";
import { Settings } from "./settingsLoader";

export interface PageInt {
  page: HTMLElement | null
  header: HTMLElement;
  main: HTMLElement;
  footer: HTMLElement;
  filtersContainer: FilterContainer 
  toysContainer: HTMLElement
  drawPage():void;
}

export class Page implements PageInt {

  page: HTMLElement | null;
  header: HTMLElement;
  main: HTMLElement;
  footer: HTMLElement;
  filtersContainer: FilterContainer 
  toysContainer: HTMLElement

  constructor(header: HTMLElement, main: HTMLElement, footer: HTMLElement, filtersContainer: FilterContainer, toysContainer: HTMLElement) {
    this.page = document.getElementById('root')
    this.header = header;
    this.main = main;
    this.footer = footer;
    this.filtersContainer = filtersContainer;
    this.toysContainer = toysContainer;
  }

  drawPage() {

    window.onload = () => {
      this.main.appendChild(this.filtersContainer.render());
      this.main.appendChild(this.toysContainer);

      this.page?.appendChild(this.header);
      this.page?.appendChild(this.main);
      this.page?.appendChild(this.footer);
    }
  }
}
