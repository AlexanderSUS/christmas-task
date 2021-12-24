export interface SectionInt {
  section: HTMLElement;
}

export class Section {
  section: HTMLElement;

  constructor(content: string) {
    this.section = document.createElement('section');
    this.section.innerHTML = content;
  }
}
