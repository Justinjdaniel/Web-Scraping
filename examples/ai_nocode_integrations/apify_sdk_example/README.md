# Apify SDK Example: Running the Web Scraper Actor

This example demonstrates how to use the Apify SDK (specifically, the `apify-client` for Node.js) to programmatically run an existing Apify actor, the `apify/web-scraper` (ID: `web-scraper`).

The script will configure this actor to scrape quotes from [http://quotes.toscrape.com/](http://quotes.toscrape.com/) and retrieve the results.

## How it Works

1.  **Apify Client Initialization**:
    *   The script initializes the `ApifyClient` using an API token. This token must be provided via the `APIFY_TOKEN` environment variable.
2.  **Actor Configuration**:
    *   It targets the `apify/web-scraper` actor.
    *   The `startUrls` is set to `http://quotes.toscrape.com/`.
    *   A `pageFunction` (JavaScript code executed by the actor in the browser context of the target page) is defined. This function uses jQuery-like selectors (provided by the actor's context) to extract the page title and all quotes (text and author).
3.  **Actor Execution**:
    *   The script starts the actor with the defined input.
    *   It then waits for the actor run to complete. Apify's platform handles the actual web scraping process in the cloud (including proxy rotation if configured, request management, etc.).
4.  **Results Retrieval**:
    *   Once the actor run is finished and has succeeded, the script fetches the data from the actor's default dataset.
5.  **Output**:
    *   The retrieved items (each containing the page URL, title, and an array of quotes) are printed to the console as formatted JSON objects.
    *   The script also saves the full results to a local file named `apify_results.json`.

## Prerequisites

-   Node.js (LTS version recommended)
-   npm (Node Package Manager, comes with Node.js)
-   An Apify account (a free account is sufficient for this example).

## Setup and Installation

1.  **Navigate to the example directory:**
    ```bash
    cd examples/ai_nocode_integrations/apify_sdk_example
    ```

2.  **Install dependencies:**
    Run the following command to install the `apify-client`:
    ```bash
    npm install
    ```
    *(This reads the `apify-client` dependency from the `package.json` file and installs it.)*

3.  **Set up Apify API Token:**
    *   Log in to your Apify account at [https://console.apify.com/](https://console.apify.com/).
    *   Navigate to **Settings > Integrations** (or look for API Tokens section).
    *   Copy your **Personal API token**.
    *   Set this token as an environment variable named `APIFY_TOKEN`. You can do this in your terminal session:
        ```bash
        export APIFY_TOKEN="YOUR_COPIED_API_TOKEN"
        ```
        (On Windows, use `set APIFY_TOKEN=YOUR_COPIED_API_TOKEN` in Command Prompt or `$env:APIFY_TOKEN="YOUR_COPIED_API_TOKEN"` in PowerShell).
        For persistent storage, consider adding it to your shell's profile file (e.g., `.bashrc`, `.zshrc`) or using a `.env` file with a library like `dotenv` (not included in this basic example).

## Running the Script

Once the `APIFY_TOKEN` environment variable is set and dependencies are installed, run the script:

```bash
node run_apify_actor.js
```

The script will:
-   Connect to Apify.
-   Start the `apify/web-scraper` actor with your configuration.
-   Poll for completion.
-   Print status updates and eventually the results to the console.
-   Save the results to `apify_results.json`.

## Expected Output Format

The script will print status messages during its execution. The final data output to the console (and saved in `apify_results.json`) will be an array of JSON objects, where each object corresponds to the result from a scraped page (in this case, only one page is scraped by default).

Example console output for one item:
```json
{
  "url": "http://quotes.toscrape.com/",
  "title": "Quotes to Scrape",
  "quotes": [
    {
      "text": "The world as we have created it is a process of our thinking. It cannot be changed without changing our thinking.",
      "author": "Albert Einstein"
    },
    {
      "text": "It is our choices, Harry, that show what we truly are, far more than our abilities.",
      "author": "J.K. Rowling"
    },
    // ... more quotes from the page
  ]
}
// ... (potentially more items if multiple start URLs or deep crawling was configured)
```
The `apify_results.json` file will contain the full array of these items.

## Note

This example showcases how to programmatically control and integrate with a powerful cloud-based web scraping service (Apify). The actual scraping is performed by Apify's infrastructure, leveraging their specialized actors. This approach is useful for offloading scraping tasks, managing proxies, scaling, and utilizing pre-built or custom scraping logic hosted on the Apify platform.
The `apify/web-scraper` actor itself is highly configurable; this script uses a very basic setup. You can extend the `actorInput` to include rules for crawling multiple pages, more complex data extraction logic, specific proxy configurations, etc., as per the actor's documentation.
