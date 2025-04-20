/**
 * Prepares to greet.
 * @param name {string} The name of the person to greet.
 * @return {() => void} A function that prints "Hi Alice. How are you?" if the
 *         specified name is "Alice"
 */
export function prepareToGreet(name) {
    return function () {
        console.log(`Hi ${name}. How are you?`)
    }
}

/**
 * Saves a key-value pair to the store.
 * @param store {(string) => string|null} A store function.
 * @param key {string} The key of the pair to save.
 * @param value {string} The value of the pair to save.
 * @return {(string) => string|null} An updated store.
 */
export function save(store, key, value) {
    return (k) => (k === key ? value : store(k))
}

/**
 * Looks up a value in a store.
 * @param store {(string) => string|null} The store function to look up.
 * @param key {string} The key associated with the value to retrieve.
 * @return {string} The value associated with the key; null otherwise.
 */
export function lookup(store, key) {
    return store(key)
}

/**
 * @typedef {Object} Unit
 * @property {number} hp
 * @property {number} mana
 * @property {number} attack
 * @property {number} defense
 */

/**
 * Applies an effect on a unit. This is often seen in game development.
 *
 * After applying the effect:
 * 1. If the unit's HP is a less than zero, set it to zero.
 * 2. If the unit's mana is a less than zero, set it to zero.
 * 3. If the unit hp is less than zero, returns false; otherwise, returns true.
 *
 *
 * @param unit {Unit} The unit that takes the effect.
 * @param effect {(Unit) => void}
 * @return {boolean} true if the unit is still alive after applying the effect;
 *         false otherwise.
 */
export function applyEffect(unit, effect) {
    effect(unit)

    if (unit.hp < 0) unit.hp = 0
    if (unit.mana < 0) unit.mana = 0

    return unit.hp > 0
}

/**
 * Represents an effect where a unit (unit 1) attacks on another unit (unit 2).
 *
 * The damage dealt is equal to unit1.attack - unit2.defense. If the result is
 * less than or equal to zero, then the damage dealt should be set to 1.
 *
 * @param unit {Unit} The unit that attacks.
 * @return {(Unit) => void} A callback that takes the unit to be applied the
 *         effect.
 */
export function attackEffect(unit) {
    return function (enemy) {
        const damage = Math.max(1, unit.attack - enemy.defense)
        enemy.hp -= damage
    }
}

/**
 * Represents an effect where a unit (unit 1) uses ability to hit another unit
 * (unit 2).
 *
 * It first checks if unit 1 has more than 20 mana. If so, it deducts 20 mana
 * and deals 25 damage. Otherwise, prints "Not enough Mana" and affects nothing.
 *
 * @param unit {Unit} The unit that uses an ability.
 */
export function abilityEffect(unit) {
    return function (enemy) {
        if (unit.mana < 20) {
            return console.log('Not enough Mana')
        }

        unit.mana -= 20
        enemy.hp -= 25
    }
}
