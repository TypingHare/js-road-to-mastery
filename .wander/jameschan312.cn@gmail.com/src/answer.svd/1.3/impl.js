// noinspection DuplicatedCode

import { Button, Document, Label, Radio, TextField } from './dom.js'

export const document = new Document()

/**
 * Adds an event listener to a TextField element. It subscribes a function to
 * the `change` event so that whenever an `change` event is triggered, its value
 * changes.
 *
 * @param {TextField} textField The text field element.
 */
export function attachChangeListenerToTextField(textField) {
    /* Task 3: Implement this function */
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
    /* Task 4: Implement this function */
    radio.addEventListener('click', () => {
        if (!radio.checked) {
            radio.checked = true
        }

        // Unchecked other radio elements having the same name
        const name = radio.name
        for (const element in document.elements) {
            if (element instanceof Radio && element.name === name) {
                element.checked = false
            }
        }
    })
}

/**
 * Adds an event listener to a Button element.
 *
 * When the button is clicked,
 *
 * NOTE: We didn't have a test for this function in `main.js`. You have to
 * verify its correctness by yourself.
 *
 * @param {Button} button The button element.
 */
export function attachClickListenerToButton(button) {
    /* Task 5: Implement this function */
    button.addEventListener('click', () => {
        let value = ''
        for (const element in document.elements) {
            if (element instanceof Radio && element.name === 'fruit') {
                if (element.checked) {
                    value = element.value
                }
            }
        }

        for (const element in document.elements) {
            if (element instanceof Label && element.name === 'selected-fruit') {
                element.text = value
            }
        }
    })
}
