import { AppDataInt } from '../appData/appdata';
import { Lights, LightsInt } from './lights';
import { LightsSwitch, LightsSwitchInt } from './ligthtsSwitch';

export interface LightsAppeatanceInt {
  init(): void;
}

export class LightsAppeatance implements LightsAppeatanceInt {
  parent: HTMLElement;

  appDate: AppDataInt;

  lights: LightsInt;

  lightsSwitch: LightsSwitchInt;

  constructor(parent: HTMLElement, appData: AppDataInt) {
    this.parent = parent;
    this.appDate = appData;
    this.lights = new Lights(this.parent, this.appDate);
    this.lightsSwitch = new LightsSwitch(this.parent, this.appDate);
  }

  init() {
    this.lights.init();
    this.lightsSwitch.init();
  }
}
