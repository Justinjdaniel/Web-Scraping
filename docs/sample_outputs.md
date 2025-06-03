# Sample Outputs from Scraping Examples

This document provides sample outputs for each of the web scraping examples included in this repository. This helps illustrate what to expect when you run the scripts correctly.

For detailed instructions on setting up your environment and running each example, please refer to the [Setup Guide](setup.md) and the [Usage Guide](usage_guide.md).

---

## 1. Scrapy Example: `quotes_spider`

-   **Command (from `examples/python/scrapy_example/scrapy_project/` directory):**
    ```bash
    scrapy crawl quotes_spider -O quotes.jsonl
    ```
-   **Sample Output (from `quotes.jsonl`):**
    ```json
    {"text": "“The world as we have created it is a process of our thinking. It cannot be changed without changing our thinking.”", "author": "Albert Einstein"}
    {"text": "“It is our choices, Harry, that show what we truly are, far more than our abilities.”", "author": "J.K. Rowling"}
    {"text": "“There are only two ways to live your life. One is as though nothing is a miracle. The other is as though everything is a miracle.”", "author": "Albert Einstein"}
    ```

---

## 2. Selenium & Beautiful Soup Example: `scrape_js_content.py`

-   **Command (from `examples/python/selenium_beautifulsoup_example/` directory):**
    ```bash
    python scrape_js_content.py
    ```
-   **Sample Console Output:**
    ```json
    {"text": "“The world as we have created it is a process of our thinking. It cannot be changed without changing our thinking.”", "author": "Albert Einstein"}
    {"text": "“It is our choices, Harry, that show what we truly are, far more than our abilities.”", "author": "J.K. Rowling"}
    {"text": "“There are only two ways to live your life. One is as though nothing is a miracle. The other is as though everything is a miracle.”", "author": "Albert Einstein"}
    ```
    *(Note: The script prints one JSON object per line. The output above shows a few for brevity.)*

---

## 3. Playwright Example: `scrape_playwright.js`

-   **Command (from `examples/nodejs/playwright_example/` directory):**
    ```bash
    node scrape_playwright.js
    ```
    (After running `npm install` in that directory and `npx playwright install --with-deps` if browser binaries are missing)
-   **Sample Console Output:**
    ```json
    {"text":"“The world as we have created it is a process of our thinking. It cannot be changed without changing our thinking.”","author":"Albert Einstein"}
    {"text":"“It is our choices, Harry, that show what we truly are, far more than our abilities.”","author":"J.K. Rowling"}
    {"text":"“There are only two ways to live your life. One is as though nothing is a miracle. The other is as though everything is a miracle.”","author":"Albert Einstein"}
    ```
    *(Note: The script prints status messages and then one JSON object per line for each quote.)*

---

## 4. Puppeteer Example: `puppeteerScraper.js`

-   **Command (from `examples/nodejs/puppeteer_cheerio_updated/` directory):**
    ```bash
    node puppeteerScraper.js
    ```
    (After running `npm install` in that directory)
-   **Sample Console Output:**
    ```json
    {"text":"“The world as we have created it is a process of our thinking. It cannot be changed without changing our thinking.”","author":"Albert Einstein"}
    {"text":"“It is our choices, Harry, that show what we truly are, far more than our abilities.”","author":"J.K. Rowling"}
    {"text":"“There are only two ways to live your life. One is as though nothing is a miracle. The other is as though everything is a miracle.”","author":"Albert Einstein"}
    ```
    *(Note: The script prints status messages and then one JSON object per line for each quote.)*

---

## 5. Cheerio & Axios Example: `cheerioScraper.js`

-   **Command (from `examples/nodejs/puppeteer_cheerio_updated/` directory):**
    ```bash
    node cheerioScraper.js
    ```
    (After running `npm install` in that directory)
-   **Sample Console Output:**
    ```json
    {"text":"“The world as we have created it is a process of our thinking. It cannot be changed without changing our thinking.”","author":"Albert Einstein"}
    {"text":"“It is our choices, Harry, that show what we truly are, far more than our abilities.”","author":"J.K. Rowling"}
    {"text":"“There are only two ways to live your life. One is as though nothing is a miracle. The other is as though everything is a miracle.”","author":"Albert Einstein"}
    ```
    *(Note: The script prints status messages and then one JSON object per line for each quote.)*

---

## 6. Apify SDK Example: `run_apify_actor.js`

-   **Command (from `examples/ai_nocode_integrations/apify_sdk_example/` directory):**
    ```bash
    APIFY_TOKEN="YOUR_TOKEN" node run_apify_actor.js
    ```
    (After running `npm install` in that directory and setting your `APIFY_TOKEN` environment variable)

-   **Note on Execution**: This script requires a valid Apify API token (`APIFY_TOKEN`) to run, as it interacts with the Apify cloud platform. The output below is an *expected structure* based on the `pageFunction` defined in the script and the typical output of the `apify/web-scraper` actor. Actual execution was not performed in this documentation generation step due to the token requirement.

-   **Expected Output Structure (saved to `apify_results.json` and printed to console):**
    The output will be an array containing a single JSON object (since only one start URL is provided). This object will contain the URL, the page title, and an array of quote objects.
    ```json
    [
      {
        "url": "http://quotes.toscrape.com/",
        "title": "Quotes to Scrape",
        "quotes": [
          {
            "text": "“The world as we have created it is a process of our thinking. It cannot be changed without changing our thinking.”",
            "author": "Albert Einstein"
          },
          {
            "text": "“It is our choices, Harry, that show what we truly are, far more than our abilities.”",
            "author": "J.K. Rowling"
          },
          // ... more quotes from the page
        ]
      }
    ]
    ```
    *(The console output will show status messages followed by the formatted JSON content of each item in the main array.)*

---
