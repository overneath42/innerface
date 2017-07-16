/**
 * @file The `disable` module.
 *
 * @author Justin Toon
 * @version 0.1.0
 * @license MIT
 */

/**
 * A module for setting and managing a disabled state on an element.
 *
 * @module innerface/disable
 * @since 0.1.0
 */

import {filter, forEach, includes, isEmpty} from 'lodash-es';
import {STATES} from '../if.const';

export default function disable(targets : NodeListOf < HTMLInputElement >, conditions : NodeListOf < HTMLInputElement >) : {
  init(): void
}
{
  /**
  * Determine whether or not the element should be considered disabled.
  *
  * @protected
  *
  * @return {boolean} - <code>true</code> if the field should be disabled.
  */
  function shouldBeDisabled(condition : HTMLInputElement) : boolean {
    if(condition.type === 'checkbox') {
      const checkboxCondition : string[] = condition
        .dataset
        .uiDisableCondition
        .toString()
        .split('|');

      const isChecked = condition.checked;

      return checkboxCondition[1].startsWith('!')
        ? !isChecked
        : isChecked;
    } else {
      const stringCondition : string[] = condition
        .dataset
        .uiDisableCondition
        .toString()
        .split('|');

      if (stringCondition[1]) {
        switch (stringCondition[1]) {
          case 'length':
            return !isEmpty(condition.value);
          case 'includes':
            if (stringCondition[2]) {
              const input = <HTMLInputElement>document.querySelector(stringCondition[2]);
              const testGroup : string[] = JSON
                .parse(input.value || '')
                .map((val : string) => val.toString());

              return includes(testGroup, condition.value)
            } else {
              return false;
            }
          default:
            return condition
              .value
              .toString() === stringCondition[1];
        }
      } else {
        return condition.value === 'true';
      }
    }
  }

  /**
   * Looks up related condition field for a disabled item.
   *
   * @protected
   * @param {HTMLElement} id The lookup string.
   *
   * @returns {HTMLElement}
   */
  function getConditionField(target : HTMLInputElement) : HTMLInputElement {
    return filter(conditions, (item, index) => item.dataset.uiDisableCondition === target.dataset.uiCondition)[0];
  }

  /**
     * Sets a listener on a condition field to watch for changes.
     *
     * @protected
     * @param {HTMLInputElement} target The element to affect.
     * @param {HTMLInputElement} condition The conditional field.
     *
     */
  function setListener(target : HTMLInputElement, condition : HTMLInputElement) : void {
    condition.addEventListener('change', event => {
      setState(target, shouldBeDisabled(condition));
    });
  }

  /**
     * Set a disabled state on a target.
     *
     * @param {HTMLInputElement} target The target to affect.Î
     * @param {boolean} isDisabled Whether or not to disable.
     */
  function setState(target : HTMLInputElement, isDisabled : boolean) {
    target.disabled = isDisabled === true;
    target
      .classList
      .toggle(STATES.isDisabled, isDisabled === true);
  };

  /**
     * Initialize the module for a set of targets.
     */
  function init() {
    forEach(targets, (target, index) => {
      const id : string = target
        .dataset
        .uiDisable
        .toString();

      const condition : HTMLInputElement = getConditionField(target);

      setState(target, shouldBeDisabled(condition));
      setListener(target, condition);
    });
  }

  return {init};
}
