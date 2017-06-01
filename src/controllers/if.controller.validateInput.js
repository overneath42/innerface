/* @flow */

/**
 * @file The controller for the `validateInput` module.
 *
 * @author Justin Toon
 * @license MIT
 *
 * @requires ../config/if.controller.js:controller
 * @requires ../modules/if.module.validateInput.js:validateInput
 */

import Controller from '../config/if.controller';
import { validateInput as validateInputModule } from '../modules';

/**
 * The initialization function for creating the `validateForm` {@link Controller}.
 *
 * @returns {Controller}
 */
export default function validateInput() {
  /**
   * The name of the controller.
   *
   * @const
   * @type {string}
   */
  const name = 'validateInput';

  /**
   * Selector strings for the `validateInput` {@link Controller}.
   *
   * @const
   * @type {Object}
   */
  const targets: NodeListObject = Controller.getTargets(name);

  /**
   * Events created for the `validateInput` {@link Controller}.
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
