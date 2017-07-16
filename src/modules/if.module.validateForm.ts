type FormField = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

/**
 * @fileOverview The `validateForm` module.
 *
 * @author Justin Toon
 * @since 0.1.0
 *
 * @requires NPM:lodash
 */

import {isEmpty} from 'lodash-es';

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
export default function validateForm(statusField?: HTMLInputElement) : boolean {
  const fields = [...this.querySelectorAll('input, select, textarea')].filter((field : FormField) => {
    return field.required && field.required === true;
  });

  const formIsValid: boolean = fields.reduce((isValid : boolean, field : FormField) => {
    if (!isValid)
      return false; // if already found to be invalid, leave it that way
    return !isEmpty(field.value && field.value);
  }, true);

  if (statusField) {
    statusField.value = formIsValid.toString();
  }

  return formIsValid;
}
