/**
 * @file The controller for the `disable` module.
 *
 * @author Justin Toon
 * @license MIT
 *
 * @requires ../config/if.controller.js:controller
 * @requires ../modules/if.module.disable.js:disable
 */

import Controller from '../config/if.controller';
import { disable as disableModule } from '../modules';

/**
 * The initialization function for creating the `disable` {@link Controller}.
 *
 * @returns {Controller}
 */
export default function disable() {
  /**
   * The name of the controller.
   *
   * @const
   * @type {string}
   */
  const name = 'disable';

  /**
   * Selector strings for the `disable` {@link Controller}.
   *
   * @const
   * @type {Object}
   */
  const targets: NodeListObject = Controller.getTargets(name);

  /**
   * Events created for the `disable` {@link Controller}.
   *
   * @const
   * @type {Object}
   */
  const events: MethodObject = {};

  return new Controller({
    name,
    targets,
    events
  });
}
