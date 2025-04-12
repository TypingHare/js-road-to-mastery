import * as fs from 'node:fs'
import chalk from 'chalk'

const [, , command, ...args] = process.argv
const commands = { prepare, grade }
const fn = commands[command]

fn ? fn(args) : error(`Unknown command ${command}`)

function error(message) {
    console.log(chalk.red(message))
    process.exit(1)
}

function prepare(name) {
    const filename = `${name}.js`
    const srcPath = `src/practice/${name}.js`
    if (!fs.existsSync(srcPath)) {
        error(`No such practice: ${srcPath}`)
    }

    fs.copyFileSync(srcPath, `src/answer/${filename}`)
}

function grade(name) {}
