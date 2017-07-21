import { Global, If } from '../../typings.d';

/**
 * @file The prototype object for `Controller`.
 *
 * @author Justin Toon
 * @license MIT
 *
 * @requires NPM:lodash
 * @requires '../if.const.js:selectors
 */

import { forEach } from 'lodash-es';
import { SELECTORS } from '../if.const';

/**
 * A generic prototype for creating a function
 * which will execute scripting.
 *
 * @since 0.1.0
 */
export default class Controller implements If.IController {
  public name: string;
  public targets: Global.NodeListObject;
  public events: Global.MethodObject;
  public methods: Global.MethodObject;

  constructor(props: If.IController) {
    this.name = props.name;
    this.targets = props.targets;
    this.events = props.events;
    this.methods = props.methods || {};
  }

  /**
   * Convert a named list of selector strings into NodeLists.
   *
   * @static
   * @param {string} name The lookup name to query for selectors.
   * @param {(string | ConfigObject)} [targets] Predefined targets.
   *
   * @returns {Object}
   */
  public static getTargets(
    name: string,
    targets?: string | Global.ConfigObject
  ): Global.NodeListObject {
    let selectedElements: Global.NodeListObject = {};

    if (!targets) {
      targets = SELECTORS[name];
    }

    if (targets) {
      forEach(targets, (target: string, key: string) => {
        selectedElements[key] = document.querySelectorAll(target);
      });
    }

    return selectedElements;
  }

  /**
   * Initialize a set of functions to create event listeners.
   *
   * @static
   * @param {Object} events An object of functions which will add event listeners when called.
   */
  private static initEventListeners(events: Global.MethodObject) {
    Object.keys(events).forEach(key => {
      try {
        // attempt to initialize the event
        events[key]();
      } catch (error) {
        // if it fails, log the event and continue
        console.debug(error);
        return false;
      }
    });
  }

  /**
   * Initialize an individual Controller.
   */
  public initialize() {
    Controller.initEventListeners(this.events);
  }
}
