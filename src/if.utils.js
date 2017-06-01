// @flow

/**
 * @file Utility methods for the Innerface framework.
 *
 * @author Justin Toon
 * @version 0.1.0
 */

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
  return !isNaN(parseInt(value, 10));
}

/**
 * Recursively search all parentNodes of given Node until the requested
 * tag name is found, then returns the Node
 *
 * @param {HTMLElement} element The starting element.
 * @param {string} tag The tag name to locate.
 *
 * @returns {HTMLElement}
 */
export function findParentTag(node: HTMLElement & Node, tag: string): HTMLElement {
  while (node.parentNode) {
    node = node.parentNode;

    if (node.tagName === tag) return node;
  }

  // the requested tag is not a parent of the original Node
  return null;
}
