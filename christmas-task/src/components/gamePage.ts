import { AppDataInt } from '../appData/appdata';
import { BgAppearance, BgAppearanceInt } from './bgAppearance';
import { CompletedAppearanceInt, CompmletedAppearance } from './completedAppearance';
import { Section, SectionInt } from './section';
import { StageAppearance, StageAppearanceInt } from './stageAppearance';
import { ToysAppearance, ToysAppearanceInt } from './toyInGameAppearance';
import { TreesAppearance, TreesAppearanceInt } from './treesAppearance';

export interface GamePageInt extends SectionInt {
  create(): HTMLElement;
}

export default class GamePage extends Section {
  appData: AppDataInt;

  toysAppearance: ToysAppearanceInt;

  treesAppearance: TreesAppearanceInt;

  bgAppearance: BgAppearanceInt;

  completedApearance: CompletedAppearanceInt;

  stageAppearance: StageAppearanceInt;

  constructor(gamePage: string, appData: AppDataInt) {
    super(gamePage);
    this.appData = appData;
    this.treesAppearance = new TreesAppearance(this.section, this.appData);
    this.toysAppearance = new ToysAppearance(this.section, this.appData);
    this.bgAppearance = new BgAppearance(this.section, this.appData);
    this.completedApearance = new CompmletedAppearance(this.section, this.appData);
    this.stageAppearance = new StageAppearance(this.section, this.appData);
  }

  create() {
    this.init();
    return this.section;
  }

  private init() {
    this.treesAppearance.init();
    this.bgAppearance.init();
    this.completedApearance.init();
    this.stageAppearance.init();
    this.toysAppearance.init();
  }
}
