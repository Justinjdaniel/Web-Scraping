# Scrapy Example: Quotes Spider

This example demonstrates how to use Scrapy to build a web spider that scrapes quotes from [quotes.toscrape.com](http://quotes.toscrape.com).

The spider will:
- Extract the text of each quote.
- Extract the author of each quote.
- Follow pagination links to scrape quotes from all available pages.
- Save the scraped data into a JSON Lines file (`quotes.jsonl`).

## Prerequisites

- Python 3.x
- pip (Python package installer)

## Setup and Installation

1.  **Install Scrapy:**
    If you don't have Scrapy installed, you can install it using pip:
    ```bash
    pip install scrapy
    ```

2.  **Navigate to the project directory:**
    The spider is located within the `scrapy_project` directory.
    ```bash
    cd scrapy_project
    ```

## Running the Spider

To run the `quotes_spider` and save the output to `quotes.jsonl`, execute the following command from within the `scrapy_project` directory:

```bash
scrapy crawl quotes_spider -O quotes.jsonl
```

-   `scrapy crawl quotes_spider`: This command tells Scrapy to execute the spider named `quotes_spider`.
-   `-O quotes.jsonl`: This option specifies that the output should be saved to `quotes.jsonl`. Scrapy supports various output formats; JSON Lines (`.jsonl`) is used here, where each line is a valid JSON object representing a scraped item.

## Expected Output Format

The output file (`quotes.jsonl`) will contain a series of JSON objects, each representing a quote. Each JSON object will have the following structure:

```json
{"text": "The world as we have created it is a process of our thinking. It cannot be changed without changing our thinking.", "author": "Albert Einstein"}
{"text": "It is our choices, Harry, that show what we truly are, far more than our abilities.", "author": "J.K. Rowling"}
...
```

Each line in the `quotes.jsonl` file will be a distinct JSON object corresponding to one scraped quote.
