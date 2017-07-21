import { Global } from '../../typings.d';

/**
 * @file The controller for the `validateInput` module.
 *
 * @author Justin Toon
 * @license MIT
 *
 * @requires NPM:lodash-es
 * @requires ../config/if.controller.js:controller
 * @requires ../modules/if.module.validateInput.js:validateInput
 */

import { forEach } from 'lodash-es';

import Controller from '../config/if.controller';
import { addEventListeners } from '../if.utils';
import validateInputModule from '../modules/if.module.validateInput';

/**
 * The initialization function for creating the `validateForm` {@link Controller}.
 *
 * @returns {Controller}
 */
export default function validateInput(): Controller {
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
  const targets: Global.NodeListObject = Controller.getTargets(name);

  /**
   * Events created for the `validateInput` {@link Controller}.
   *
   * @const
   * @type {Object}
   */
  const events: Global.MethodObject = {
    validateInputChange: function eventsValidateInputChange() {
      forEach(targets.target, (target: HTMLInputElement, index: number) => {
        addEventListeners(target, 'focusin keydown', event => {
          const input = event.target as HTMLInputElement;

          input.dataset.previousValue = input.value;
        });

        addEventListeners(target, 'change keyup', event => {
          const input = event.target as HTMLInputElement;

          validateInputModule(input).check();
        });
      });
    }
  };

  return new Controller({ name, targets, events });
}
