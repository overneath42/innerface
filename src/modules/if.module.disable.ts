/**
 * @file The `disable` module.
 *
 * @author Justin Toon
 * @version 0.1.0
 * @license MIT
 */

import { filter, forEach, includes, isEmpty } from 'lodash-es';
import { STATES } from '../if.const';

/**
 * A module for setting and managing a disabled state on an element.
 *
 * @since 0.1.0
 */
export default function disable(
  targets: NodeListOf<HTMLInputElement>,
  conditions: NodeListOf<HTMLInputElement>
): {
  init(): void;
} {
  /**
   * Determine whether or not the element should be considered disabled.
   *
   * @protected
   */
  function shouldBeDisabled(condition: HTMLInputElement): boolean {
    const conditionValue: string[] = condition.dataset.ifDisableCondition
      .toString()
      .split('|');

    if (condition.type === 'checkbox') {
      const isChecked = condition.checked;

      return conditionValue[1] && conditionValue[1].startsWith('!')
        ? !isChecked
        : isChecked;
    } else {
      if (conditionValue[1]) {
        switch (conditionValue[1]) {
          case 'length':
            return !isEmpty(condition.value);
          case 'includes':
            if (conditionValue[2]) {
              const input: HTMLInputElement = document.querySelector(
                conditionValue[2]
              ) as HTMLInputElement;
              const testGroup: string[] = JSON.parse(
                input.value || ''
              ).map((val: string) => val.toString());

              return includes(testGroup, condition.value);
            } else {
              return false;
            }
          default:
            return condition.value.toString() === conditionValue[1];
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
   */
  function getConditionField(target: HTMLInputElement): HTMLInputElement {
    return filter(
      conditions,
      (item, index) =>
        item.dataset.uiDisableCondition === target.dataset.uiCondition
    )[0];
  }

  /**
   * Sets a listener on a condition field to watch for changes.
   *
   * @protected
   */
  function setListener(
    target: HTMLInputElement,
    condition: HTMLInputElement
  ): void {
    condition.addEventListener('change', event => {
      setState(target, shouldBeDisabled(condition));
    });
  }

  /**
   *
   * Set a disabled state on a target.
   */
  function setState(target: HTMLInputElement, isDisabled: boolean) {
    target.disabled = isDisabled === true;
    target.classList.toggle(STATES.isDisabled, isDisabled === true);
  }

  /**
   * Initialize the module for a set of targets.
   */
  function init() {
    forEach(targets, (target, index) => {
      const id: string = target.dataset.ifDisable.toString();

      const condition: HTMLInputElement = getConditionField(target);

      setState(target, shouldBeDisabled(condition));
      setListener(target, condition);
    });
  }

  return { init };
}
