import './index.scss';

export interface SortFilterInt {
  filter: HTMLElement;
  render(): HTMLElement;
}

export class SortFilter {

filter: HTMLElement;  

  constructor() {
   this.filter = document.createElement('section');
   this.filter.classList.add('sort-filter');
   this.filter.innerHTML = `<h3 class="sort-filter__title">СОРТИРОВКА</h3>
                           <select class="sort-filter__select" id="sort">
                             <option value="sort-name-min">По названию от «А» до «Я»</option>
                              <option value="sort-name-max">По названию от «Я» до «А»</option>
                              <option value="sort-count-min">По количеству по возрастанию</option>
                              <option value="sort-count-max">По количеству по убыванию</option>
                            </select>
                            <button class="sort-filter__reset">Сброс фильтров</button>`;
  }

  render() {
    return this.filter;
  }
}
