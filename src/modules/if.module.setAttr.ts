import { Global } from '../../typings.d';

/**
 * @file The `setAttr` module.
 *
 * @author Justin Toon
 * @version 0.1.0
 * @license MIT
 */
import {
  filter,
  find,
  forEach,
  includes,
  isArray,
  isEmpty,
  last
} from 'lodash-es';
import * as inflection from 'inflection';

import { STATES } from '../if.const';
import { createDataFieldSelector, decodeString } from '../if.utils';

/**
 * The `setAttr` module.
 */
export default function setAttr<T extends HTMLElement>(
  source: T,
  targets: NodeListOf<HTMLElement>
): {
  init: () => void;
} {
  function getValue(element: HTMLElement, key?: string): string {
    if (element.tagName === 'SELECT') {
      const options = element.querySelectorAll('option') as NodeListOf<
        HTMLOptionElement
      >;
      const option = find(
        options,
        option => option.selected && option.selected === true
      );

      return option.label || option.title || option.innerText;
    } else if (element.tagName === 'INPUT') {
      const inputElement = element as HTMLInputElement;
      return inputElement.value;
    } else {
      return null;
    }
  }

  /**
   * Prepare and return the final value.
   *
   * @protected
   * @param {HTMLElement} element The element to inspect and evaluate.
   * @param {string} value The value provided to set.
   * @param {string} attr The attribute to set.
   *
   * @returns {string}
   */
  function prepareValue(
    element: HTMLElement,
    value: string,
    attr: string
  ): string {
    let currentValue;

    if (attr === 'class') {
      const currentClassList = [].forEach.call(element.classList).split(' ');

      // if the provided value starts with `!`, always remove it
      if (value.startsWith('!')) {
        value = value.slice(1);
        return currentClassList.filter(c => c !== value).join(' ');
      } else {
        // when setting a class, we want to dedupe the class list — insert it if not
        // present, or remove it without affecting the other items.
        const newClassList = includes(currentClassList, value)
          ? currentClassList.filter(v => v !== value)
          : currentClassList.concat([value]);

        return newClassList.join(' ');
      }
    }

    // if all the other conditions fail, just return the value with no
    // transformation.
    return value;
  }

  /**
   * Identify the target element and value to write, and then write it.
   *
   * @param attrs {string[]} The attribute name as an array of strings.
   * @param index {number} The current iteration index.
   */
  function writeAttr(attrs: string[], index: number) {
    const target = attrs.shift(); // the first value in the array is the target name
    const targetElement = document.querySelector(
      createDataFieldSelector(target, 'ifSetAttrOutput')
    ) as HTMLElement;

    attrs.forEach(prop => {
      const attrArray = inflection
        .transform(prop, ['underscore', 'dasherize'])
        .split('-');
      const key: string | undefined =
        attrArray.length > 1 ? last(attrArray) : undefined;
      const attr: string = attrArray.join('');
      let value: string;

      if (source.dataset.ifSetAttrValue) {
        if (isArray(source.dataset.ifSetAttrValue)) {
          value = source.dataset.ifSetAttrValue[index];
        } else {
          value = source.dataset.ifSetAttrValue;
        }
      } else {
        value = getValue(source, key);
      }

      if (['value', 'class'].some(a => a === attr)) {
        value = prepareValue(targetElement, value, attr);
      }

      targetElement.setAttribute(attr, value);
    });
  }

  /**
   * Initialize the module.
   */
  function init() {
    let params: string[][];

    if (source.dataset.ifSetAttr) {
      // split the attribute value for each item
      params = source.dataset.ifSetAttr
        .split(',')
        .map((param): string[] => param.split('|'));

      if (params) {
        params.forEach(writeAttr);
      }
    }
  }

  return { init };
}
