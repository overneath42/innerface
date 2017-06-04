import faker from 'faker';
import _ from 'lodash';

export default function validateFormFixture() {
  return `
    <form data-if-validate-form>
      <input type="text" value="${faker.random.words(5)}" required>
      <input type="number" required>
      <select>
        ${_.times(_.random(1, 5), index => {
          return `<option value="${index}">${faker.random.word()}</option>`;
        })}
      </select>
      <input type="hidden" data-if-validate-form-status>
    </form>
  `;
}
