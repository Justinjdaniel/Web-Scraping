const { scrapeQuotes } = require('../../examples/nodejs/playwright_example/scrape_playwright');
const playwright = require('playwright');

// Mock the playwright module
jest.mock('playwright');

describe('scrapeQuotes Playwright', () => {
  let mockPage;
  let mockBrowser;
  let mockContext;
  let consoleLogSpy;

  beforeEach(() => {
    // Reset mocks for each test
    mockPage = {
      goto: jest.fn().mockResolvedValue(null),
      waitForSelector: jest.fn().mockResolvedValue(null),
      evaluate: jest.fn().mockResolvedValue([
        { text: 'Mocked Quote 1', author: 'Author 1' },
        { text: 'Mocked Quote 2', author: 'Author 2' },
      ]),
      // Add other methods that might be called by the script if necessary
    };
    mockContext = {
      newPage: jest.fn().mockResolvedValue(mockPage),
    };
    mockBrowser = {
      newContext: jest.fn().mockResolvedValue(mockContext),
      close: jest.fn().mockResolvedValue(null),
    };
    playwright.chromium.launch.mockResolvedValue(mockBrowser);

    // Spy on console.log
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {}); // Suppress error logs during test
  });

  afterEach(() => {
    // Restore original console.log
    consoleLogSpy.mockRestore();
    jest.restoreAllMocks();
  });

  test('should launch browser, navigate, and extract quotes', async () => {
    await scrapeQuotes();

    expect(playwright.chromium.launch).toHaveBeenCalledTimes(1);
    expect(mockBrowser.newContext).toHaveBeenCalledTimes(1);
    expect(mockContext.newPage).toHaveBeenCalledTimes(1);
    expect(mockPage.goto).toHaveBeenCalledWith('http://quotes.toscrape.com/js/', { waitUntil: 'networkidle' });
    expect(mockPage.waitForSelector).toHaveBeenCalledWith('div.quote', { timeout: 20000 });
    expect(mockPage.evaluate).toHaveBeenCalledTimes(1);
    expect(mockBrowser.close).toHaveBeenCalledTimes(1);
  });

  test('should return and log extracted quotes', async () => {
    const quotes = await scrapeQuotes();

    expect(quotes).toEqual([
      { text: 'Mocked Quote 1', author: 'Author 1' },
      { text: 'Mocked Quote 2', author: 'Author 2' },
    ]);

    // Check if the quotes were logged
    expect(consoleLogSpy).toHaveBeenCalledWith(JSON.stringify({ text: 'Mocked Quote 1', author: 'Author 1' }));
    expect(consoleLogSpy).toHaveBeenCalledWith(JSON.stringify({ text: 'Mocked Quote 2', author: 'Author 2' }));
    expect(consoleLogSpy).toHaveBeenCalledWith('\nSuccessfully scraped 2 quotes:');
  });

  test('should handle and log when no quotes are found', async () => {
    mockPage.evaluate.mockResolvedValue([]); // Override to return no quotes
    const quotes = await scrapeQuotes();
    expect(quotes).toEqual([]);
    expect(consoleLogSpy).toHaveBeenCalledWith('No quotes found. The page structure might have changed or content did not load as expected.');
  });

  test('should log error and close browser if page.goto fails', async () => {
    const gotoError = new Error('Navigation failed');
    mockPage.goto.mockRejectedValue(gotoError);

    await scrapeQuotes();

    expect(console.error).toHaveBeenCalledWith('Error during scraping:', gotoError);
    expect(mockBrowser.close).toHaveBeenCalledTimes(1); // Ensure browser is closed even on error
  });

  test('should log error and close browser if page.evaluate fails', async () => {
    const evaluateError = new Error('Evaluation failed');
    mockPage.evaluate.mockRejectedValue(evaluateError);

    await scrapeQuotes();

    expect(console.error).toHaveBeenCalledWith('Error during scraping:', evaluateError);
    expect(mockBrowser.close).toHaveBeenCalledTimes(1);
  });
});
