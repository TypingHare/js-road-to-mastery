// Higher Order Function (HOF)
//
// This prototype set contains 4 tasks.
//
// [NOTE] A higher order function is a function that either takes one or more
// other functions as arguments, or returns a function as its result.
//
// noinspection DuplicatedCode

const animal1 = { name: 'cat', speed: '30' }
const animal2 = { name: 'rabbit', speed: '25' }
const animal3 = { name: 'tortoise', speed: '0.62' }
const animal4 = { name: 'deer', speed: '40' }
const animals = [animal1, animal2, animal3, animal4]

/**
 * Traverses a list and call the function with each element.
 *
 * @param fn   A function that takes each element in the list.
 * @param list A list of elements.
 */
export function each(fn, list) {
    /* Task 1: Implements this function. */
}

// The following statement should print:
//
//     The speed of cat is 30 mph.
//     The speed of rabbit is 25 mph.
//     The speed of tortoise is 0.62 mph.
//     The speed of deer is 40 mph.
//
each(function (animal) {
    console.log(`The speed of ${animal.name} is ${animal.speed} mph.`)
}, animals)

/**
 * Traverses a list and finds the first element that meets the conditions.
 *
 * @param predicate A function that takes each element in the list, and returns
 *                  true if it meets some specific conditions; false otherwise.
 * @param list      A list of elements.
 * @return An element that meets the conditions; null otherwise.
 */
export function findFirst(predicate, list) {
    /* Task 2: Implement this function */
}

// The following statement should print:
//
//     tortoise
//
const slowAnimal = findFirst((animal) => animal.speed < 5, animals)
console.log(slowAnimal.name)

// The following statements should print:
//
//     null
//
const fastAnimal = findFirst((animal) => animal.speed > 50, animals)
console.log(fastAnimal)

/**
 * Traverses a list and finds all the elements that meets the conditions.
 *
 * @param predicate A function that takes each element in the list, and returns
 *                  true if it meets some specific conditions; false otherwise.
 * @param list      A list of elements.
 * @return A list of elements that meet the conditions.
 */
export function filter(predicate, list) {
    /* Task 3: Implement this function */
}

// The following statement should print:
//
//     cat, deer
//
const fastAnimals = filter((animal) => animal.speed >= 30, animals)
console.log(fastAnimals.join(', '))

/**
 * Maps elements in a list.
 *
 * @param fn   A function that takes each element in the list and returns a
 *             value.
 * @param list A list of elements.
 * @return {Array} A list of return values from the given function.
 */
export function map(fn, list) {
    /* Task 4: Implement this function */
}

/**
 * Gets the description of an animal.
 *
 * @param animal The animal.
 * @returns {string} The description of the animal.
 */
function getDescription(animal) {
    return `A ${animal.name} can run as fast as ${animal.speed} mph.`
}

// The following statement should print:
//
//     A cat can run as fast as 30 mph.
//     A rabbit can run as fast as 25 mph.
//     A tortoise can run as fast as 0.62 mph.
//     A deer can run as fast as 40 mph.
//
map(getDescription, animals).forEach(console.log)
