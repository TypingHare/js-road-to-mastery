// Event-driven Architecture (EDA)
//
// In this practice, you will be implementing an event-driven architecture that
// is similiar to DOM, and we call it "DOM lite".
//
// @link https://www.geeksforgeeks.org/event-driven-architecture-system-design/
// noinspection DuplicatedCode
// noinspection SpellCheckingInspection

import _ from 'lodash'
import { attachChangeListenerToTextField, document } from './impl.js'
import { Button, TextField } from './dom.js'

// Add elements to the document
document.elements.add(
    _.tap(new TextField(), (it) => {
        it.id = 'input-username'
    })
)
document.elements.add(
    _.tap(new TextField(), (it) => {
        it.id = 'input-password'
    })
)
document.elements.add(
    _.tap(new Button(), (it) => {
        it.id = 'button-login'
        it.text = 'LOGIN'
    })
)

const eInputUsername = document.getElementById('input-username')
const eInputPassword = document.getElementById('input-password')
const eButtonLogin = document.getElementById('button-login')

/**
 * Sends a login request to the server.
 *
 * This is a mock function. Since we don't have a real backend, this function
 * returns true if and only if the username is "admin" and the password is
 * "123456".
 *
 * @param {string} username The username associated with the account.
 * @param {string} password The password associated with the account.
 * @returns {boolean} true if both username and password match; false otherwise.
 */
function sendLoginRequestToServer(username, password) {
    console.log('Sending login request to the server.')
    console.log(`Username: ${username}`)
    console.log(`Password: ${password}`)

    return username === 'admin' && password === '123456'
}

;[eInputUsername, eInputPassword].forEach(attachChangeListenerToTextField)

eButtonLogin.addEventListener('click', () => {
    const username = eInputUsername.value
    const password = eInputPassword.value
    const ret = sendLoginRequestToServer(username, password)

    console.log(ret ? 'Login succeeded' : 'Login failed')
})

/**
 * This function simulates the process where the user does the following things
 * in order:
 *
 * 1. Input username "admin"
 * 2. Input password "123456"
 * 3. Click the login button
 *
 * We expect the following to be output on the terminal when it is called:
 *
 *     Sending login request to the server.
 *     Username: admin
 *     Password: 123456
 *     Login succeeded
 *
 */
function simulate() {
    document.eventEmitter.emitChangeEvent(eInputUsername, 'a')
    document.eventEmitter.emitChangeEvent(eInputUsername, 'ad')
    document.eventEmitter.emitChangeEvent(eInputUsername, 'adm')
    document.eventEmitter.emitChangeEvent(eInputUsername, 'admi')
    document.eventEmitter.emitChangeEvent(eInputUsername, 'admin')

    document.eventEmitter.emitChangeEvent(eInputPassword, '1')
    document.eventEmitter.emitChangeEvent(eInputPassword, '12')
    document.eventEmitter.emitChangeEvent(eInputPassword, '123')
    document.eventEmitter.emitChangeEvent(eInputPassword, '1234')
    document.eventEmitter.emitChangeEvent(eInputPassword, '12345')
    document.eventEmitter.emitChangeEvent(eInputPassword, '123456')

    document.eventEmitter.emitClickEvent(eButtonLogin)
}

simulate()
