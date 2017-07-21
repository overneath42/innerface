import { Global } from '../../typings.d';

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
import disableModule from '../modules/if.module.disable';

/**
 * The initialization function for creating the `disable` {@link Controller}.
 *
 * @returns {Controller}
 */
export default function disable(): Controller {
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
  const targets: Global.NodeListObject = Controller.getTargets(name);

  /**
   * Events created for the `disable` {@link Controller}.
   *
   * @const
   * @type {Object}
   */
  const events: Global.MethodObject = {
    initOnLoad: () => {
      window.onload = () => {
        const { target, condition } = targets;
        disableModule(target, condition).init();
      };
    }
  };

  return new Controller({ name, targets, events });
}
