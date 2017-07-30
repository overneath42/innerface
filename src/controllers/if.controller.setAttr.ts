import { Global } from '../../typings.d';

/**
 * @file The controller for the `setAttr` module.
 *
 * @author Justin Toon
 * @license MIT
 *
 * @version 0.2.0
 *
 * @requires NPM:lodash-es
 * @requires NPM:inflection
 * @requires ../config/if.controller.js:controller
 * @requires ../if.utils.js:createDataFieldSelector
 */

import { includes, isArray, last } from 'lodash-es';

import Controller from '../config/if.controller';
import setAttrModule from '../modules/if.module.setAttr';

/**
 * The initialization function for creating the `setAttr` {@link Controller}.
 *
 * @since 0.2.0
 * @returns {Controller}
 */
export default function setAttr(): Controller {
  /**
   * The name of the controller.
   *
   * @const
   * @type {string}
   */
  const name = 'setAttr';

  /**
   * Selector strings for the `validateForm` {@link Controller}.
   *
   * @const
   * @type {Object}
   */
  const targets: Global.NodeListObject<HTMLElement> = Controller.getTargets(name);

  /**
   * Events created for the `validateForm` {@link Controller}.
   *
   * @const
   * @type {Object}
   */
  const events: Global.MethodObject = {
    changeOrClick: function eventsSetAttrChangeOrClick() {
      [].slice.call(targets.target).forEach(target => {
        target.addEventListener('change', beginInit);
        target.addEventListener('click', beginInit);
      });

      /**
       * Callback from event listeners in `eventsSetAttrChangeOrClick`.
       *
       * @callback
       * @protected
       * @param {Event} event The event data.
       */
      function beginInit(event: Event & { target: HTMLInputElement }) {
        setAttrModule<HTMLInputElement>(event.target, targets.output).init();
      }
    }
  };

  return new Controller({ name, targets, events });
}
