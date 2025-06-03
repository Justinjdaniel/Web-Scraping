import json
from selenium import webdriver
from selenium.webdriver.chrome.service import Service as ChromeService
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
from bs4 import BeautifulSoup

def scrape_quotes():
    """
    Scrapes quotes from http://quotes.toscrape.com/js/ using Selenium and Beautiful Soup.
    """
    # Setup Selenium WebDriver
    # Using webdriver-manager to automatically download and manage ChromeDriver
    try:
        options = webdriver.ChromeOptions()
        options.add_argument('--headless')
        options.add_argument('--no-sandbox')
        options.add_argument('--disable-dev-shm-usage')
        # The following line might be needed if Chrome/ChromeDriver are installed in non-standard locations
        # or if webdriver-manager has issues finding them in some environments.
        # For now, rely on webdriver-manager's default behavior.
        # options.binary_location = "/usr/bin/google-chrome" # Example, adjust if needed

        driver = webdriver.Chrome(service=ChromeService(ChromeDriverManager().install()), options=options)
    except Exception as e:
        print(f"Error setting up WebDriver: {e}")
        print("Please ensure Chrome is installed and accessible.")
        print("You might need to manually install ChromeDriver and ensure it's in your PATH if webdriver-manager fails.")
        return

    url = "http://quotes.toscrape.com/js/"
    quotes_data = []

    try:
        driver.get(url)

        # Wait for the quotes to be loaded (e.g., wait for the first div with class 'quote' to be present)
        # Increased timeout for potentially slower CI environments
        WebDriverWait(driver, 20).until(
            EC.presence_of_all_elements_located((By.CSS_SELECTOR, "div.quote"))
        )

        # Get page source after JavaScript has loaded content
        page_source = driver.page_source

    finally:
        driver.quit()

    # Parse the page source with Beautiful Soup
    quotes_data = parse_quotes_from_html(page_source)

    # Print quotes as JSON
    for quote in quotes_data:
        print(json.dumps(quote))

    # Optionally, save to a file
    # with open('js_quotes.json', 'w') as f:
    #     json.dump(quotes_data, f, indent=2)
    # print(f"\nSuccessfully scraped {len(quotes_data)} quotes and saved to js_quotes.json")

def parse_quotes_from_html(html_content):
    """
    Parses HTML content and extracts quotes using Beautiful Soup.
    Args:
        html_content (str): The HTML content as a string.
    Returns:
        list: A list of dictionaries, where each dictionary contains 'text' and 'author'.
    """
    soup = BeautifulSoup(html_content, 'html.parser')
    quotes_data = []
    for quote_div in soup.select('div.quote'):
        text_span = quote_div.select_one('span.text')
        author_small = quote_div.select_one('small.author')

        # Ensure both elements exist before trying to get text
        if text_span and author_small:
            text = text_span.get_text(strip=True)
            author = author_small.get_text(strip=True)
            quotes_data.append({'text': text, 'author': author})
    return quotes_data

if __name__ == "__main__":
    scrape_quotes()
