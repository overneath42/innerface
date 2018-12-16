import { random } from 'faker';

export default function detectScrollFixture() {
  return `
    <div id="shouldNotScroll" data-if-detect-scroll style="height: 200px">${random.words(15)}</div>
    <div id="shouldSCroll" data-if-detect-scroll style="height: 200px">${random.words(1000)}</div>
  `;
}
