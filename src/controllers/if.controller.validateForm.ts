import { Global } from '../../typings.d';

/**
 * @file The controller for the `validateForm` module.
 *
 * @author Justin Toon
 * @license MIT
 *
 * @requires NPM:lodash-es
 * @requires ../config/if.controller.js:controller
 * @requires ../modules/if.module.validateInput.js:validateInputModule
 * @requires ../if.utils.js:findParentTag
 */

import { forEach } from 'lodash-es';
import Controller from '../config/if.controller';
import validateFormModule from '../modules/if.module.validateForm';

/**
 * The initialization function for creating the `validateForm` {@link Controller}.
 *
 * @since 0.2.0
 *
 * @returns {Controller}
 */
export default function validateForm(): Controller {
  /**
   * The name of the controller.
   *
   * @const
   * @type {string}
   */
  const name = 'validateForm';

  /**
   * Selector strings for the `validateForm` {@link Controller}.
   *
   * @const
   * @type {Object}
   */
  const targets: Global.NodeListObject = Controller.getTargets(name);

  /**
   * Events created for the `validateForm` {@link Controller}.
   *
   *
   * @const
   * @type {Object}
   */
  const events: Global.MethodObject = {
    formChange: function eventFormChange() {
      forEach(targets.target, (form: HTMLFormElement) => {
        const checkForm = validateFormModule(form).check;
        const inputs = form.querySelectorAll(
          'input, textarea, select'
        ) as NodeListOf<Global.FormField>;

        forEach(inputs, (field: Global.FormField) => {
          field.addEventListener('change', checkForm);
        });

        window.addEventListener('load', checkForm);
      });
    }
  };

  return new Controller({ name, targets, events });
}
