import { AppDataInt } from '../appData/appdata';

export interface SoundInt {
  appData: AppDataInt;
  parent: HTMLElement;
  audio: HTMLAudioElement;
  button: HTMLButtonElement | null;
  init(): void;
}

export class Sound implements SoundInt {
  appData: AppDataInt;

  parent: HTMLElement;

  audio: HTMLAudioElement;

  button: HTMLButtonElement | null;

  constructor(parent: HTMLElement, appData: AppDataInt) {
    this.parent = parent;
    this.appData = appData;
    this.audio = new Audio();
    this.audio.loop = true;
    this.audio.src = 'assets/audio/audio.mp3';
    this.button = this.parent.querySelector('.sound');
  }

  init() {
    this.buttonListener();
  }

  private buttonListener() {
    this.button?.addEventListener('click', () => {
      this.toggleSound();
      this.toggleButtonClass();
    });
  }

  private toggleSound() {
    if (this.audio.paused) {
      this.audio.play();
      this.appData.soundState = true;
    } else {
      this.audio.pause();
      this.appData.soundState = false;
    }
  }

  toggleButtonClass() {
    this.button?.classList.toggle('active');
  }
}
