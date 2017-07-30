// Type definitions for Innerface 0.1.0 Project:
// https://github.com/overneath42/innerface Definitions by: Justin Toon
// <http://justintoon.com> TypeScript Version: 2.3


export namespace Global {
  export interface ConfigObject {
    [key: string]: string | ConfigObject;
  }

  export interface MethodObject {
    [key: string]: Function;
  }

  export interface KeyValueObject {
    [key: string]: {
      [key: string]: string;
    };
  }

  export interface NodeListObject<T extends HTMLElement> {
    [key: string]: NodeListOf<T>;
  }

  export type FormField = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
}

declare class Innerface {
  public static init(): void;
}

export namespace If {
  interface IController {
    name: string;
    targets: NodeListObject;
    events?: MethodObject;
    methods?: MethodObject;
  }

  interface Controller {
    name: string;
    targets: NodeListObject;
    events: MethodObject;
    methods?: MethodObject;
    initialize(): void;
    static getTargets(name: string, targets?: string | ConfigObject): NodeListObject;
  }
}
