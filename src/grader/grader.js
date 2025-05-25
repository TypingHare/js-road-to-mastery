import chalk from 'chalk'
import _ from 'lodash'

/**
 * Runs a series of test suites and prints a formatted grading report.
 *
 * Each test suite should include:
 * - a `name` describing the suite,
 * - a `points` value representing its total worth,
 * - a list of `cases` (functions returning boolean pass/fail).
 *
 * Example usage:
 * grade({ name: 'Addition', points: 5, cases: [() => 1 + 1 === 2] });
 *
 * @param {{name: string, points: number, cases: Array<() => boolean>}} testSuites
 */
export function grade(...testSuites) {
    const title = '='.repeat(32) + ' GRADING REPORT ' + '='.repeat(32)
    console.log(chalk.yellow(`\n${title}`))

    let totalPoints = 0
    let totalScore = 0
    testSuites.forEach(({ name, points, cases }) => {
        let dots = ''
        const numCases = cases.length
        const numPassedCases = cases
            .map((fn) => _.tap(fn(), (r) => (dots += r ? '.' : 'x')))
            .filter(Boolean).length
        const score = _.round((points / numCases) * numPassedCases, 1)
        const chalkFn = numPassedCases === numCases ? chalk.green : chalk.red

        totalPoints += points
        totalScore += score

        const roundedPoints = _.round(points, 2)
        const roundedScore = _.round(score, 2)

        console.log(
            chalkFn(
                `Tested \`${name}\` - ${roundedScore}/${roundedPoints} (${dots})`
            )
        )
    })

    const roundedTotalScore = _.round(totalScore, 2)
    const roundedTotalPoints = _.round(totalPoints, 2)

    console.log(
        chalk.cyan.bold(
            `Total score: ${roundedTotalScore}/${roundedTotalPoints}`
        )
    )
    console.log(chalk.yellow('='.repeat(80)))
}

/**
 * Creates a test case that checks whether the result of a function strictly
 * equals an expected value.
 *
 * @param {() => any} fn - A function that returns a value to test.
 * @param {any} expectedValue - The value to compare against.
 * @returns {() => boolean} A test function that returns true if the values
 * match.
 */
export function expectEqual(fn, expectedValue) {
    return function () {
        return fn() === expectedValue
    }
}

/**
 * Creates a test case that checks whether the result of a function returns a
 * list exactly equal to the expected list (same length and elements in order).
 *
 * @param {() => any[]} fn - A function that returns a list to test.
 * @param {any[]} expectedList - The expected list to compare against.
 * @returns {() => boolean} A test function that returns true if the lists
 * match.
 */
export function expectSameList(fn, expectedList) {
    return function () {
        const realList = fn()
        if (realList.length !== expectedList.length) {
            return false
        }

        for (let i = 0; i < realList.length; i++) {
            if (realList[i] !== expectedList[i]) {
                return false
            }
        }

        return true
    }
}

/**
 * Temporarily suppresses all console.log output while the given function is
 * executed.
 *
 * @param {() => any} fn - The function to execute with console.log suppressed.
 * @returns {any} The result of the executed function.
 */
export function suppressConsoleLogs(fn) {
    const originalLog = console.log
    console.log = () => {}

    try {
        return fn()
    } finally {
        console.log = originalLog
    }
}
