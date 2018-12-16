import { Global } from '../../typings';

/**
 * @file The controller for the `detectScroll` module.
 *
 * @author Justin Toon
 * @license MIT
 */

import { throttle } from 'lodash-es';

import Controller from '../config/if.controller';
import detectScrollModule from '../modules/if.module.detectScroll';

/**
 * The initialization function for creating the `detectS` {@link Controller}.
 */
export default function detectScroll(): Controller {
  /**
   * The name of the controller.
   *
   * @const
   */
  const name = 'detectScroll';

  /**
   * Targets for the `detectS` {@link Controller}.
   *
   * @const
   * @type {Object}
   */
  const targets: Global.NodeListObject<HTMLElement> = Controller.getTargets(name);

  /**
   * Events created for the `detectS` {@link Controller}.
   *
   * @const
   * @type {Object}
   */
  const events: Global.MethodObject = {
    detectSWindowResize: () => {
      window.addEventListener('resize', throttle(handleResize, 200));

      function handleResize() {
        detectScrollModule(Array.from(targets.target), name);
      }
    }
  };

  return new Controller({ name, targets, events });
}
