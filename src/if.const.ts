// @flow

/**
 * Key-ordered selector strings of important
  * DOM elements.
  *
  * @constant
  * @type {object}
  */
export const selectors: ConfigObject = {
  validateInput: {
    target: '[data-if-validate-input]'
  },
  validateForm: {
    form: '[data-if-validate-form]',
    fields: '[data-if-validate-form] :input:not([data-ui-validate-form-status])',
    status: '[data-if-validate-form-status]'
  }
};
