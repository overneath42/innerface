/**
 * @file The `validateInput` module.
 *
 * @author Justin Toon
 * @version 0.1.0
 *
 * @requires ../if.utils.js:isNumber
 * @requires ../if.utils.js:decodeString
 */

import { isNumber, decodeString } from '../if.utils';

/**
 * A module for validating form fields based on one or more rules.
 *
 * @module innerface/validateInput
 * @since 0.1.0
 */

/**
 * Validate a form field.
 *
 * @since 0.1.0
 *
 * @param {string} value - The value to validate.
 * @param {string} rules - A pipe-separated list of one or more rules.
 *
 * @returns {boolean} - `true` if the value is valid
 */
export default function validateInputModule(
  value: string,
  rules: string
): boolean {
  /**
   * Validation functions.
   *
   * @constant
   * @type {Object}
   */
  const RULES: MethodObject = {
    integer: (value: number | string) => {
      return isNumber(value) && Number.isInteger(Number(value));
    },
    greaterThan: (limit: number, value: number | string) => {
      return isNumber(value) && Number(value) > limit;
    },
    greaterThanOrEqualTo: (limit: number, value: number | string) => {
      return isNumber(value) && Number(value) >= limit;
    },
    lessThan: (limit: number, value: number | string) => {
      return isNumber(value) && Number(value) < limit;
    },
    lessThanOrEqualTo: (limit: number, value: number | string) => {
      return isNumber(value) && Number(value) <= limit;
    }
  };

  return prepareValidation(rules).reduce((isValid: boolean, params: Array<string | number>) => {
    if (!isValid) return false;

    const ruleToExecute: string = params.shift().toString();

    return RULES[ruleToExecute](...params);
  }, true);

  /**
   * Prepares the validation rules.
   *
   * @protected
   * @param {string} rules The provided validation rules in string format.
   *
   * @returns {(string|number)[]}
   */
  function prepareValidation(rules): (string | number)[][] {
    return rules.split('|').map((rule: string): (string | number)[] => {
      return [].concat(
        decodeString(rule).map(part => (isNumber(part) ? Number(part) : part)),
        [value]
      );
    });
  }
}
