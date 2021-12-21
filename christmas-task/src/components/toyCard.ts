import { Toy } from '../appData/toys';

export interface ToyCardInt {
  toyImageLink: string;
  toyProps: Toy;
  card: HTMLElement;
  fill(): HTMLElement;
  setCardListener(): void;
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
                            <div class="property-title"></div>`;
  }

  fill() {
    const props = this.card.querySelectorAll('.property-title');

    Object.values(this.toyProps).forEach((value, index) => {
      if (index !== 0) {
        if (typeof value === 'boolean') {
          // eslint-disable-next-line no-param-reassign
          value = value ? 'да' : 'нет';
          if (value) {
            props[props.length - 1].classList.add('favorite');
          }
        }
        props[index - 1].innerHTML += ` ${value}`;
      }
    });
    this.card.style.backgroundImage = `url(./assets/toys/${this.toyProps.num}.png)`;
    this.setCardListener();

    return this.card;
  }

  setCardListener() {
    // document.querySelectorAll('.toy-card').forEach((card) => {
    this.card.addEventListener('click', () => {
      const selectedNum = document.querySelector('.selected-toys') as HTMLSpanElement;
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const currenSelectedNum = +selectedNum.textContent!;
      if (currenSelectedNum <= 20) {
        this.card.classList.toggle('selected');
        if (selectedNum != null) {
          selectedNum.textContent = this.card.classList.contains(
            'selected',
          ) ? (currenSelectedNum + 1).toString() : (currenSelectedNum - 1).toString();
        }
      } else {
        // eslint-disable-next-line no-alert
        alert('Извините, все слоты заполнены');
      }
    });
    // });
  }
}
