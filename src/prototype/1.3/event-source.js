import { EventSource } from './eda.js'

/**
 * Represents a button. It can trigger the `click` event.
 */
export class Button extends EventSource {
    /**
     * The current displayed string on the button.
     * @type {string}
     */
    text
}

/**
 * Represents a text field. It can trigger the `change` event.
 */
export class TextField extends EventSource {
    /**
     * The current displayed string in the text field.
     * @type {string}
     */
    text
}
