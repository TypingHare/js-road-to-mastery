// noinspection DuplicatedCode

/**
 * Saves a key-value pair to the store.
 * @param store {(string) => string|null} A store function.
 * @param key {string} The key of the pair to save.
 * @param value {string} The value of the pair to save.
 * @return {(string) => string|null} An updated store.
 */
export function save(store, key, value) {
    /* Task 2: Implement this function */
}

/**
 * Looks up a value in a store.
 * @param store {(string) => string|null} The store function to look up.
 * @param key {string} The key associated with the value to retrieve.
 * @return {string} The value associated with the key; null otherwise.
 */
export function lookup(store, key) {
    /* Task 3: Implement this function */
}

/**
 * An empty store that returns null no matter what key is given.
 * @param _ {string} Any key.
 * @returns {null}
 */
export const emptyStore = (_) => null

/**
 * Creates a store containing the given entries.
 *
 * TODO: Try to understand this function. How does it work?
 *
 * @param entries {Array[string, string]} Entries to save to the store.
 * @returns {(string) => string|null} An store.
 */
export function createStore(entries) {
    return entries.reduce(
        (store, [key, value]) => save(store, key, value),
        emptyStore
    )
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
 * 1. If the unit's hp is a less than zero, set it to zero.
 * 1. If the unit's mana is a less than zero, set it to zero.
 * 3. If the unit hp is less than zero, returns false; otherwise, returns true.
 *
 * @param unit {Unit} The unit that takes the effect.
 * @param effect {(Unit) => void }
 * @return {boolean} true if the unit is still alive after applying the effect;
 *         false otherwise.
 */
export function applyEffect(unit, effect) {
    /* Task 4: Implement this function */
}

/**
 * Represents an effect where a unit (unit 1) attacks on another unit (unit 2).
 *
 * The damage dealt is equal to unit1.attack - unit2.defense. If the result is
 * less than or equal to zero, then the damage dealt is 1.
 *
 * @param unit {Unit} The unit that attacks.
 * @return {(Unit) => void} A callback that takes the unit to be applied the
 *         effect.
 */
export function attackEffect(unit) {
    /* Task 5: Implement this function */
}

/**
 * Represents an effect where a unit (unit 1) uses ability to hit another unit
 * (unit 2).
 *
 * It first checks if unit 1 has more than 20 mana. If so, it deducts 20 mana
 * and deals 25 damage. Otherwise, prints "Not enough Mana" and affects nothing.
 *
 * @param unit {Unit} The unit that uses an ability.
 * @return {(Unit) => void} A callback that takes the unit to be applied the
 *         effect.
 */
export function abilityEffect(unit) {
    /* Task 6: Implement this function */
}
