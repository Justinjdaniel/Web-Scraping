# Python Test Suite

This directory contains automated tests for the Python-based web scraping examples found in the `examples/python/` directory. The tests are written using the `pytest` framework.

## Purpose

-   **Unit Tests**: Verify the correctness of specific functions and logic within the scraping scripts (e.g., HTML parsing logic).
-   **Integration Tests**: (Optional and may be marked separately) Test the end-to-end functionality of the scraping scripts, including network interaction and browser automation if applicable. These tests are generally slower and may depend on external services or specific environment setups.

## Prerequisites

-   Python 3.x
-   pip (Python package installer)
-   Any dependencies required by the example scripts themselves (e.g., `selenium`, `beautifulsoup4`, `webdriver-manager` for the `test_selenium_beautifulsoup_example.py`). These should be installed from the respective example's `requirements.txt` or README.

## Setup and Installation

1.  **Navigate to the root of the repository.**

2.  **Install pytest:**
    If you don't have `pytest` installed, you can install it using pip:
    ```bash
    pip install pytest
    ```

3.  **Install example-specific dependencies:**
    Before running tests for a particular example, ensure you have installed its dependencies as outlined in the example's own README file. For instance, for `test_selenium_beautifulsoup_example.py`, you would need:
    ```bash
    pip install selenium beautifulsoup4 webdriver-manager
    ```

## Running the Tests

### Running All Python Tests

To run all tests located in the `tests/python/` directory and its subdirectories, navigate to the root of the repository and execute:

```bash
pytest tests/python/
```
Alternatively, you can navigate into the `tests/python` directory and run:
```bash
pytest
```
A successful run will typically display a summary of passed tests (e.g., "X passed in Y.ZZs"). If any tests fail, pytest will provide detailed error reports.

### Running Specific Test Files

To run tests from a specific file:

```bash
pytest tests/python/test_selenium_beautifulsoup_example.py
```

### Running Specific Tests by Marker (e.g., for integration tests)

If tests are marked (e.g., with `@pytest.mark.integration`), you can run specific groups:

-   Run only unit tests (assuming integration tests are marked and others are not, or unit tests are explicitly marked with `@pytest.mark.unit`):
    ```bash
    pytest -m "not integration" tests/python/
    ```
-   Run only integration tests:
    ```bash
    pytest -m integration tests/python/
    ```
    *(Note: The example `test_selenium_beautifulsoup_example.py` includes a commented-out integration test. If enabled and marked, this command would run it.)*

### Verbose Output

For more detailed output, use the `-v` flag:

```bash
pytest -v tests/python/
```

## Test Structure

-   Each example script in `examples/python/` should ideally have a corresponding test file in `tests/python/`.
-   Test files are named with the `test_` prefix (e.g., `test_my_example_script.py`).
-   Test functions within these files are also named with the `test_` prefix (e.g., `def test_specific_functionality():`).

The tests aim to ensure the reliability and correctness of the provided scraping examples.
The `test_selenium_beautifulsoup_example.py` currently focuses on unit testing the HTML parsing logic, with an optional, commented-out integration test for the full Selenium script execution.
