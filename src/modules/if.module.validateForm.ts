import { Global } from '../../typings.d';

/**
 * @fileOverview The `validateForm` module.
 *
 * @author Justin Toon
 * @since 0.1.0
 *
 * @requires NPM:lodash
 */

import { filter, forEach, isEmpty } from 'lodash-es';

/**
 * A module for validating a form for completeness and optionally
 * setting a hidden field with the validation status.
 */

/**
 * Validate a form.
 *
 * @since 0.1.0
 *
 * @param {HTMLInputElement} [statusField] An optional field to set a value on.
 */
export default function validateForm(form?: HTMLFormElement) {
  /**
   * Get all possible controls for submitting a form.
   *
   * @param {HTMLFormElement} form The form to query.
   *
   * @returns {(HTMLElement)[]}
   */
  function getSubmitElements(): (HTMLInputElement | HTMLButtonElement)[] {
    return [].slice.call(
      form.querySelectorAll('input[type="submit"], button[type="submit"]')
    );
  }

  /**
   * Get all required fields within the current form.
   *
   * @param {HTMLFormElement} form The form to query.
   *
   * @return {HTMLElement[]} Returns an array of elements.
   */
  function getFields(form: HTMLFormElement): Global.FormField[] {
    if (form) {
      const fields = form.querySelectorAll('input, select, textarea') as NodeListOf<Global.FormField>;

      return filter(fields, field => field.required && field.required === true);
    }
  }

  /**
   * Determines if the form is valid.
   *
   * @param {(HTMLInputElement|HTMLSelectElement|HTMLTextareaElement)[]} fields
   *
   * @returns {boolean} Returns `true` if the form is valid.
   */
  function formIsValid(fields: Global.FormField[]): boolean {
    return fields.reduce((isValid: boolean, field: Global.FormField) => {
      if (!isValid) return false; // if already found to be invalid, leave it that way
      return !isEmpty(field.value && field.value);
    }, true);
  }

  /**
   * Check the form.
   */
  function check() {
    if (form) {
      const fields = getFields(form);
      const isValid = formIsValid(fields);
      getSubmitElements().forEach(submit => {
        submit.disabled = !isValid;
      });
    }
  }

  return { check };
}
