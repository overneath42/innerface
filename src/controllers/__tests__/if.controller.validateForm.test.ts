import validateForm from '../if.controller.validateForm';
import validateFormFixture from '../../../fixtures/markup/validate_form.html';
// import { validateForm as validateFormModule } from '../modules';

describe('validateForm Controller', () => {
  const testController = validateForm();

  beforeEach(() => {
    document.body.innerHTML = validateFormFixture();
  });

  test('should initialize properly', () => {
    expect(testController.name).toBe('validateForm');
  });
});
