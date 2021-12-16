import noUiSlider from 'nouislider';

export class Slider {
  min: number;
  max: number;
  sliderType: string;
  element: HTMLElement;
  step: number;

  constructor(min: number, max: number, sliderType: string, element: HTMLElement, step: number) {
    this.min = min;
    this.max = max;
    this.sliderType = sliderType;
    this.element = element;
    this.step = step
  }

  render() {
    const stepSlider = this.element;
    noUiSlider.create(stepSlider!, {
      start: [this.min, this.max],
      step: this.step,
      range: {
        'min': this.min,
        'max': this.max,
      }
    });
  }
}