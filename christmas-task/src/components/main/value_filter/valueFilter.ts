import './index.scss';
import valueFilterData from './valueFIlterData';

const valueFilter = document.createElement('section');
valueFilter.classList.add('value-filter');

valueFilter.innerHTML = `<h3 class="value-filter__title">Фильтры по значению</h3>
                        <div class="value-filter__container shape">
                          <h6 class="value-filter__subtitle">Форма:</h6>
                        </div>
                        <div class="value-filter__container color">
                          <h6 class="value-filter__subtitle">Цвет:</h6>
                        </div>
                        <div class="value-filter__container size">
                          <h6 class="value-filter__subtitle">Размер:</h6>
                        </div>
                        <div class="value-filter__container">
                          <h6 class="value-filter__subtitle favourite">Только любиыме:</h6>
                          <input class="value-filter__input" type="checkbox">
                        </div>`;

Object.keys(valueFilterData).forEach((key) => {
  const propertyLis =  valueFilterData[key as keyof typeof valueFilterData];
  const filter = valueFilter.querySelector(`.${key}`);

  propertyLis.forEach((element) => {

    const button = document.createElement('button');
    button.classList.add('filter-button');

    if (element.value[0] !== '#') {
      const buttonImage = document.createElement('img');
      buttonImage.classList.add('filter-button__image');
      buttonImage.src = element.value;
      button.appendChild(buttonImage);
    } else {
     button.classList.add('filter-button_color'); 
     button.style.backgroundColor = element.value;
    }      

    filter?.appendChild(button);
  });
});

export default valueFilter;

