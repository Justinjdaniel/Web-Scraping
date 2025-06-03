# Playwright Example: Scraping JavaScript-Loaded Quotes

This example demonstrates how to use Playwright with Node.js to scrape quotes from a website that loads its content dynamically using JavaScript. The target site is [http://quotes.toscrape.com/js/](http://quotes.toscrape.com/js/).

## How it Works

1.  **Playwright Setup**:
    *   Launches a browser instance (Chromium by default, but Playwright supports Firefox and WebKit).
    *   Creates a new browser page.
2.  **Navigation & Content Loading**:
    *   Navigates to the specified URL.
    *   Playwright's auto-waiting mechanisms ensure that the script waits for JavaScript-generated content to appear. The script specifically waits for `div.quote` elements to be present.
3.  **Data Extraction**:
    *   Once the page and its dynamic content are loaded, Playwright uses its built-in locators and evaluation functions (`page.evaluate()`) to access the DOM.
    *   It selects all quote elements and extracts the text and author for each.
4.  **Output**:
    *   The extracted quotes (text and author) are printed to the console as individual JSON objects.
    *   The script includes commented-out code showing how to save the data to a JSON file.
5.  **Browser Teardown**:
    *   Closes the browser instance.

## Prerequisites

-   Node.js (LTS version recommended, e.g., 18.x, 20.x or newer as per Playwright system requirements for future versions)
-   npm (Node Package Manager, comes with Node.js)

## Setup and Installation

1.  **Navigate to the example directory:**
    ```bash
    cd examples/nodejs/playwright_example
    ```

2.  **Install dependencies:**
    Run the following command to install Playwright. This command will also download the default browser binaries (Chromium, Firefox, WebKit) needed by Playwright.
    ```bash
    npm install
    ```
    *(This reads the `playwright` dependency from the `package.json` file and installs it.)*

    If you want to install a specific browser or ensure all are downloaded, you can run:
    ```bash
    npx playwright install --with-deps
    ```
    This step is often handled by `npm install playwright` automatically but can be run manually if needed.

## Running the Script

To execute the scraper:

```bash
node scrape_playwright.js
```
Alternatively, you can use the npm script defined in `package.json`:
```bash
npm start
```

The script will launch a headless browser, perform the scraping, and print the extracted data to the console.

## Expected Output Format

The script will output a series of JSON objects to the console, where each object represents a scraped quote:

```json
{"text":"The world as we have created it is a process of our thinking. It cannot be changed without changing our thinking.","author":"Albert Einstein"}
{"text":"It is our choices, Harry, that show what we truly are, far more than our abilities.","author":"J.K. Rowling"}
{"text":"There are only two ways to live your life. One is as though nothing is a miracle. The other is as though everything is a miracle.","author":"Albert Einstein"}
...
```

## Notes

-   **Headless Mode:** By default, Playwright runs in headless mode (no browser UI is visible). You can change this by modifying the `launch` options in `scrape_playwright.js` (e.g., `launch({ headless: false })`).
-   **Browser Choice:** The script defaults to Chromium. Playwright can also use Firefox or WebKit. To use a different browser, you would modify `playwright.chromium.launch()` to `playwright.firefox.launch()` or `playwright.webkit.launch()`. Ensure the respective browser binaries are installed by Playwright.
-   **Playwright Test Runner:** For more complex testing scenarios, Playwright offers its own test runner (`@playwright/test`) which provides features like running tests across multiple browsers easily (e.g., `npx playwright test --browser=firefox`). This example script, however, is a standalone Node.js application and does not use the Playwright test runner.
