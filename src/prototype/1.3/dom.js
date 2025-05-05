// noinspection DuplicatedCode

import { EventEmitter, EventSource } from './eda.js'

/**
 * Represents an HTML element.
 */
export class Element extends EventSource {
    /**
     * The ID of the element. In a DOM, the ID of any elements should be unique.
     *
     * @type {string}
     */
    id
}

/**
 * Represents a button. It can trigger the `click` event.
 */
export class Button extends Element {
    /**
     * The text displayed on this button.
     *
     * @type {string}
     */
    text
}

/**
 * Represents a label.
 */
export class Label extends Element {
    /**
     * The text displayed on this label.
     *
     * @type {string}
     */
    text
}

/**
 * Represents a text field. It can trigger the `change` event.
 */
export class TextField extends Element {
    /**
     * The string displayed in this text field.
     *
     * @type {string}
     */
    value
}

/**
 * Represents a radio input.
 */
export class Radio extends Element {
    /**
     * The name attribute. Radio elements having the same name are considered
     * to be in the same group. Checking one radio in a group will uncheck all
     * other radios in the same group.
     *
     * @type {string}
     */
    name

    /**
     * The value associated with this Radio.
     *
     * @type {string}
     */
    value

    /**
     * Whether this radio element is checked.
     *
     * @type {boolean}
     */
    checked = false
}

/**
 * Represents a DOM lite class.
 */
export class Document {
    /**
     *
     * @type {EventEmitter}
     */
    eventEmitter = new EventEmitter()

    /**
     * Represents a set of elements. DOM lite does not have hierarchy; instead,
     * all the elements are in the same level.
     *
     * @type {Set<Element>}
     */
    elements = new Set()

    /**
     * Retrieves an element from the document by a specified ID.
     *
     * @param {string} id The ID of the element.
     * @returns {EventSource|any|null} The element associated with the given ID.
     */
    getElementById(id) {
        for (const element of this.elements) {
            if (element.id === id) {
                return element
            }
        }

        return null
    }
}
