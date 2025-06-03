# Node.js Test Suite (Jest)

This directory contains automated tests for the Node.js-based web scraping examples found in the `examples/nodejs/` directory. The tests are written using the [Jest](https://jestjs.io/) framework.

## Purpose

-   **Unit Tests**: Verify the correctness of specific functions and logic within the Node.js scraping scripts. This often involves mocking external dependencies (like `playwright`, `puppeteer`, `axios`, `cheerio`) to isolate the code being tested and avoid actual network calls or browser launching during unit tests.
-   **Focus on Logic**: The primary goal is to ensure the data extraction, transformation, and handling logic within the scripts work as expected given mock inputs.

## Prerequisites

-   Node.js (LTS version recommended)
-   npm (Node Package Manager, comes with Node.js)

## Setup and Installation

1.  **Navigate to the root of the repository.**

2.  **Install Jest (if not already installed via root `package.json`):**
    Jest should be listed as a `devDependency` in the root `package.json` file. If you are setting up the project for the first time or if it's missing, install it by running from the root directory:
    ```bash
    npm install --save-dev jest
    ```
    *(Running `npm install` in the root directory should also install Jest based on the `devDependencies` in `package.json`)*

3.  **Install example-specific dependencies:**
    Before running tests for a particular example, ensure you have installed its dependencies as outlined in the example's own README file (e.g., by running `npm install` within that example's directory, like `examples/nodejs/playwright_example/`).

## Running the Node.js Tests

To run all Jest tests located in the `tests/nodejs/` directory, navigate to the **root of the repository** and use the npm script defined in the root `package.json`:

```bash
npm run test:nodejs
```

This command will typically execute `jest tests/nodejs`.

Alternatively, you can run Jest directly using `npx`:

```bash
npx jest tests/nodejs
```
A successful run will typically display "PASS" messages for each test suite and a summary like "Test Suites: X passed, X total" and "Tests:       Y passed, Y total". If any tests fail, Jest will provide detailed error reports.

### Running Specific Test Files or Suites

-   To run tests from a specific file:
    ```bash
    npx jest tests/nodejs/playwright_example.test.js
    ```
-   To run a specific test suite or test case by name (if you have `it` or `describe` blocks with unique names):
    ```bash
    npx jest -t "should launch browser, navigate, and extract quotes" tests/nodejs/playwright_example.test.js
    ```

### Watch Mode

For interactive development, you can run Jest in watch mode, which automatically re-runs tests when files change:

```bash
npx jest tests/nodejs --watch
```

## Test Structure

-   Test files are typically named with a `.test.js` or `.spec.js` suffix (e.g., `playwright_example.test.js`).
-   Tests use Jest's global functions like `describe`, `test` (or `it`), and `expect` for structuring and assertions.
-   Mocking is heavily utilized (e.g., `jest.mock('module_name')`) to prevent actual browser launching or HTTP requests during unit tests, focusing instead on the script's internal logic.

The tests aim to ensure the reliability and correctness of the provided Node.js scraping examples.
The `playwright_example.test.js` demonstrates how to mock the `playwright` library to test the scraping logic without actual browser interaction. Similar principles apply to testing other Node.js examples like those using Puppeteer or Cheerio.
