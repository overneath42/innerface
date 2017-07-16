import * as faker from 'faker';
import {random, times} from 'lodash-es';

export default function validateFormFixture() {
  return `
    <form data-if-validate-form>
      <input type="text" value="${faker.random.words(5)}" required>
      <input type="number" required>
      <select>
        ${times(random(1, 5), index => {
          return `<option value="${index}">${faker.random.word()}</option>`;
        })}
      </select>
      <input type="hidden" data-if-validate-form-status>
    </form>
  `;
}
