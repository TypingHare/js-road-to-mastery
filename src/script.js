import * as fs from 'node:fs'
import chalk from 'chalk'
import { spawn } from 'child_process'
import { catalog } from './catalog.js'
import fsExtra from 'fs-extra'
import _ from 'lodash'

const [, , command, ...args] = process.argv
const commands = { help, exercises, new: _new, try: _try, grade }
const fn = commands[command]

fn ? fn(...args) : error(`Unknown command ${command}`)

/**
 * Prints an error message and exit the program.
 */
function error(message) {
    console.log(chalk.red(message))
    process.exit(1)
}

/**
 * Prints help information.
 */
function help() {
    const map = {
        exercises: 'Display all available exercises.',
        'new <name>': 'Set up an answer sheet.',
        'try <name>': 'Run the main.js file of a specified answer sheet.',
        'grade <name>': 'Grade a specified exercise.',
    }

    _.forIn(map, (desc, command) => {
        console.log(chalk.blue(command.padEnd(14)) + chalk.yellow(desc))
    })
}

/**
 * Prints a list of available exercises.
 */
function exercises() {
    Object.entries(catalog).forEach(([name, title]) => {
        console.log(chalk.cyan(name.padEnd(6)) + chalk.magenta(title))
    })
}

/**
 * Sets up an answer sheet.
 * @param name The name of the exercise to set up.
 */
function _new(name) {
    if (!name) {
        error('Usage: new <name>')
    }

    const srcPath = `src/prototype/${name}`
    if (!fs.existsSync(srcPath)) {
        error(`No such practice: ${srcPath}`)
    }

    const destPath = `src/answer/${name}`
    fsExtra.copySync(srcPath, destPath, { overwrite: true })
    console.log(chalk.green(`Created answer sheet: ${destPath}`))
    console.log(
        chalk.green(`Please follows the instructions in ${destPath}/main.js`)
    )
}

/**
 * Runs the main function.
 * @param name The name of the exercise to run.
 */
export function _try(name) {
    if (!name) {
        error('Usage: try <name>')
    }

    const dirPath = `src/answer/${name}`
    if (!fs.existsSync(dirPath)) {
        error(`Answer sheet does not exist: ${dirPath}`)
    }

    const mainPath = `${dirPath}/main.js`
    if (!fs.existsSync(mainPath)) {
        error(`main.js not found: ${mainPath}`)
    }

    spawn('node', [mainPath], { stdio: 'inherit' })
}

function grade(name) {
    if (!name) {
        error('Usage: grade <name>')
    }

    const filename = `${name}.js`
    const graderFile = `src/grader/${filename}`

    if (!fs.existsSync(graderFile)) {
        error(`No such answer sheet: ${graderFile}`)
    }

    spawn('node', [graderFile], { stdio: 'inherit' })
}
