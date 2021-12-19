import { Toy } from '../appData/toys';

export interface ToyCardInt {
  toyProps: Toy;
  card: HTMLElement;
  fill(): HTMLElement;
}

export class ToyCard implements ToyCardInt {

  toyProps: Toy;
  card: HTMLElement;

  constructor(data: Toy) {
    this.toyProps = data 
    this.card = document.createElement('div');
    this.card.classList.add('toy-card');
    this.card.innerHTML = `<h4 class="toy-title"></h4>
                          <p class="property-title">Количество:</p>
                          <p class="property-title">Год покупки:</p>
                          <p class="property-title">Форма:</p>
                          <p class="property-title">Цвет:</p>
                          <p class="property-title">Размер:</p>
                          <p class="property-title">Любимая:</p>
                          <div class="favourite"></div>`;
  }

  fill() {
    Object.values(this.toyProps).forEach((value, index) => {
      this.card.querySelectorAll('.property-title')[index].textContent += ` ${value}`
    })
      this.card.style.backgroundImage = `url(../../assets/toys/${this.toyProps.num}.png)`;

    return this.card;
  }
}
