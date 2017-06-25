/**
 * @file The primary entry for Innerface.
 *
 * @author Justin Toon
 * @license MIT
 */

import * as _ from 'lodash';

import { selectors } from './if.const';
import * as controllers from './controllers';

/**
 * A system of simple UI actions implemented with an HTML API.
 *
 * @since 0.1.0
 */
export default class Innerface {
  /**
   * Initialize the library.
   */
  public static init() {
    _.forEach(controllers, (controller, index) => {
      controller().initialize();
    });
  }
 }
