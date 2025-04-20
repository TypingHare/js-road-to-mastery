import {
    expectEqual,
    expectSameList,
    grade,
    suppressConsoleLogs,
} from './grader.js'
import {
    abilityEffect,
    applyEffect,
    attackEffect,
    createStore,
    emptyStore,
    lookup,
    prepareToGreet,
    save,
} from '../answer/1.2/callback.js'

const prepareToGreetTestSuite = {
    name: 'prepare_to_greet',
    points: 10,
    cases: [expectEqual(() => typeof prepareToGreet('James'), 'function')],
}

const saveAndLookupTestSuite = {
    name: 'save and lookup',
    points: 40,
    cases: [
        expectEqual(() => typeof save(emptyStore, '', ''), 'function'),
        expectEqual(() => lookup(emptyStore, 'bottle'), null),
        expectEqual(() => {
            const store = createStore([
                ['bottle', 'water'],
                ['lunchbox', 'lunch'],
                ['bookcase', 'books'],
            ])
            return lookup(store, 'bottle')
        }, 'water'),
        expectEqual(() => {
            const store = createStore([
                ['bottle', 'water'],
                ['lunchbox', 'lunch'],
                ['bookcase', 'books'],
            ])
            return lookup(store, 'lunchbox')
        }, 'lunch'),
        expectEqual(() => {
            const store = createStore([
                ['bottle', 'water'],
                ['lunchbox', 'lunch'],
                ['bookcase', 'books'],
            ])
            return lookup(store, 'bookcase')
        }, 'books'),
        expectEqual(() => {
            const store = createStore([
                ['bottle', 'water'],
                ['lunchbox', 'lunch'],
                ['bookcase', 'books'],
            ])
            return lookup(store, 'house')
        }, null),
    ],
}

function createUnit(hp, mana, attack, defense) {
    return { hp, mana, attack, defense }
}

const manaBurnEffect = (unit) => {
    unit.hp -= 15
    unit.mana -= 15
}

const effectsTestSuite = {
    name: 'effects',
    points: 50,
    cases: [
        // applyEffect should apply an effect and clamp hp/mana at zero
        expectEqual(() => {
            const unit = createUnit(10, 10, 0, 0)
            return applyEffect(unit, manaBurnEffect)
        }, false),

        expectSameList(() => {
            const unit = createUnit(10, 10, 0, 0)
            applyEffect(unit, manaBurnEffect)
            return [unit.hp, unit.mana]
        }, [0, 0]),

        expectEqual(() => {
            const unit = createUnit(100, 50, 0, 0)
            return applyEffect(unit, manaBurnEffect)
        }, true),

        // attackEffect should reduce enemy.hp by (unit.attack - enemy.defense),
        // min 1
        expectEqual(() => {
            const unit = createUnit(10, 0, 10, 0)
            const enemy = createUnit(30, 0, 0, 5)
            applyEffect(enemy, attackEffect(unit))
            return enemy.hp
        }, 25),

        expectEqual(() => {
            const unit = createUnit(10, 0, 3, 0)
            const enemy = createUnit(10, 0, 0, 5)
            applyEffect(enemy, attackEffect(unit))
            return enemy.hp
        }, 9),

        // abilityEffect should reduce enemy.hp by 25 and cost 20 mana, only if
        // enough mana
        expectSameList(() => {
            const unit = createUnit(10, 25, 0, 0)
            const enemy = createUnit(30, 0, 0, 0)
            applyEffect(enemy, abilityEffect(unit))
            return [enemy.hp, unit.mana]
        }, [5, 5]),

        expectSameList(() => {
            const unit = createUnit(10, 10, 0, 0)
            const enemy = createUnit(30, 0, 0, 0)
            suppressConsoleLogs(() => {
                applyEffect(enemy, abilityEffect(unit))
            })
            return [enemy.hp, unit.mana]
        }, [30, 10]),
    ],
}

grade(prepareToGreetTestSuite, saveAndLookupTestSuite, effectsTestSuite)
