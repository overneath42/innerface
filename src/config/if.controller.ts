/**
 * @file The prototype object for `Controller`.
 *
 * @author Justin Toon
 * @license MIT
 *
 * @requires NPM:lodash
 * @requires '../if.const.js:selectors
 */

import * as _ from 'lodash';
import { selectors } from '../if.const';

/**
 * A generic prototype for creating a function
 * which will execute scripting.
 *
 * @since 0.1.0
 */
export default class Controller implements Innerface.IController {
  public name: string;
  public targets: NodeListObject;
  public events: MethodObject;
  public methods: MethodObject;

  constructor(props: Innerface.IController) {
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
   *
   * @returns {Object}
   */
  public static getTargets(name: string, targets?: string | ConfigObject): NodeListObject {
    let selectedElements: NodeListObject = {};
    targets = targets || selectors[name];

    if (targets) {
      _.forEach(targets, (target: string, key: string) => {
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
  private static initEventListeners(events: MethodObject) {
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
}
