export default function controllerFixture(targets?: Object): Object {
  return {
    name: 'testController',
    targets: targets || {
      testDiv: 'div',
      testP: 'p',
      testForm: 'form',
      testInput: 'input',
      dataSelector: '[data-test-selector]'
    }
  };
}
