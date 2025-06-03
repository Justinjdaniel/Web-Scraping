# Puppeteer and Cheerio Scraping Examples

This directory contains two Node.js examples demonstrating web scraping techniques:

1.  **`puppeteerScraper.js`**: Uses Puppeteer to scrape quotes from the static version of [http://quotes.toscrape.com/](http://quotes.toscrape.com/). Puppeteer is a Node library which provides a high-level API to control Chrome/Chromium over the DevTools Protocol. It's excellent for sites that require JavaScript execution, but can also be used for static sites.

2.  **`cheerioScraper.js`**: Uses Cheerio and Axios to scrape quotes from the same static site [http://quotes.toscrape.com/](http://quotes.toscrape.com/). Axios is used to fetch the HTML content, and Cheerio is used to parse and manipulate the HTML with a jQuery-like syntax. This method is very fast and efficient for static sites.

Both scripts are designed to extract quote texts and their authors.

## Prerequisites

-   Node.js (LTS version recommended, e.g., 18.x, 20.x or newer)
-   npm (Node Package Manager, comes with Node.js)

## Setup and Installation

1.  **Navigate to this example directory:**
    ```bash
    cd examples/nodejs/puppeteer_cheerio_updated
    ```

2.  **Install dependencies:**
    Run the following command to install Puppeteer, Cheerio, and Axios as listed in the `package.json` file:
    ```bash
    npm install
    ```
    **Note for Puppeteer:** When you install Puppeteer, it automatically downloads a recent version of Chromium (approx. 170MB Mac, 282MB Linux, 280MB Win) that is guaranteed to work with the API.

## Running the Scripts

### Puppeteer Example

To run the Puppeteer scraper:

```bash
node puppeteerScraper.js
```
Or using the npm script:
```bash
npm run start:puppeteer
```

### Cheerio Example

To run the Cheerio scraper:

```bash
node cheerioScraper.js
```
Or using the npm script:
```bash
npm run start:cheerio
```

Both scripts will:
- Launch (Puppeteer) or fetch (Cheerio).
- Scrape the content from `http://quotes.toscrape.com/`.
- Print the extracted quotes to the console as individual JSON objects.
- Include commented-out code for optionally saving the data to a file.

## Expected Output Format (for both scripts)

Each script will output a series of JSON objects to the console, where each object represents a scraped quote:

```json
{"text":"The world as we have created it is a process of our thinking. It cannot be changed without changing our thinking.","author":"Albert Einstein"}
{"text":"It is our choices, Harry, that show what we truly are, far more than our abilities.","author":"J.K. Rowling"}
{"text":"There are only two ways to live your life. One is as though nothing is a miracle. The other is as though everything is a miracle.","author":"Albert Einstein"}
...
```

## Notes

-   **Error Handling:** Both scripts include basic try-catch blocks for error handling during the scraping process.
-   **Headless Mode (Puppeteer):** By default, Puppeteer runs in headless mode. You can change this by modifying the `launch` options in `puppeteerScraper.js` (e.g., `launch({ headless: false })`).
-   **Static vs. Dynamic Content:**
    *   The Cheerio example is suitable for static sites where content is present in the initial HTML.
    *   The Puppeteer example, while used here on a static site, is capable of handling dynamic sites that require JavaScript execution to render content. If you were targeting `http://quotes.toscrape.com/js/`, Puppeteer would be the more appropriate choice between these two.
