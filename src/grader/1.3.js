import { expectEqual, expectSameList, grade } from './grader.js'
import {
    Event,
    EventBus,
    EventEmitter,
    EventSource,
} from '../answer/1.3/eda.js'
import {
    attachChangeListenerToTextField,
    attachClickListenerToButton,
    attachClickListenerToRadio,
    document,
} from '../answer/1.3/impl.js'
import _ from 'lodash'
import { Button, Label, Radio, TextField } from '../answer/1.3/dom.js'

function publish(eventBus, eventName) {
    eventBus.publish(
        new (class D extends Event {
            constructor() {
                super(eventName)
            }
        })()
    )
}

const eventBusTestSuite = {
    name: 'EventBus',
    points: 10,
    cases: [
        expectEqual(() => {
            let foo = 0
            _.tap(new EventBus(), (it) => {
                it.subscribe('bar', () => (foo += 2))
                publish(it, 'bar')
            })

            return foo
        }, 2),
    ],
}

const eventSourceTestSuite = {
    name: 'EventSource',
    points: 10,
    cases: [
        expectEqual(() => {
            let foo = 0
            _.tap(new EventSource(), (it) => {
                it.addEventListener('bar', () => (foo += 2))
                publish(it.eventBus, 'bar')
            })

            return foo
        }, 2),
        expectEqual(() => {
            class ValueEvent extends Event {
                value

                constructor(value) {
                    super('bar')
                    this.value = value
                }
            }

            let foo = 0
            _.tap(new EventSource(), (it) => {
                it.addEventListener('bar', (event) => (foo += event.value))
                it.eventBus.publish(new ValueEvent(5))
            })

            return foo
        }, 5),
    ],
}

const eventEmitterTestSuite = {
    name: 'EventEmitter',
    points: 10,
    cases: [
        expectEqual(() => {
            let foo = ''
            const eventEmitter = new EventEmitter()
            _.tap(new EventSource(), (it) => {
                it.addEventListener('change', (event) => (foo = event.value))
                eventEmitter.emitChangeEvent(it, 'hello')
            })

            return foo
        }, 'hello'),
        expectEqual(() => {
            let foo = ''
            const eventEmitter = new EventEmitter()
            _.tap(new EventSource(), (it) => {
                it.addEventListener('change', (event) => (foo += event.value))
                eventEmitter.emitChangeEvent(it, 'foo')
                eventEmitter.emitChangeEvent(it, ' bar')
            })

            return foo
        }, 'foo bar'),
    ],
}

;[
    _.tap(new Label(), (e) => (e.id = 'selected-fruit')),
    _.tap(new TextField(), (e) => (e.id = 'text-field1')),
    _.tap(new TextField(), (e) => (e.id = 'text-field2')),
    _.tap(new Radio(), (e) => {
        e.id = 'radio-fruit-apple'
        e.name = 'fruit'
        e.value = 'apple'
    }),
    _.tap(new Radio(), (e) => {
        e.id = 'radio-fruit-pear'
        e.name = 'fruit'
        e.value = 'pear'
    }),
    _.tap(new Radio(), (e) => {
        e.id = 'radio-fruit-peach'
        e.name = 'fruit'
        e.value = 'peach'
    }),
    _.tap(new Radio(), (e) => {
        e.id = 'radio-mammal-cat'
        e.name = 'mammal'
        e.value = 'cat'
    }),
    _.tap(new Button(), (e) => {
        e.id = 'button'
        e.text = 'Display Fruit'
    }),
].forEach((it) => document.elements.add(it))

const selectedFruitLabel = document.getElementById('selected-fruit')
const textField1 = document.getElementById('text-field1')
const textField2 = document.getElementById('text-field2')
const radioFruitApple = document.getElementById('radio-fruit-apple')
const radioFruitPear = document.getElementById('radio-fruit-pear')
const radioFruitPeach = document.getElementById('radio-fruit-peach')
const radioMammalCat = document.getElementById('radio-mammal-cat')
const button = document.getElementById('button')
attachChangeListenerToTextField(textField1)
attachChangeListenerToTextField(textField2)
attachClickListenerToRadio(radioFruitApple)
attachClickListenerToRadio(radioFruitPear)
attachClickListenerToRadio(radioFruitPeach)
attachClickListenerToRadio(radioMammalCat)
attachClickListenerToButton(button)

const implTestSuite = {
    name: 'Impl',
    points: 70,
    cases: [
        /** @see attachChangeListenerToTextField */
        expectEqual(() => {
            document.eventEmitter.emitChangeEvent(textField1, '123')
            document.eventEmitter.emitChangeEvent(textField1, 'abc')
            document.eventEmitter.emitChangeEvent(textField2, '123')

            return textField1.value
        }, 'abc'),

        /** @see attachClickListenerToRadio */
        expectSameList(() => {
            document.eventEmitter.emitClickEvent(radioFruitApple)
            document.eventEmitter.emitClickEvent(radioMammalCat)
            document.eventEmitter.emitClickEvent(radioFruitPear)

            return [radioFruitApple, radioFruitPear, radioMammalCat].map(
                (it) => it.checked
            )
        }, [false, true, true]),

        /** @see attachClickListenerToButton */
        expectEqual(() => {
            radioFruitApple.checked = false
            radioFruitPear.checked = false
            radioFruitPeach.checked = true
            radioMammalCat.checked = false
            document.eventEmitter.emitClickEvent(button)

            return selectedFruitLabel.text
        }, 'peach'),
    ],
}

grade(
    eventBusTestSuite,
    eventSourceTestSuite,
    eventEmitterTestSuite,
    implTestSuite
)
