/**
 * @file The controller for the `validateForm` module.
 *
 * @author Justin Toon
 * @license MIT
 *
 * @requires ../config/if.controller.js:controller
 * @requires ../modules/if.module.validateInput.js:validateInputModule
 * @requires ../if.utils.js:findParentTag
 */

import Controller from '../config/if.controller';
import {validateForm as validateFormModule} from '../modules';
import {findParentTag} from '../if.utils';

/**
 * The initialization function for creating the `validateForm` {@link Controller}.
 *
 * @returns {Controller}
 */
export default function validateForm() : Controller {
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
  const targets: NodeListObject = Controller.getTargets(name);

  /**
   * Events created for the `validateForm` {@link Controller}.
   *
   * @const
   * @type {Object}
   */
  const events: MethodObject = {
    formChange: function eventFormChange() {
      let parentForm : HTMLElement | null;

      window.addEventListener('load', methods.init.bind(parentForm));

      []
        .forEach
        .call(targets.fields)
        .forEach((field : HTMLElement) => {
          // TODO: this _should_ cache the parent form lookup but need to verify
          parentForm = parentForm || findParentTag(field, 'form') || null;

          if (parentForm) {
            field.addEventListener('change', methods.init.bind(parentForm));
          }
        });
    }
  };

  /**
   * Methods used by the `validateForm` `Controller`.
   *
   * @module validateForm/methods
   */
  const methods: MethodObject = {
    /**
       * Initialize the form validation.
       *
       * @param {Event} event The event data from `eventFormChange`
       */
    init: function methodsValidateFormInit(event : Event) {
      const form : HTMLFormElement = this;

      if (form) {
        if (form.hasAttribute('novalidate')) {
          form.setAttribute('novalidate', '');
        }

        // const statusField : Node | undefined = targets
        //   .status
        //   .item(0);
      }
    }
  }

  return new Controller({name, targets, events});
}
