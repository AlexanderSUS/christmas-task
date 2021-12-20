import { Toy } from '../appData/toys';

export interface ToyCardInt {
  toyImageLink: string;
  toyProps: Toy;
  card: HTMLElement;
  fill(): HTMLElement;
}

export class ToyCard implements ToyCardInt {
  toyImageLink: string;

  toyProps: Toy;

  card: HTMLElement;

  constructor(data: Toy) {
    this.toyImageLink = '';
    this.toyProps = data;
    this.card = document.createElement('div');
    this.card.classList.add('toy-card');
    this.card.innerHTML = `<h4 class="property-title toy-title"></h4>
                            <p class="property-title">Количество:</p>
                            <p class="property-title">Год покупки:</p>
                            <p class="property-title">Форма:</p>
                            <p class="property-title">Цвет:</p>
                            <p class="property-title">Размер:</p>
                            <p class="property-title">Любимая:</p>
                            <div class="property-title favourite"></div>`;
  }

  fill() {
    const props = this.card.querySelectorAll('.property-title');

    Object.values(this.toyProps).forEach((value, index) => {
      if (index !== 0) {
        if (typeof value === 'boolean') {
          value = value ? 'да' : 'нет';
        }
        props[index - 1].innerHTML += ` ${value}`;
      }
    });
    this.card.style.backgroundImage = `url(./assets/toys/${this.toyProps.num}.png)`;

    return this.card;
  }
}
