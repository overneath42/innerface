/**
 * @file The controller for the `canScroll` module.
 *
 * @author Justin Toon
 * @license MIT
 *
 * @version 0.4.0
 */

import { STATES } from '../if.const';
import { forEach, capitalize } from 'lodash-es';

/**
 * A module for detecting whether or not an element will scroll,
 * and applying a specific class when applicable.
 *
 * @since 0.4.0
 */
export default function detectScroll(targets: HTMLElement[], controllerName: string) {
  forEach(targets, target => {
    target.classList.toggle(className(target), canScroll(target));
  });

  /**
   * Determine the correct class name to toggle against the element.
   *
   * @protected
   */
  function className(element: HTMLElement) {
    return element.dataset[`if${capitalize(controllerName)}`] || STATES.isScrollable;
  }

  /**
   * Determine whether or not an element can scroll.
   *
   * @protected
   */
  function canScroll(element: HTMLElement) {
    if (!element) return false;

    return element.scrollHeight > element.clientHeight;
  }
}
