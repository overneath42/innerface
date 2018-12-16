import { Global } from '../typings.d';

/**
 * Key-ordered selector strings of important DOM elements.
 *
 * @constant
 * @type {object}
 */
export const SELECTORS: Global.ConfigObject<{}> = {
  detectScroll: {
    target: '[data-if-detect-scroll]'
  },
  disable: {
    target: '[data-if-disable]',
    condition: '[data-if-disable-condition]'
  },
  setAttr: {
    target: '[data-if-set-attr]',
    output: '[data-if-set-attr-output]'
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
export const STATES: Global.ConfigObject<string> = {
  isActive: 'is-active',
  isBeingEdited: 'is-being-edited',
  isDisabled: 'is-disabled',
  isEditable: 'is-editable',
  isHidden: 'is-hidden',
  isHovered: 'is-hovered',
  isScrollable: 'is-scrollable',
  isVisible: 'is-visible'
};
