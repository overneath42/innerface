import * as utils from './if.utils';
import validateFormFixture from '../fixtures/markup/validate_form.html';

describe('decodeString', () => {
  test('can decode a string into component parts', () => {
    const testString = 'test[string][is][long]';
    const decodedString = utils.decodeString(testString);

    expect(decodedString[0]).toBe('test');
    expect(decodedString[1]).toBe('string');
    expect(decodedString[2]).toBe('is');
    expect(decodedString[3]).toBe('long');
  });
});

describe('isNumber', () => {
  test('can parse a number or potential number', () => {
    const tests = {
      true: [
        utils.isNumber(3),
        utils.isNumber('3')
      ],
      false: [
        utils.isNumber('a'),
        utils.isNumber('three')
      ]
    }

    expect(tests.true.every(test => test === true)).toBe(true);
    expect(tests.false.every(test => test === false)).toBe(true);
  });
});

describe('findParentTag', () => {
  test('can find the correct parent tag', () => {

  });

  test('will return undefined if the parent tag is not found', () => {

  });
});