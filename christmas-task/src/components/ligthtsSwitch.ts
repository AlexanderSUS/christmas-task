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

  constructor(parent: HTMLElement, appData: AppDataInt) {
    this.parent = parent;
    this.appData = appData;
    this.buttons = parent.querySelectorAll('.light-button');
    this.switch = parent.querySelector('.light-switch__input');
  }

  init() {
    this.switchColorListener();
    this.turnLightsListener();
  }

  private switchColorListener() {
    this.buttons.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        this.turnOffAll();
        const selected = e.target as HTMLElement;
        const selectedNum = selected.getAttribute('data-num');

        selected.classList.add('active');
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.appData.ligths.color = +selectedNum!;
      });
    });
  }

  private turnOffAll() {
    this.buttons.forEach((btn) => {
      btn.classList.remove('active');
    });
  }

  private turnLightsListener() {
    this.switch?.addEventListener('change', () => {
      if (this.switch?.checked) {
        this.parent.querySelector('.lights-container')?.classList.add('active');
        this.appData.ligths.isOn = true;
      } else {
        this.parent.querySelector('.lights-container')?.classList.remove('active');
        this.appData.ligths.isOn = false;
      }
    });
  }
}
