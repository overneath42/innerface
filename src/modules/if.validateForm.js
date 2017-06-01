/* @flow */

/**
 * @fileOverview The `validateForm` module.
 *
 * @author Justin Toon
 * @since 0.1.0
 *
 * @requires NPM:lodash
 */

import _ from 'lodash';

/**
 * A module for validating a form for completeness and optionally
 * setting a hidden field with the validation status.
 *
 * @module innerface/validateForm
 * @export
 */

/**
 * Validate a form.
 *
 * @since 0.1.0
 *
 * @param {HTMLFormElement} form The form to validate.
 * @param {HTMLInputElement} [statusField] An optional field to set a value on.
 *
 * @returns {boolean}
 */
export default function validateForm(form: HTMLFormElement, statusField: ?HTMLInputElement) {
  const fields = [...form.querySelectorAll('input, select, textarea')].filter((field: HTMLElement) => {
    return field.required && field.required === true;
  });

  const formIsValid = fields.reduce((isValid, field) => {
    if (!isValid) return false; // if already found to be invalid, leave it that way
    return !_.isEmpty(field.value && field.value);
  }, true);

  if (statusField) {
    statusField.value = formIsValid.toString();
  }

  return formIsValid;
}
