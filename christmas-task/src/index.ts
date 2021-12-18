import './style/index.scss';
import data from './appData/data'; 
import valueFilterTypes from './appData/valueFIlterTypes';
import { SortFilter } from './components/filters/sort/sort';
import { RangeFilter } from './components/filters/range_filter/rangeFilter';
import { ValueFilter } from './components/filters/value_filter/valueFilter';
import { FilterContainer } from "./components/filters/filters";
import header from './components/header/header';
import main from './components/main/main';
import footer from './components/footer/footer';
import toysContainer from './components/toysContainer/toysContainer';
import { PageInt } from './utils/pageDrawer';
import { Page } from './utils/pageDrawer';
import { Settings } from './utils/settingsLoader';

class App {
  page: PageInt;
  constructor(page: PageInt) {
   this.page =  page; 
  }
  init() {
    this.page.drawPage();
  }
}

const app = new App(new Page(header, main, footer, new FilterContainer(
  new ValueFilter(valueFilterTypes, new Settings(data) ), new RangeFilter(data), new SortFilter()), toysContainer));

app.init();
