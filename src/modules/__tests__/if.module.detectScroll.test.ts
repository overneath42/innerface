import { random } from 'faker';

import detectScrollFixture from '../../../fixtures/detect_scroll.html';
import detectScroll from '../if.module.detectScroll';

describe('detectScroll', () => {
  let wrapper: HTMLElement = document.createElement('div');
  let elements: HTMLElement[] = [];

  beforeEach(() => {
    wrapper.innerHTML = detectScrollFixture();
    elements = Array.from(wrapper.querySelectorAll('div'));
  });

  it('properly identifies and tags scrollable elements', () => {
    detectScroll(elements, 'ifDetectScroll');


  });
});
