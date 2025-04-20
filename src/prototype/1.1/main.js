// Higher Order Function (HOF)
//
// This exercise contains 4 tasks. Please implement all the functions in
// `hof.js`.
//
// noinspection DuplicatedCode

import { each, filter, findFirst, map } from './functions.js'

const animal1 = { name: 'cat', speed: '30' }
const animal2 = { name: 'rabbit', speed: '25' }
const animal3 = { name: 'tortoise', speed: '0.62' }
const animal4 = { name: 'deer', speed: '40' }
const animals = [animal1, animal2, animal3, animal4]

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

// The following statement should print:
//
//     cat, deer
//
const fastAnimals = filter((animal) => animal.speed >= 30, animals)
console.log(fastAnimals.join(', '))

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
map(getDescription, animals).forEach((x) => console.log(x))
