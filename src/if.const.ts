import { Global } from '../typings.d';

/**
 * Key-ordered selector strings of important DOM elements.
 *
 * @constant
 * @type {object}
 */
export const SELECTORS: Global.ConfigObject = {
  disable: {
    target: '[data-if-disable]',
    condition: '[data-if-disable-condition]'
  },
  setAttr: {
    target: '[data-if-set-attr]'
  },
  setContent: {
    target: '[data-if-set-content]'
  },
  validateInput: {
    target: '[data-if-validate-input]'
  },
  validateForm: {
    target: '[data-if-validate-form]'
  }
};

/**
 * A manifest of global states, translated to markup classes.
 *
 * @constant
 * @type {object}
 * @export
 */
export const STATES: { [key: string]: string } = {
  isActive: 'is-active',
  isVisible: 'is-visible',
  isEditable: 'is-editable',
  isBeingEdited: 'is-being-edited',
  isHidden: 'is-hidden',
  isDisabled: 'is-disabled',
  isHovered: 'is-hovered'
};
