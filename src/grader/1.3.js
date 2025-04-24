import { expectEqual, grade } from './grader.js'
import {
    Event,
    EventBus,
    EventEmitter,
    EventSource,
} from '../answer/1.3/eda.js'
import _ from 'lodash'

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

const implTestSuite = {
    name: 'Impl',
    points: 70,
    cases: [
        expectEqual(() => {
            return 0
        }, 0),
    ],
}

grade(
    eventBusTestSuite,
    eventSourceTestSuite,
    eventEmitterTestSuite,
    implTestSuite
)
