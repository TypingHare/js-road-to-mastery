import chalk from 'chalk'

function apply(value, fn) {
    fn(value)
    return value
}

function roundTenth(num) {
    return Math.round(num * 10) / 10
}

/**
 *
 * @param {{name: string, points: number, cases: Array}} testSuites
 */
export function grade(...testSuites) {
    const title = '='.repeat(32) + ' GRADING REPORT ' + '='.repeat(32)
    console.log(chalk.yellow(`\n${title}`))

    testSuites.forEach(({ name, points, cases }) => {
        let dots = ''
        const passed = cases
            .map((fn) => apply(fn(), (r) => (dots += r ? '.' : 'x')))
            .filter(Boolean).length
        const score = roundTenth((points / cases.length) * passed)
        const chalkFn = passed === cases.length ? chalk.green : chalk.red
        console.log(chalkFn(`Tested ${name} - ${score}/${points} (${dots})`))
    })

    console.log(chalk.yellow('='.repeat(80)))
}

export function expectEqual(fn, expectedValue) {
    return function () {
        return fn() === expectedValue
    }
}

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
