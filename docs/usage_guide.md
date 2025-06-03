# Web Scraping Examples: Usage Guide

This guide provides instructions on how to run the various web scraping examples included in this repository. Each example demonstrates a different tool or technique for web data extraction.
To see what the output of each script should look like, please refer to the [Sample Outputs Document](sample_outputs.md).

## General Setup

Before running any example, please ensure you have followed the instructions in the [Setup and Installation Guide](setup.md) to install all necessary prerequisites, Python dependencies, and Node.js dependencies.

**Python Examples**: Remember to activate your Python virtual environment if you created one.
**Node.js Examples**: Ensure you have run `npm install` in the root directory and, if specified, within the individual example's directory to install all required packages.

---

## 1. Scrapy Example: Quotes Spider

-   **Purpose**: Demonstrates building a web spider with the Scrapy framework to scrape quotes from a static website (`quotes.toscrape.com`) and handle pagination.
-   **Path**: `examples/python/scrapy_example/scrapy_project/`
-   **How to Run**:
    1.  Navigate to the Scrapy project directory:
        ```bash
        cd examples/python/scrapy_example/scrapy_project
        ```
    2.  Run the spider, saving output to `quotes.jsonl`:
        ```bash
        scrapy crawl quotes_spider -O quotes.jsonl
        ```
-   **Expected Output**: A file named `quotes.jsonl` will be created in the `scrapy_project` directory. Each line in this file will be a JSON object representing a scraped quote, containing `text` and `author` keys.
    ```json
    {"text": "The world as we have created it is a process of our thinking. It cannot be changed without changing our thinking.", "author": "Albert Einstein"}
    {"text": "It is our choices, Harry, that show what we truly are, far more than our abilities.", "author": "J.K. Rowling"}
    ...
    ```
-   **Typical Use Cases**:
    -   Scraping large amounts of data from multiple pages or entire websites.
    -   Projects requiring structured data extraction with well-defined item schemas.
    -   Scenarios needing asynchronous request handling for speed and efficiency.
    -   When built-in features like proxy management, user-agent rotation, and robust error handling are beneficial.
    -   Suitable for both static and, with additional configuration (e.g., Splash, Selenium middleware), dynamic websites.

---

## 2. Selenium & Beautiful Soup Example: Scraping JavaScript-Loaded Quotes

-   **Purpose**: Shows how to use Selenium to automate a web browser, load a page that renders content using JavaScript (`quotes.toscrape.com/js/`), and then use Beautiful Soup to parse the dynamically loaded HTML.
-   **Path**: `examples/python/selenium_beautifulsoup_example/`
-   **How to Run**:
    1.  Ensure Python dependencies are installed (see `setup.md` or the example's README).
    2.  Navigate to the example directory:
        ```bash
        cd examples/python/selenium_beautifulsoup_example
        ```
    3.  Run the script:
        ```bash
        python scrape_js_content.py
        ```
-   **Expected Output**: The script will print a series of JSON objects to the console, each representing a scraped quote with `text` and `author` keys.
    ```json
    {"text": "The world as we have created it is a process of our thinking. It cannot be changed without changing our thinking.", "author": "Albert Einstein"}
    {"text": "It is our choices, Harry, that show what we truly are, far more than our abilities.", "author": "J.K. Rowling"}
    ...
    ```
-   **Typical Use Cases**:
    -   Scraping websites where content is loaded or modified by client-side JavaScript.
    -   Automating interactions with web pages (e.g., clicking buttons, filling forms, scrolling) to access data.
    -   When you need to see the page as a user would in a real browser.
    -   Useful when other methods fail due to heavy reliance on JavaScript for content rendering.

---

## 3. Playwright Example: Scraping JavaScript-Loaded Quotes (Node.js)

-   **Purpose**: Demonstrates using Playwright with Node.js to automate a browser and scrape quotes from a JavaScript-heavy site (`quotes.toscrape.com/js/`).
-   **Path**: `examples/nodejs/playwright_example/`
-   **How to Run**:
    1.  Ensure Node.js dependencies are installed (run `npm install` in this directory if you haven't from the root).
    2.  Navigate to the example directory:
        ```bash
        cd examples/nodejs/playwright_example
        ```
    3.  Run the script (or use `npm start` as defined in its `package.json`):
        ```bash
        node scrape_playwright.js
        ```
-   **Expected Output**: Similar to the Selenium example, this script will print JSON objects for each quote (text and author) to the console.
    ```json
    {"text":"The world as we have created it is a process of our thinking. It cannot be changed without changing our thinking.","author":"Albert Einstein"}
    {"text":"It is our choices, Harry, that show what we truly are, far more than our abilities.","author":"J.K. Rowling"}
    ...
    ```
-   **Typical Use Cases**:
    -   Modern alternative to Selenium for browser automation, often praised for speed and reliability.
    -   Scraping dynamic websites, Single Page Applications (SPAs).
    -   Cross-browser testing and automation (Chromium, Firefox, WebKit with one API).
    -   Features like auto-waits, network interception, and browser contexts make it powerful for complex scenarios.

---

## 4. Puppeteer Example: Scraping Static Quotes (Node.js)

-   **Purpose**: Uses Puppeteer (a Node.js library for Chrome/Chromium automation) to scrape quotes from the static version of `quotes.toscrape.com/`. While Puppeteer can handle JS-heavy sites, this example targets a static one to show its basic usage.
-   **Path**: `examples/nodejs/puppeteer_cheerio_updated/`
-   **How to Run**:
    1.  Ensure Node.js dependencies are installed (run `npm install` in this directory if you haven't from the root).
    2.  Navigate to the example directory:
        ```bash
        cd examples/nodejs/puppeteer_cheerio_updated
        ```
    3.  Run the script (or use `npm run start:puppeteer` as defined in its `package.json`):
        ```bash
        node puppeteerScraper.js
        ```
-   **Expected Output**: JSON objects for each quote (text and author) printed to the console.
    ```json
    {"text":"The world as we have created it is a process of our thinking. It cannot be changed without changing our thinking.","author":"Albert Einstein"}
    ...
    ```
-   **Typical Use Cases**:
    -   Automating Chrome/Chromium for scraping, testing, or generating screenshots/PDFs.
    -   Scraping dynamic websites and SPAs (though this example uses a static site).
    -   When fine-grained control over Chrome DevTools Protocol is needed.
    -   Strong in the Node.js ecosystem for Chrome-centric automation.

---

## 5. Cheerio & Axios Example: Scraping Static Quotes (Node.js)

-   **Purpose**: Demonstrates fetching HTML from a static site (`quotes.toscrape.com/`) using `axios` and then parsing it with `cheerio` (a fast, jQuery-like HTML parser for Node.js).
-   **Path**: `examples/nodejs/puppeteer_cheerio_updated/`
-   **How to Run**:
    1.  Ensure Node.js dependencies are installed (run `npm install` in this directory if you haven't from the root).
    2.  Navigate to the example directory:
        ```bash
        cd examples/nodejs/puppeteer_cheerio_updated
        ```
    3.  Run the script (or use `npm run start:cheerio` as defined in its `package.json`):
        ```bash
        node cheerioScraper.js
        ```
-   **Expected Output**: JSON objects for each quote (text and author) printed to the console.
    ```json
    {"text":"The world as we have created it is a process of our thinking. It cannot be changed without changing our thinking.","author":"Albert Einstein"}
    ...
    ```
-   **Typical Use Cases**:
    -   Very fast and efficient scraping of static websites where JavaScript execution is not needed.
    -   Server-side HTML manipulation and parsing.
    -   When a lightweight, jQuery-like syntax for DOM traversal is preferred in a Node.js environment.

---

## 6. Apify SDK Example: Running a Cloud Actor (Node.js)

-   **Purpose**: Shows how to use the Apify SDK (`apify-client`) in Node.js to programmatically run an existing Apify actor (`apify/web-scraper`) in the cloud. This example configures the actor to scrape `quotes.toscrape.com/`.
-   **Path**: `examples/ai_nocode_integrations/apify_sdk_example/`
-   **How to Run**:
    1.  Ensure Node.js dependencies are installed (run `npm install` in this directory if you haven't from the root).
    2.  Set your Apify API token as an environment variable (see the example's README or `docs/setup.md`).
    3.  Navigate to the example directory:
        ```bash
        cd examples/ai_nocode_integrations/apify_sdk_example
        ```
    4.  Run the script:
        ```bash
        node run_apify_actor.js
        ```
-   **Expected Output**: The script will log status updates and then print the scraped data (which includes the URL, page title, and an array of quotes) to the console as formatted JSON. It will also save the results to `apify_results.json`.
    ```json
    {
      "url": "http://quotes.toscrape.com/",
      "title": "Quotes to Scrape",
      "quotes": [
        {
          "text": "The world as we have created it is a process of our thinking. It cannot be changed without changing our thinking.",
          "author": "Albert Einstein"
        },
        // ... more quotes
      ]
    }
    ```
-   **Typical Use Cases**:
    -   Offloading scraping tasks to a scalable cloud infrastructure.
    -   Utilizing Apify's ecosystem of pre-built actors or deploying custom actors.
    -   Managing proxies, scheduling, and data storage through the Apify platform.
    -   Integrating web scraping into larger applications via API calls.
    -   When you need robust, managed scraping solutions without handling the infrastructure yourself.

---

For more detailed setup instructions for each tool and general prerequisites, please refer to the [Setup and Installation Guide](setup.md).
For information on the tools themselves and their comparative strengths, see the [Tool Comparison Report](tool_comparison.md).
