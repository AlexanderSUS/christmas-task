import { AppDataInt } from '../appData/appdata';

export interface LightsSwitchInt {
  init(): void;
}

export class LightsSwitch implements LightsSwitchInt {
  parent: HTMLElement;

  appData: AppDataInt;

  // eslint-disable-next-line no-undef
  buttons: NodeListOf<Element>;

  switch: HTMLInputElement | null;

  garland: HTMLInputElement | null;

  constructor(parent: HTMLElement, appData: AppDataInt) {
    this.parent = parent;
    this.appData = appData;
    this.buttons = parent.querySelectorAll('.light-button');
    this.switch = parent.querySelector('.light-switch__input');
    this.garland = this.parent.querySelector('.lights-container');
  }

  init() {
    this.turnOnDefault();
    this.switchColorListener();
    this.turnLightsListener();
  }

  private switchColorListener() {
    this.buttons.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        this.turnOffBtnsAll();

        const selectedButton = e.target as HTMLElement;
        const color = selectedButton.getAttribute('data-num');
        selectedButton.classList.add('active');

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.switchGarlandColor(+color!);
      });
    });
  }

  private turnOffBtnsAll() {
    this.buttons.forEach((btn) => {
      btn.classList.remove('active');
    });
  }

  private turnOnDefault() {
    this.buttons[this.appData.ligths.color].classList.add('active');
    this.garland?.classList.add(`color${this.appData.ligths.color}`);
  }

  private turnLightsListener() {
    this.switch?.addEventListener('change', () => {
      if (this.switch?.checked) {
        this.turnOnGarland();
      } else {
        this.turnOffGarland();
      }
    });
  }

  private turnOnGarland() {
    this.garland?.classList.add('active');
    this.appData.ligths.isOn = true;
  }

  private turnOffGarland() {
    this.garland?.classList.remove('active');
    this.appData.ligths.isOn = false;
  }

  switchGarlandColor(color: number) {
    this.garland?.classList.remove(`color${this.appData.ligths.color}`);
    this.appData.ligths.color = color;
    this.garland?.classList.add(`color${this.appData.ligths.color}`);
  }
}
