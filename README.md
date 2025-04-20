# [JavaScript - Road to Mastery](https://github.com/TypingHare/js-road-to-mastery)

## Install

First, make sure [Node.js](https://nodejs.org/en) is installed on your machine. Then, install [pnpm](https://pnpm.io/installation) globally using the following command:

```shell
npm install -g pnpm
```

Next, clone this repository and run the following command in the root directory:

```shell
pnpm install
```

To verify the setup, list the available practice exercises with:

```shell
pnpm exercises
```

## How to Use

### Preparing an Answer Sheet

Practice prototypes are located in the `src/prototype` directory. Do not edit these files. To begin working on a specific practice, generate a copy in the `src/answer` directory using the `prepare <name>` command.

For example, to prepare practice `1.1`, run:

```shell
pnpm prepare 1.1
```

This will create an answer sheet at `src/answer/main.js`, where you can complete the assigned tasks.

### Grade the Answer Sheet

Once you've completed the exercise, you can grade your answer using the grade command. For example, to grade practice `1.1`, run:

```shell
pnpm grade 1.1
```

A grading report will be displayed in the console.

Grading is based on test cases located in the `src/grader` directory. Each practice includes several test suites, each containing multiple test cases.

If any test case fails, the corresponding test suite will be marked in red in the report.