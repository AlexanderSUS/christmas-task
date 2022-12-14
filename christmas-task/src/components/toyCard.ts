import { Toy } from '../appData/toys';

export interface ToyCardInt {
  toyImageLink: string;
  toyProps: Toy;
  card: HTMLElement;
  fill(): HTMLElement;
  setCardListener(): void;
  onOffSelect(selectedNumElement: HTMLSpanElement, currenSelectedNum: number): void;
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
                            <p class="property-title">Любимая:</p>`;
  }

  fill() {
    const props = this.card.querySelectorAll('.property-title');
    const SLELECTED = 8;
    this.card.setAttribute('data-num', this.toyProps.num);

    Object.values(this.toyProps).forEach((value, index) => {
      if (index > 0 && index < SLELECTED) {
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
    if (this.toyProps.selected) {
      this.card.classList.add('selected');
    }
    this.card.style.backgroundImage = `url(./assets/toys/${this.toyProps.num}.png)`;
    this.setCardListener();

    return this.card;
  }

  setCardListener() {
    this.card.addEventListener('click', () => {
      const selectedNumElement = document.querySelector('.selected-toys') as HTMLSpanElement;
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const currenSelectedNum = +selectedNumElement.textContent!;
      if (currenSelectedNum < 20) {
        this.onOffSelect(selectedNumElement, currenSelectedNum);
      } else if (currenSelectedNum === 20 && this.card.classList.contains('selected')) {
        this.onOffSelect(selectedNumElement, currenSelectedNum);
      } else {
        // eslint-disable-next-line no-alert
        alert('Извините, все слоты заполнены');
      }
    });
  }

  onOffSelect(selectedNumElement: HTMLSpanElement, currenSelectedNum: number): void {
    this.card.classList.toggle('selected');
    // eslint-disable-next-line no-param-reassign
    selectedNumElement.textContent = this.card.classList.contains(
      'selected',
    ) ? (currenSelectedNum + 1).toString() : (currenSelectedNum - 1).toString();
  }
}
