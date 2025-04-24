// Event-driven Architecture (EDA)
//
// In this practice
//
//
// @link https://www.geeksforgeeks.org/event-driven-architecture-system-design/
// noinspection DuplicatedCode
// noinspection SpellCheckingInspection

import { Button, TextField } from './event-source.js'
import { addEventListener, EventEmitter } from './eda.js'
import _ from 'lodash'

const document = {
    eventEmitter: new EventEmitter(),
    elements: new Map(),
    getElementById: (id) => this.elements.get(id),
}

document.elements.set('input-username', new TextField())
document.elements.set('input-password', new TextField())
document.elements.set(
    'button-login',
    _.tap(new Button(), (it) => {
        it.text = 'LOGIN'
    })
)

const eInputUsername = document.getElementById('input-username')
const eInputPassword = document.getElementById('input-password')
const eButtonLogin = document.getElementById('button-login')

function sendLoginRequestToServer(username, password) {
    console.log('Sending login request to the server.')
    console.log(`Username: ${username}`)
    console.log(`Password: ${password}`)

    return username === 'admin' && password === '123456'
}

;[eInputUsername, eInputPassword].forEach(e => {
    addEventListener(e, 'click', (event) => {
        e.text = event.text
    })
})

addEventListener(eButtonLogin, 'click', () => {
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
 * We expect the following to be output in the console:
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
