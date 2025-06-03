# Selenium and Beautiful Soup Example: Scraping JavaScript-Loaded Quotes

This example demonstrates how to use Selenium to load a web page that relies on JavaScript to render its content, and then use Beautiful Soup to parse the loaded HTML and extract data.

The script targets [http://quotes.toscrape.com/js/](http://quotes.toscrape.com/js/), a version of the quotes website where quotes are loaded dynamically using JavaScript.

## How it Works

1.  **Selenium WebDriver**:
    *   Launches a Chrome web browser.
    *   Navigates to the specified URL.
    *   Waits for the JavaScript to execute and for the quote elements (identified by `div.quote`) to become present in the DOM. This ensures that the dynamically loaded content is available before attempting to parse it.
2.  **Page Source Extraction**:
    *   Once the content is loaded, Selenium retrieves the full page source, which now includes the dynamically generated HTML.
    *   The browser instance is then closed.
3.  **Beautiful Soup Parsing**:
    *   The retrieved page source is passed to Beautiful Soup for parsing.
4.  **Data Extraction**:
    *   Beautiful Soup selectors are used to find all quote elements.
    *   For each quote, the text and author are extracted.
5.  **Output**:
    *   The extracted quotes (text and author) are printed to the console as individual JSON objects.

## Prerequisites

-   Python 3.x
-   pip (Python package installer)
-   Google Chrome browser installed (or another browser if you modify the script, e.g., Firefox with `geckodriver`)

## Setup and Installation

1.  **Create a virtual environment (recommended):**
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    ```

2.  **Install dependencies:**
    Install the necessary Python libraries using pip:
    ```bash
    pip install selenium beautifulsoup4 webdriver-manager
    ```
    -   `selenium`: For browser automation.
    -   `beautifulsoup4`: For parsing HTML.
    -   `webdriver-manager`: For automatically managing browser drivers (e.g., ChromeDriver).

## Running the Script

Navigate to the directory containing the script and run:

```bash
python scrape_js_content.py
```

The script will launch a Chrome browser instance (it might be headless or visible depending on future configurations, but by default, it's often visible for a short period), load the page, extract the data, and then print the quotes to your console.

## Expected Output Format

The script will print a series of JSON objects to the console, each representing a scraped quote. Each line will be a separate JSON object.

Example:
```json
{"text": "The world as we have created it is a process of our thinking. It cannot be changed without changing our thinking.", "author": "Albert Einstein"}
{"text": "It is our choices, Harry, that show what we truly are, far more than our abilities.", "author": "J.K. Rowling"}
{"text": "There are only two ways to live your life. One is as though nothing is a miracle. The other is as though everything is a miracle.", "author": "Albert Einstein"}
...
```

## Note on WebDriver Management

This script uses `webdriver-manager` which attempts to automatically download and set up the correct ChromeDriver for your installed Chrome version. This works well in most environments.

However, in some restricted environments or if `webdriver-manager` fails, you might need to:
1.  Manually download the appropriate ChromeDriver (or GeckoDriver for Firefox) for your browser version.
2.  Ensure the driver executable is in your system's PATH, or modify the script to point directly to the driver executable path (e.g., `webdriver.Chrome(service=ChromeService(executable_path='/path/to/chromedriver'))`).
