import Controller from './if.controller';
import controllerFixture from '../../fixtures/objects/if.controller.fixture';
import controllerTestFixture from '../../fixtures/markup/controller_test.html';

describe('Controller', () => {
  const testProps = controllerFixture();
  const testFixture = controllerTestFixture();
  const controller = new Controller(testProps);

  describe('getTargets', () => {
    beforeEach(() => {
      document.body.innerHTML = controllerTestFixture();
    });

    test('loads fixtures properly', () => {
      expect(testProps.name).toBe('testController');
      expect(document.querySelectorAll('div').length).toBe(3);
      expect(document.querySelectorAll('p').length).toBe(2);
    });

    test('is properly created', () => {
      expect(controller.name).toBe(testProps.name);
      expect(controller.targets).toBe(testProps.targets);
    });

    test('can convert all selector strings to element selections', () => {
      const targets = Controller.getTargets(testProps.name, testProps.targets);

      expect(targets.testDiv.length).toBe(3);
      expect(targets.testP.length).toBe(2);
      expect(targets.testForm.length).toBe(1);
      expect(targets.testInput.length).toBe(1);
      expect(targets.dataSelector.length).toBe(1);
    });
  });
});
