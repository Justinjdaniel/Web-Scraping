import pytest
import sys
import os

# Add the examples project directory to the Python path to allow importing the spider
# This needs to point to the directory containing 'scrapy_project' module
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../../examples/python/scrapy_example/scrapy_project')))

from scrapy_project.spiders.quotes_spider import QuotesSpiderSpider
from scrapy.http import HtmlResponse, Request

# Sample HTML mimicking the structure of quotes.toscrape.com
SAMPLE_HTML_CONTENT_SCRAPY = """
<html>
<head><title>Quotes to Scrape</title></head>
<body>
    <div class="quote">
        <span class="text">Life is what happens to you while you're busy making other plans.</span>
        <small class="author">John Lennon</small>
        <div class="tags">
            <a class="tag">life</a>
            <a class="tag">plans</a>
        </div>
    </div>
    <div class="quote">
        <span class="text">It is never too late to be what you might have been.</span>
        <small class="author">George Eliot</small>
         <div class="tags">
            <a class="tag">life</a>
            <a class="tag">dreams</a>
        </div>
    </div>
    <nav>
        <li class="next">
            <a href="/page/2/">Next <span class="arrow">→</span></a>
        </li>
    </nav>
</body>
</html>
"""

SAMPLE_HTML_CONTENT_SCRAPY_LAST_PAGE = """
<html>
<head><title>Quotes to Scrape</title></head>
<body>
    <div class="quote">
        <span class="text">The only way to do great work is to love what you do.</span>
        <small class="author">Steve Jobs</small>
    </div>
    <nav>
        <!-- No next page link -->
    </nav>
</body>
</html>
"""

def test_quotes_spider_parse():
    """
    Tests the Scrapy QuotesSpiderSpider's parse method for item extraction and pagination.
    """
    spider = QuotesSpiderSpider()

    # Create a mock HtmlResponse
    mock_response = HtmlResponse(
        url="http://quotes.toscrape.com/page/1/",
        body=SAMPLE_HTML_CONTENT_SCRAPY,
        encoding='utf-8'
    )

    # Call the parse method
    results = list(spider.parse(mock_response)) # Convert generator to list

    # Expected items (dictionaries, as yielded by the spider)
    expected_items = [
        {'text': "Life is what happens to you while you're busy making other plans.", 'author': "John Lennon"},
        {'text': "It is never too late to be what you might have been.", 'author': "George Eliot"},
    ]

    # Check for yielded items
    items_found = [result for result in results if not isinstance(result, Request)]
    assert len(items_found) == 2
    assert items_found == expected_items

    # Check for yielded request for the next page
    requests_found = [result for result in results if isinstance(result, Request)]
    assert len(requests_found) == 1
    next_page_request = requests_found[0]
    assert next_page_request.url == "http://quotes.toscrape.com/page/2/" # Spider uses response.follow which resolves relative URLs
    assert next_page_request.callback == spider.parse # Check if it's calling the same parse method

def test_quotes_spider_parse_last_page():
    """
    Tests the Scrapy QuotesSpiderSpider's parse method on what would be a last page (no next link).
    """
    spider = QuotesSpiderSpider()

    mock_response_last_page = HtmlResponse(
        url="http://quotes.toscrape.com/page/10/", # Assuming page 10 is the last
        body=SAMPLE_HTML_CONTENT_SCRAPY_LAST_PAGE,
        encoding='utf-8'
    )

    results = list(spider.parse(mock_response_last_page))

    expected_items_last_page = [
        {'text': "The only way to do great work is to love what you do.", 'author': "Steve Jobs"},
    ]

    items_found = [result for result in results if not isinstance(result, Request)]
    assert len(items_found) == 1
    assert items_found == expected_items_last_page

    # Ensure no next page request is yielded
    requests_found = [result for result in results if isinstance(result, Request)]
    assert len(requests_found) == 0

# Note: To run these tests, you typically need pytest:
# pip install pytest
# Then navigate to the root of the repository and run:
# pytest tests/python/test_scrapy_example.py
#
# The sys.path.insert is a common way to make the spider module importable.
# For more complex Scrapy projects, pytest-scrapy can be useful as it provides
# fixtures and helpers, but for this basic test of a parse method with a mock response,
# it's not strictly required.
print("Relative path for Scrapy spider import:", os.path.abspath(os.path.join(os.path.dirname(__file__), '../../examples/python/scrapy_example/scrapy_project')))
