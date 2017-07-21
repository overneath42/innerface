/**
 * @file Utility methods for the Innerface framework.
 *
 * @author Justin Toon
 * @version 0.1.0
 *
 * @requires NPM:inflection
 */

import * as inflection from 'inflection';

/**
 * Evaluates a string and breaks it into component parts,
 * identifying individual words and ignoring divider characters.
 *
 * @param {string} str The string to decode.
 *
 * @returns {array} An array of strings extracted from the original string.
 */
export function decodeString(name: string): string[] {
  const regex = /(\w+)/g;
  let params: string[] = [];
  let match;

  // loop through all RegEx matches and push results to an array
  while ((match = regex.exec(name))) {
    params.push(match[1]);
  }

  return params;
}

/**
 * Determine if value is a number, or is a string which will parse as a number
 *
 * @param  {(string|number)} value The value to check.
 *
 * @return {Boolean}
 */
export function isNumber(value: string | number): boolean {
  return !isNaN(typeof value === 'number' ? value : parseInt(value, 10));
  // NOTE: here is an alternate version to review more closely credit to
  // `therealbenwiley` return (value && !isNaN(value)) || value === 0;
}

/**
 * Recursively search all parentNodes of given Node until the requested
 * tag name is found, then returns the Node. Returns the original if
 * no parent is found.
 *
 * @param {HTMLElement} element The starting element.
 * @param {string} tag The tag name to locate.
 *
 * @returns {HTMLElement}
 */
export function findParentTag<I extends HTMLElement, O extends HTMLElement>(
  node: I,
  tag: string
): O | void {
  if (node.parentNode) {
    while (node.parentNode) {
      node = node.parentNode as I;

      if (node.tagName && node.tagName === tag.toLowerCase()) {
        return node;
      }
    }
  }

  // the requested tag is not a parent of the original Node
  return undefined;
}

/**
 * Generate a selector string to locate a hidden field for
 * a React component to access. Accepts an attribute value in camelCase
 * or snake-case and transforms appropriately. If the value starts with `^`,
 * the selector will be tailored to look for all elements with the given
 * data attribute and a value which starts with the provided selector string.
 *
 * @example
 * // returns '[data-react-output="testSelectorString"]'
 * createDataFieldSelector('testSelectorString');
 *
 * @example
 * // returns '[data-ui-verify-target="testSelectorString"]`
 * createDataFieldSelector('testSelectorString', 'dataUiVerifyTarget');
 *
 * @example
 * // returns '[data-ui-verify-target^="testSelectorString"]`
 * createDataFieldSelector('^testSelectorString', 'dataUiVerifyTarget');
 *
 * @export
 * @param {string} selectorString  - The string to transform.
 * @param {string} dataAttr  - The data attribute to apply.
 *
 * @return {string} - The formatted selector string.
 */
export function createDataFieldSelector(
  selectorString: string,
  dataAttr: string
): string {
  let operator = '=';

  if (dataAttr.indexOf('-') === -1) {
    dataAttr = inflection.transform(dataAttr, ['underscore', 'dasherize']);
  }

  if (selectorString.startsWith('^')) {
    operator = `${selectorString.slice(0, 1)}${operator}`;
    selectorString = selectorString.slice(1);
  }

  return `[${dataAttr}${operator}"${selectorString}"]`;
}

/**
 * Attach multiple event listeners using the same callback.
 *
 * @param {*} el The element to attach to.
 * @param {string} str A space-separated list of events.
 * @param {Function} fn The callback function.
 */
export function addEventListeners<T extends HTMLElement>(
  el: T,
  str: string,
  fn: (event: Event) => any
) {
  str.split(' ').forEach(e => el.addEventListener(e, fn, false));
}
