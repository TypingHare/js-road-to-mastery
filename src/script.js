import * as fs from 'node:fs'
import chalk from 'chalk'
import { spawn } from 'child_process'

const [, , command, ...args] = process.argv
const commands = { prepare, grade }
const fn = commands[command]

fn ? fn(args) : error(`Unknown command ${command}`)

function error(message) {
    console.log(chalk.red(message))
    process.exit(1)
}

function prepare(name) {
    if (!name) {
        error('Usage: prepare <name>')
    }

    const filename = `${name}.js`
    const srcPath = `src/prototype/${name}.js`
    if (!fs.existsSync(srcPath)) {
        error(`No such practice: ${srcPath}`)
    }

    fs.copyFileSync(srcPath, `src/answer/${filename}`)
}

function grade(name) {
    const filename = `${name}.js`
    const graderFile = `src/grader/${filename}`

    spawn('node', [graderFile], { stdio: 'inherit' })
}
