# Setup and Installation Guide

This guide provides instructions for setting up your environment to run the web scraping examples and tests in this repository.

## General Prerequisites

Before you begin, ensure you have the following installed on your system:

-   **Python**: Version 3.x (Python 3.8+ recommended for most examples). You can download it from [python.org](https://www.python.org/downloads/).
-   **pip**: The Python package installer. It usually comes with Python installations.
-   **Node.js**: LTS version (e.g., 18.x, 20.x or newer). Download from [nodejs.org](https://nodejs.org/).
-   **npm**: Node Package Manager. It comes with Node.js.

## Python Setup

### 1. Virtual Environments (Recommended)

It's highly recommended to use virtual environments for Python projects to manage dependencies in isolation.

```bash
# Create a virtual environment (e.g., named 'venv')
python -m venv venv

# Activate the virtual environment
# On macOS and Linux:
source venv/bin/activate
# On Windows:
# venv\Scripts\activate
```

All Python `pip install` commands below should be run within an activated virtual environment.

### 2. Installing Python Dependencies

A `requirements.txt` file is provided at the root of the repository to install all common Python dependencies for the examples and tests. From the root of the repository, run:

```bash
pip install -r requirements.txt
```
This will install libraries such as `scrapy`, `selenium`, `beautifulsoup4`, `webdriver-manager`, and `pytest`.

### 3. Tool-Specific Python Setup

-   **Scrapy**:
    -   Installation is handled by `pip install -r requirements.txt`.
    -   The Scrapy example is a self-contained project in `examples/python/scrapy_example/scrapy_project/`.

-   **Selenium & Beautiful Soup**:
    -   Dependencies (`selenium`, `beautifulsoup4`, `webdriver-manager`) are handled by `pip install -r requirements.txt`.
    -   **WebDriver Management**:
        -   The Selenium example uses `webdriver-manager` to automatically download and manage ChromeDriver. Ensure Google Chrome is installed.
        -   If `webdriver-manager` fails or in restricted environments, you might need to manually download the appropriate WebDriver for your browser (e.g., ChromeDriver for Chrome, GeckoDriver for Firefox) and ensure its executable is in your system's PATH or explicitly path it in the script, as detailed in the example's README.

## Node.js Setup

### 1. Installing Node.js Dependencies

For Node.js examples, dependencies are managed by `package.json` files.

-   **Root `package.json`**: The root `package.json` lists common development dependencies (like `jest`) and all runtime dependencies for the examples. Install these by running `npm install` in the **root of the repository**:
    ```bash
    # From the root of the repository
    npm install
    ```
    This single command should install `playwright`, `puppeteer`, `cheerio`, `axios`, `apify-client`, and `jest`. The individual `package.json` files in example subdirectories are primarily for organizational purposes or if you wish to run them in complete isolation, but the root `package.json` aims to provide a central place for all Node.js dependencies.

### 2. Tool-Specific Node.js Setup

-   **Playwright**:
    -   When `playwright` is installed via `npm install` (from the root `package.json`), it automatically downloads browser binaries for Chromium, Firefox, and WebKit.
    -   To ensure all browsers are installed or to update them, you can run from the repository root:
        ```bash
        npx playwright install --with-deps
        ```

-   **Puppeteer**:
    -   When `puppeteer` is installed via `npm install` (from the root `package.json`), it automatically downloads a recent version of Chromium.

-   **Cheerio with Axios**:
    -   `axios` is used for fetching HTML, and `cheerio` for parsing. These are installed via the root `npm install`.

-   **Apify SDK (`apify-client`)**:
    -   Installed via the root `npm install`.
    -   Requires an Apify account and an API token.
    -   Sign up at [console.apify.com](https://console.apify.com/).
    -   Find your API token in **Settings > Integrations**.
    -   Set the `APIFY_TOKEN` environment variable. For example:
        ```bash
        export APIFY_TOKEN="YOUR_COPIED_API_TOKEN"
        # On Windows (Command Prompt): set APIFY_TOKEN=YOUR_COPIED_API_TOKEN
        # On Windows (PowerShell): $env:APIFY_TOKEN="YOUR_COPIED_API_TOKEN"
        ```
        Refer to the Apify example's README for more details.

## Testing Setup

### Python (pytest)

1.  **Install pytest**:
    This is handled by `pip install -r requirements.txt`.
2.  **Running Python Tests**:
    Navigate to the repository root and run:
    ```bash
    pytest tests/python/
    ```
    Refer to `tests/python/README.md` for more details.

### Node.js (Jest)

1.  **Install Jest**:
    This is handled by `npm install` from the root `package.json` (as a devDependency).
2.  **Running Node.js Tests**:
    Navigate to the repository root and use the npm script:
    ```bash
    npm run test:nodejs
    ```
    This executes `jest tests/nodejs`. Refer to `tests/nodejs/README.md` for more details.

## Running Examples

For detailed instructions on how to run specific examples, please consult the `README.md` file located within each example's directory (e.g., `examples/python/scrapy_example/README.md`). These READMEs provide specific commands and context for their respective examples.
