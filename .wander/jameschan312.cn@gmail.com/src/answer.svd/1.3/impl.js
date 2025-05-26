// noinspection DuplicatedCode

import { Button, Document, Label, Radio, TextField } from './dom.js'

/**
 * DOM instance. Think of it as a global variable. You will be using it in some
 * implementations in the following tasks.
 *
 * @type {Document}
 */
export const document = new Document()

/**
 * Adds an event listener to a TextField element. It subscribes a function to
 * the `change` event so that whenever an `change` event is triggered, its value
 * changes.
 *
 * @param {TextField} textField The text field element.
 */
export function attachChangeListenerToTextField(textField) {
    textField.addEventListener('change', (event) => {
        textField.value = event.value
    })
}

/**
 * Adds an event listener to a Radio element. It subscribes a function to the
 * `click` event so that whenever it is clicked, it is checked.
 *
 * NOTE: Other radio elements in the same group (i.e., having the same name)
 * should be unchecked automatically.
 *
 * NOTE: We didn't have a test for this function in `main.js`. You have to
 * verify its correctness by yourself.
 *
 * @param {Radio} radio The radio element.
 */
export function attachClickListenerToRadio(radio) {
    radio.addEventListener('click', () => {
        for (const element of document.elements) {
            if (element instanceof Radio) {
                element.checked = false
            }
        }

        radio.checked = true
    })
}

/**
 * Adds an event listener to a Button element.
 *
 * When the button is clicked, the handler checks if there is any radio is
 * checked. If a radio element is checked, get the `value` of it and display it
 * on the Label element (look for all the label elements in the document, and
 * set their values properly).
 *
 * NOTE: We didn't have a test for this function in `main.js`. You have to
 * verify its correctness by yourself.
 *
 * @param {Button} button The button element.
 * @see {Radio}
 * @see {Label}
 */
export function attachClickListenerToButton(button) {
    button.addEventListener('click', () => {
        const elements = [...document.elements]

        /** @type {Radio} */
        const checkedRadio = elements.find(
            (e) => e instanceof Radio && e.checked
        )

        if (!checkedRadio) return

        const checkedRadioValue = checkedRadio.value
        elements
            .filter((it) => it instanceof Label)
            .forEach((label) => (label.text = checkedRadioValue))
    })
}
