/**
 * @file The primary entry for Innerface.
 *
 * @author Justin Toon
 * @license MIT
 */

import {forEach} from 'lodash-es';

import {SELECTORS} from './if.const';
import * as controllers from './controllers';

/**
 * A system of simple UI actions implemented with an HTML API.
 *
 * @since 0.1.0
 */
class Innerface {
  /**
   * Initialize the library.
   */
  public static init() {
    forEach(controllers, (controller : () => Innerface.Controller, key : string) => {
      controller().initialize();
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  Innerface.init();
});