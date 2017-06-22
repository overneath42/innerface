// Type definitions for Innerface 0.1.0
// Project: https://github.com/overneath42/innerface
// Definitions by: Justin Toon <http://justintoon.com>
// TypeScript Version: 2.3

interface ConfigObject {
  [key: string]: string
}

interface MethodObject {
  [key: string]: Function
}

interface KeyValueObject {
  [key: string]: {
    [key: string]: string
  }
}

interface NodeListObject {
  [key: string]: NodeListOf<HTMLElement>
}