# [JavaScript - Road to Mastery](https://github.com/TypingHare/js-road-to-mastery)

## About

**JavaScript - Road to Mastery** is a structured, hands-on learning path designed to help developers build a deep understanding of JavaScript through guided exercises, real-world coding challenges, and automated testing.

This repository provides:

- **Practice Prototypes**: Located in the `src/prototype` directory, these serve as the starting point for each exercise.
- **Answer Sheets**: Generated in the `src/answer` directory using the `pnpm new` command, allowing you to work on exercises without modifying the original prototypes.
- **Automated Grading**: Utilize the `pnpm grade` command to evaluate your solutions against predefined test cases in the `src/grader` directory.
- **Execution Environment**: Run your solutions with the `pnpm try` command to test functionality in a Node.js environment.

Whether you're a beginner aiming to grasp the fundamentals or an experienced developer looking to reinforce your knowledge, this repository offers a comprehensive path to mastering JavaScript.

## Installation

Before you begin, ensure that you have [Node.js](https://nodejs.org/en) and [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) installed on your machine.

Next, install [pnpm](https://pnpm.io/installation) globally by running:

```shell
npm install -g pnpm
```

Then, fork this repository and clone it to your local machine. Navigate to the project root directory and install dependencies:

```shell
pnpm install
```

To confirm the setup, list the available practice exercises:

```shell
pnpm exercises
```

## Usage Guide

To view all available commands and their descriptions, run:

```shell
pnpm run help
```

> [!IMPORTANT]
> **Ensure you are in the project root directory when executing any commands.**

### Creating an Answer Sheet

Practice prototypes are located in the `src/prototype` directory. **Do not modify these files.**

To start working on a specific exercise, generate a copy in the `src/answer` directory using the `new` command. For example, to generate an answer sheet for practice `1.1`, run:

```shell
pnpm new 1.1
```

This will create a new file at `src/answer/1.1/main.js`, where you can complete the assigned tasks.

### Running Your Code

To execute the `main.js` file for a specific practice, use the `try` command. For instance, to run the solution for `1.1`, use:

```shell
pnpm try 1.1
```

Specifically, this will execute `src/answer/1.1/main.js` with Node.js.

### Grading Your Work

Once you've completed the exercise, you can grade your answer using the `grade` command. For example, to grade practice `1.1`, run:

```shell
pnpm grade 1.1
```

The results will be displayed in the terminal. Grading is based on test cases defined in the `src/grader` directory. Each practice includes several test suites, and any failed test case will cause the corresponding suite to be marked in red.
