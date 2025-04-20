// Callback Function
//
// This exercise contains 6 tasks. Please implement all the functions in
// `callback.js`.
//
// noinspection DuplicatedCode

import {
    abilityEffect,
    applyEffect,
    attackEffect,
    createStore,
    lookup,
    prepareToGreet,
} from './callback.js'
import _ from 'lodash'

// This should print "Hi James. How are you?"
const greetJames = prepareToGreet('James')
greetJames()

const store = createStore([
    ['bottle', 'water'],
    ['lunchbox', 'lunch'],
    ['bookcase', 'books'],
])

// This should print "lunch"
console.log(lookup(store, 'lunchbox'))

// This should print "null"
console.log(lookup(store, 'house'))

const hero = { hp: 200, mana: 50, attack: 12, defense: 5 }
const slime = { hp: 50, mana: 0, attack: 8, defense: 4 }

applyEffect(hero, attackEffect(slime))
applyEffect(slime, abilityEffect(hero))

// This should print:
//
//     Hero HP: 197
//     Slime HP: 25
//
console.log(`Hero HP: ${hero.hp}`)
console.log(`Slime HP: ${slime.hp}`)

const println = (x) => console.log(x)

function game() {
    // Initialize units
    const hero = { hp: 250, mana: 50, attack: 17, defense: 7 }
    const spider = { hp: 80, mana: 0, attack: 14, defense: 5 }
    const rat = { hp: 120, mana: 0, attack: 10, defense: 8 }

    // Initialize states
    const units = [hero, spider, rat]
    const alive = [true, true, true]
    const names = ['hero', 'spider', 'rat']

    // To increase readability, we define some constants
    const HERO = 0
    const SPIDER = 1
    const RAT = 2

    // Initialize available effects
    const heroAttackEffect = attackEffect(hero)
    const heroAbilityEffect = abilityEffect(hero)
    const spiderAttackEffect = attackEffect(spider)
    const ratAttackEffect = attackEffect(rat)

    const handler = setInterval(() => {
        if (alive[HERO]) {
            // Get the indices of living mobs
            // It could be:
            // 1. [SPIDER, RAT]
            // 2. [SPIDER]
            // 3. [RAT]
            const mobIndices = alive
                .slice(1)
                .flatMap((r, i) => (r ? [i] : []))
                .map((x) => x + 1)

            // Get a random index from `mobIndices` as target mob
            const mobIndex = _.sample(mobIndices)

            // Get a random effect
            const effect = _.sample([heroAttackEffect, heroAbilityEffect])

            // Apply the effect on the mob unit
            println(`Hero attacks ${names[mobIndex]}`)
            alive[mobIndex] = applyEffect(units[mobIndex], effect)
        }

        if (alive[SPIDER]) {
            println('Spider attacks hero')
            alive[HERO] = applyEffect(hero, spiderAttackEffect)
        }

        if (alive[RAT]) {
            println('Rat attacks hero')
            alive[HERO] = applyEffect(hero, ratAttackEffect)
        }

        // Print status of all units
        ;[hero, spider, rat].forEach((unit, i) => {
            println(
                `${names[i].padEnd(7)}` +
                    `HP = ${unit.hp.toString().padEnd(3)} | ` +
                    `Mana = ${unit.mana.toString().padEnd(3)}`
            )
        })

        if (!alive[HERO] || (!alive[SPIDER] && !alive[RAT])) {
            clearInterval(handler)
            println(alive[HERO] ? 'We won the battle!' : 'We lost the battle.')
        }
    }, 1000)
}

// This should display battle information and unit status every second
// It should show "We won the battle!" or "We lost the battle." at the end and
// then stop
game()
