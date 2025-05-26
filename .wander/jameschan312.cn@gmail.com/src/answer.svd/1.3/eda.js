// noinspection DuplicatedCode

/**
 * An event source is a component that generates events. Examples include user
 * interfaces (web browsers), sensors, databases, and so on. Event sources
 * initiate the flow of information that drives the entire architecture.
 *
 * For instance, in a web page, a button element can generate a "click" event,
 * allowing users to bind handlers to it.
 */
export class EventSource {
    /**
     * Represents the event bus bound to this event source.
     * @type {EventBus}
     */
    eventBus = new EventBus()

    /**
     * Binds a listener (handler) to an event of an event source.
     *
     * @param {string} eventName The name of the event to bind.
     * @param {EventHandler} handler The function that is called when the event
     *        is triggered.
     */
    addEventListener(eventName, handler) {
        this.eventBus.subscribe(eventName, handler)
    }
}

/**
 * An event is emitted by sources and can encapsulate various types of
 * information, serving as the primary means through which different components
 * communicate.
 *
 * @abstract
 */
export class Event {
    /**
     * The name of this event.
     * @type {string}
     */
    name

    /**
     * Creates an Event instance.
     *
     * @param name The name of this event.
     */
    constructor(name) {
        this.name = name
    }
}

export class ClickEvent extends Event {
    /**
     * Creates a ClickEvent instance.
     */
    constructor() {
        super('click')
    }
}

export class ChangeEvent extends Event {
    /**
     * The value to change.
     * @type {string}
     */
    value

    /**
     * Creates an ChangeEvent instance.
     * @param {string} value The value to change.
     */
    constructor(value) {
        super('change')
        this.value = value
    }
}

/**
 * @typedef {(event: Event) => void} EventHandler
 */

/**
 * An event bus, also known as event broker, acts as a general hub, facilitating
 * communication between various components by handling event distribution,
 * filtering, and routing. It ensures that events reach the right subscribers,
 * promoting efficient interaction within the system.
 */
export class EventBus {
    /**
     * Internal map from event names to sets of callback functions.
     *
     * @type {Map<string, Set<EventHandler>>}
     * @private
     */
    #eventHandlersMap = new Map()

    /**
     * Subscribes a callback function to an event. The callback will be invoked
     * whenever the event is published.
     *
     * @param {string} eventName The name of the event to bind.
     * @param {EventHandler} handler The function that is called when the event
     *        is triggered.
     */
    subscribe(eventName, handler) {
        if (!this.#eventHandlersMap.has(eventName)) {
            this.#eventHandlersMap.set(eventName, new Set())
        }

        this.#eventHandlersMap.get(eventName).add(handler)
    }

    /**
     * Unsubscribes a previously subscribed callback from an event.
     *
     * @param {string} eventName The name of the event to bind.
     * @param {EventHandler} handler The handler to unbind from the event.
     */
    // noinspection JSUnusedGlobalSymbols
    unsubscribe(eventName, handler) {
        if (this.#eventHandlersMap.has(eventName)) {
            this.#eventHandlersMap.get(eventName).delete(handler)
        }
    }

    /**
     * Publishes an event to all subscribers of the event’s name.
     *
     * This method trigger all the handlers (callbacks) that are bound to the
     * name in the event (object).
     *
     * @param {Event} event The event to publish.
     */
    publish(event) {
        const handlers = this.#eventHandlersMap.get(event.name)
        if (handlers) {
            for (const handler of handlers) {
                handler(event)
            }
        }
    }
}

/**
 * Represents an event emitter that can emit different types of UI events.
 */
export class EventEmitter {
    /**
     * Emits a click event using the provided event source.
     *
     * @param {EventSource} eventSource - The source through which the event is
     *        emitted.
     */
    emitClickEvent(eventSource) {
        eventSource.eventBus.publish(new ClickEvent())
    }

    /**
     * Emits a change event with the given text using the provided event source.
     *
     * @param {EventSource} eventSource - The source through which the event is
     *        emitted.
     * @param {string} value - The value to include in the change event.
     */
    emitChangeEvent(eventSource, value) {
        eventSource.eventBus.publish(new ChangeEvent(value))
    }
}
