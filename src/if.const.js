/* flow */

/**
 * Key-ordered selector strings of important
  * DOM elements.
  *
  * @constant
  * @type {object}
  */
export const selectors: ConfigObject = {
  completeFormTargets: '[data-ui-complete-form]',
  disableTargets: '[data-ui-disable]',
  modal: '[data-modal]',
  modalOnLoadTargets: '[data-modal-on-load]',
  modalToggle: '[data-ui-modal-toggle]',
  setAttrTargets: '[data-ui-set-attr]',
  setContentTargets: '[data-ui-set-content]',
  toggleAllTargets: '[data-ui-toggle-all]',
  validateInputTargets: '[data-ui-validate]',
  validateFormTargets: '[data-ui-validate-form] :input:not([data-ui-validate-form-status])',
  validateFormParent: '[data-ui-validate-form]',
  validateFormStatus: '[data-ui-validate-form-status]',
  verifyTargets: '[data-ui-verify]',
  verifyConfirm: '[data-ui-verify-confirm]'
};
