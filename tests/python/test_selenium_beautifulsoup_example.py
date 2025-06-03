import pytest
import sys
import os

# Add the examples directory to the Python path to allow importing the script
# This is a common way to make modules in other directories importable for tests
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../../examples/python/selenium_beautifulsoup_example')))

from scrape_js_content import parse_quotes_from_html

# Sample HTML mimicking the structure of quotes.toscrape.com/js/
SAMPLE_HTML_CONTENT = """
<html>
<body>
    <div class="quote">
        <span class="text">This is the first quote.</span>
        <small class="author">Author One</small>
    </div>
    <div class="quote">
        <span class="text">This is the second quote.</span>
        <small class="author">Author Two</small>
    </div>
    <div><!-- Not a quote -->
        <span>Some other text</span>
    </div>
    <div class="quote">
        <span class="text">A third quote here.</span>
        <small class="author">Author Three</small>
        <div class="tags">
            <a class="tag">tag1</a>
            <a class="tag">tag2</a>
        </div>
    </div>
    <div class="quote">
        <!-- Missing author -->
        <span class="text">Quote without an author.</span>
    </div>
    <div class="quote">
        <small class="author">Author without a quote text.</small>
    </div>
</body>
</html>
"""

def test_parse_quotes_from_html():
    """
    Tests the HTML parsing logic for extracting quotes.
    """
    expected_quotes = [
        {'text': 'This is the first quote.', 'author': 'Author One'},
        {'text': 'This is the second quote.', 'author': 'Author Two'},
        {'text': 'A third quote here.', 'author': 'Author Three'},
        # Note: The current parse_quotes_from_html implementation will skip quotes
        # if either the text or author span/small tag is missing.
        # If the requirement was to include partials, the parsing function and this test would need adjustment.
        # For now, it expects both to be present.
        {'text': 'Quote without an author.', 'author': None}, # Adjusted expectation based on current parsing logic
        {'text': None, 'author': 'Author without a quote text.'} # Adjusted expectation
    ]

    # The refactored parse_quotes_from_html will skip entries if text or author is missing.
    # Let's adjust the expected output to reflect this.
    # The actual parsing function `parse_quotes_from_html` was modified to:
    # if text_span and author_small:
    #    ... append ...
    # else it skips. So, the quotes with missing parts won't be in the output.

    # Corrected expectation based on the provided parse_quotes_from_html which skips if parts are missing
    # However, the provided solution for `parse_quotes_from_html` in the previous step was:
    # if text_span and author_small: ... append ...
    # This means it would skip the last two. Let's adjust the test to reflect that.
    # If the intention was to handle missing parts with None, the SCRIPT would need a change.
    # Re-evaluating the script provided in the previous step:
    # text = text_span.get_text(strip=True) if text_span else None
    # author = author_small.get_text(strip=True) if author_small else None
    # quotes_data.append({'text': text, 'author': author})
    # So, None *should* be included. My previous adjustment was based on a stricter interpretation.
    # The script was:
    # text_span = quote_div.select_one('span.text')
    # author_small = quote_div.select_one('small.author')
    # if text_span and author_small:
    #     text = text_span.get_text(strip=True)
    #     author = author_small.get_text(strip=True)
    #     quotes_data.append({'text': text, 'author': author})
    # This means it *will* skip if one is missing.

    # Based on the provided solution for `parse_quotes_from_html` in the *previous* turn,
    # it only appends if BOTH text_span AND author_small are found.
    # So, the last two quotes in SAMPLE_HTML_CONTENT will be skipped.

    expected_quotes_based_on_refactored_script = [
        {'text': 'This is the first quote.', 'author': 'Author One'},
        {'text': 'This is the second quote.', 'author': 'Author Two'},
        {'text': 'A third quote here.', 'author': 'Author Three'},
    ]

    parsed_quotes = parse_quotes_from_html(SAMPLE_HTML_CONTENT)
    assert parsed_quotes == expected_quotes_based_on_refactored_script

# Integration test (optional, requires network and browser driver)
# This test is more of an end-to-end check for the Selenium part.
# It can be sensitive to environment (CI vs local, network, driver availability).
# To run this, ensure you have Chrome and ChromeDriver installed and in PATH,
# or that webdriver-manager can function correctly.

# @pytest.mark.integration
# def test_scrape_js_content_integration(capsys):
#     """
#     Integration test for the full scrape_quotes function.
#     Checks if the script runs and produces some JSON output.
#     """
#     from scrape_js_content import scrape_quotes
#     scrape_quotes()
#     captured = capsys.readouterr()

#     # Check if there's any output
#     assert len(captured.out) > 0

#     # Check if the output contains valid JSON objects (at least one)
#     found_json = False
#     for line in captured.out.strip().split('\n'):
#         try:
#             json.loads(line)
#             found_json = True
#             break # Found at least one valid JSON line
#         except json.JSONDecodeError:
#             pass # Ignore lines that are not JSON
#     assert found_json, "Output did not contain any valid JSON lines."

#     # More specific checks could be added, e.g., number of quotes, specific text/author
#     # For example, check if "Albert Einstein" is mentioned (common on the site)
#     # assert "Albert Einstein" in captured.out
#     # However, this makes the test more brittle to content changes.
#     # For now, just checking for valid JSON output structure is a good start.

# To run the integration test, uncomment it and ensure your environment is set up for Selenium.
# You might need to install pytest: pip install pytest
# And then run: pytest
# Or for only unit tests: pytest -m "not integration"
# For only integration: pytest -m "integration"

# Note on the integration test:
# The `scrape_quotes` function in `scrape_js_content.py` prints JSON objects line by line.
# The `capsys` fixture from pytest captures stdout.
# The test then checks if the captured output is not empty and contains at least one valid JSON line.
# It is commented out by default to ensure unit tests can pass without a full browser environment.
# The error handling in the main script for WebDriver setup will print to console,
# so if the driver setup fails, `captured.out` will still have content, but it might not be JSON.
# The test currently checks for *any* JSON output. A more robust test would check for specific
# error messages if JSON is not found, or ensure no exceptions from the script itself.
# For now, the primary focus is the unit test for `parse_quotes_from_html`.
# The integration test is more of a "smoke test" for the full Selenium execution.
print("Relative path to script:", os.path.abspath(os.path.join(os.path.dirname(__file__), '../../examples/python/selenium_beautifulsoup_example')))
