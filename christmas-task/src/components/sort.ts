import { SettingsTypeClassInt } from "../utils/settings";

export interface SortFilterInt {
  settings: SettingsTypeClassInt;
  reset():void;
  init(): void;
}

export class SortFilter {
  settings: SettingsTypeClassInt;

  constructor(settings: SettingsTypeClassInt) {
    this.settings = settings;
  }

  reset() {
    this.settings.reset();
  }

  init() {
    document.querySelector('.reset')?.addEventListener('click', () => {
      this.reset();
    })
  }
}
