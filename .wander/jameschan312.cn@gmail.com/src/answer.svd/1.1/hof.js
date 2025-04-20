/**
 * Traverses a list and call the function with each element.
 *
 * @param fn   A function that takes each element in the list.
 * @param list A list of elements.
 */
export function each(fn, list) {
    for (const elem of list) {
        fn(elem)
    }
}

/**
 * Traverses a list and finds the first element that meets the conditions.
 *
 * @param predicate A function that takes each element in the list, and returns
 *                  true if it meets some specific conditions; false otherwise.
 * @param list      A list of elements.
 * @return An element that meets the conditions; null otherwise.
 */
export function findFirst(predicate, list) {
    for (const elem of list) {
        if (predicate(elem)) {
            return elem
        }
    }

    return null
}

/**
 * Traverses a list and finds all the elements that meets the conditions.
 *
 * @param predicate A function that takes each element in the list, and returns
 *                  true if it meets some specific conditions; false otherwise.
 * @param list      A list of elements.
 * @return A list of elements that meet the conditions.
 */
export function filter(predicate, list) {
    const result = []
    for (const elem of list) {
        if (predicate(elem)) {
            result.push(elem)
        }
    }

    return result
}

/**
 * Maps elements in a list.
 *
 * @param fn   A function that takes each element in the list and returns a
 *             value.
 * @param list A list of elements.
 * @return {Array} A list of return values from the given function.
 */
export function map(fn, list) {
    const result = []
    for (const elem of list) {
        result.push(fn(elem))
    }

    return result
}
