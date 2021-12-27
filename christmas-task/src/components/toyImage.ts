import { AppDataInt } from '../appData/appdata';

export interface ToyElementInt {
  index: number;
  appData: AppDataInt
  imageContainer: HTMLElement;
  restImageContainer: HTMLElement;
  image: HTMLImageElement;
  x: number;
  y: number;
  create(): HTMLElement;
}

export class ToyElement implements ToyElementInt {
  index: number;

  appData: AppDataInt;

  imageContainer: HTMLElement;

  restImageContainer: HTMLElement;

  image: HTMLImageElement;

  x: number;

  y: number;

  constructor(index: number, appData: AppDataInt) {
    this.index = index - 1;
    this.appData = appData;
    this.imageContainer = document.createElement('div');
    this.imageContainer.classList.add('toy-element');

    this.restImageContainer = document.createElement('span');
    this.restImageContainer.classList.add('rested-toys');
    this.restImageContainer.textContent = this.appData.toys[this.index].count;

    this.image = document.createElement('img');
    this.image.classList.add('toy-image');
    this.image.src = `../assets/toys/${this.index + 1}.png`;
    this.image.setAttribute('draggable', 'true');
    this.imageContainer.appendChild(this.image);
    this.imageContainer.appendChild(this.restImageContainer);
  }

  set thisX(num: number) {
    this.x = num;
  }

  set thisY(num: number) {
    this.y = num;
  }

  create() {
    this.init();
    return this.imageContainer;
  }

  private init() {
    this.dragStartListener(this.image);
    this.dragEndListener(this.image);
    this.cloneListener(this.image);
    this.decrementRest(this.image);
    this.removeCloneListener(this.image);
  }

  /* primary listeners */
  private dragStartListener(element: HTMLElement) {
    element.addEventListener('dragstart', (e) => {
      this.moveToy(e);
    });
  }

  private dragEndListener(element: HTMLElement) {
    element.addEventListener('dragend', (e) => {
      this.moveToy(e);
    });
  }
  /* end primary listeners */

  private cloneListener(element: HTMLElement) {
    element.addEventListener('dragstart', (e) => {
      this.cloneImage(e.target as HTMLElement);
      console.log('clone');
    });
  }

  private removeCloneListener(element: HTMLElement) {
    element.addEventListener('dragend', () => {
      element.removeEventListener('start', (e) => {
        this.cloneImage(e.target as HTMLElement);
        console.log('clone');
      });
    });
  }

  private moveToy(e: DragEvent) {
    if (e.type === 'dragstart') {
      this.thisX = e.clientX;
      this.thisY = e.clientY;
    } else if (e.type === 'dragend') {
      const draggedImage = e.target as HTMLImageElement;
      draggedImage.style.left = `${+draggedImage.style.left.split('px')[0] + 5 + (e.clientX - this.x)}px`;
      draggedImage.style.top = `${+draggedImage.style.top.split('px')[0] + 5 + (e.clientY - this.y)}px`;
    }
  }

  private decrementRest(element: HTMLElement) {
    element.addEventListener('dragstart', () => {
      if (+this.appData.toys[this.index].count > 0) {
        this.appData.toys[this.index].count = `${+this.appData.toys[this.index].count - 1}`;
        this.restImageContainer.textContent = this.appData.toys[this.index].count;
      }
    });
  }

  private incrementRest() {
    this.appData.toys[this.index].count = `${+this.appData.toys[this.index].count + 1}`;
    this.restImageContainer.textContent = this.appData.toys[this.index].count;
  }

  private cloneImage(element: HTMLElement) {
    if (+this.appData.toys[this.index].count > 0) {
      const clone = element.cloneNode();
      this.setCloneListeners(clone as HTMLElement);
      this.image.parentElement?.prepend(clone);
    }
  }

  private setCloneListeners(clone: HTMLElement) {
    this.dragStartListener(clone);
    this.dragEndListener(clone);
    this.decrementRest(clone);
    this.cloneListener(clone);
    this.removeCloneListener(clone);
  }
}
