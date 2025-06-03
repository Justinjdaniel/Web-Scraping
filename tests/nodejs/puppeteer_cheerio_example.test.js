const { scrapeWithPuppeteer } = require('../../examples/nodejs/puppeteer_cheerio_updated/puppeteerScraper.js');
const { scrapeWithCheerio } = require('../../examples/nodejs/puppeteer_cheerio_updated/cheerioScraper.js');
const puppeteer = require('puppeteer');
const axios = require('axios');

// Mock Puppeteer
jest.mock('puppeteer');

// Mock Axios
jest.mock('axios');

// Sample HTML for testing
const SAMPLE_HTML_QUOTES = `
<html>
<body>
    <div class="quote">
        <span class="text">Mocked Puppeteer Quote 1</span>
        <small class="author">Puppeteer Author 1</small>
    </div>
    <div class="quote">
        <span class="text">Mocked Puppeteer Quote 2</span>
        <small class="author">Puppeteer Author 2</small>
    </div>
</body>
</html>
`;

const SAMPLE_HTML_CHEERIO_QUOTES = `
<html>
<body>
    <div class="quote">
        <span class="text">Mocked Cheerio Quote 1</span>
        <small class="author">Cheerio Author 1</small>
    </div>
    <div class="quote">
        <span class="text">Mocked Cheerio Quote 2</span>
        <small class="author">Cheerio Author 2</small>
    </div>
</body>
</html>
`;


describe('Puppeteer and Cheerio Scrapers', () => {
  let consoleLogSpy;
  let consoleErrorSpy;

  beforeEach(() => {
    // Spy on console methods
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    // Restore original console methods and clear mocks
    consoleLogSpy.mockRestore();
    consoleErrorSpy.mockRestore();
    jest.clearAllMocks();
  });

  describe('scrapeWithPuppeteer', () => {
    let mockPage;
    let mockBrowser;

    beforeEach(() => {
      mockPage = {
        goto: jest.fn().mockResolvedValue(null),
        waitForSelector: jest.fn().mockResolvedValue(null),
        evaluate: jest.fn().mockImplementation(() => {
          // Simulate the actual evaluate function based on SAMPLE_HTML_QUOTES
          // This is a simplified DOM environment for testing the evaluate callback
          const quotes = [];
          // A very basic simulation of querySelectorAll and querySelector
          const mockDocument = {
            querySelectorAll: (selector) => {
              if (selector === 'div.quote') {
                return [
                  { querySelector: (s) => s === 'span.text' ? { innerText: 'Mocked Puppeteer Quote 1' } : { innerText: 'Puppeteer Author 1' } },
                  { querySelector: (s) => s === 'span.text' ? { innerText: 'Mocked Puppeteer Quote 2' } : { innerText: 'Puppeteer Author 2' } },
                ];
              }
              return [];
            }
          };
          const quoteElements = mockDocument.querySelectorAll('div.quote');
          quoteElements.forEach(quoteElement => {
            const text = quoteElement.querySelector('span.text').innerText.trim();
            const author = quoteElement.querySelector('small.author').innerText.trim();
            if (text && author) {
                quotes.push({ text, author });
            }
          });
          return Promise.resolve(quotes);
        }),
        // Add other page methods if your script uses them
      };
      mockBrowser = {
        newPage: jest.fn().mockResolvedValue(mockPage),
        close: jest.fn().mockResolvedValue(null),
      };
      puppeteer.launch.mockResolvedValue(mockBrowser);
    });

    test('should call puppeteer methods and return extracted quotes', async () => {
      const quotes = await scrapeWithPuppeteer(); // URL is hardcoded in the actual script

      expect(puppeteer.launch).toHaveBeenCalledTimes(1);
      expect(mockBrowser.newPage).toHaveBeenCalledTimes(1);
      expect(mockPage.goto).toHaveBeenCalledWith('http://quotes.toscrape.com/', { waitUntil: 'networkidle2' });
      expect(mockPage.waitForSelector).toHaveBeenCalledWith('div.quote', { timeout: 10000 });
      expect(mockPage.evaluate).toHaveBeenCalledTimes(1);
      expect(mockBrowser.close).toHaveBeenCalledTimes(1);

      const expectedQuotes = [
        { text: 'Mocked Puppeteer Quote 1', author: 'Puppeteer Author 1' },
        { text: 'Mocked Puppeteer Quote 2', author: 'Puppeteer Author 2' },
      ];
      expect(quotes).toEqual(expectedQuotes);
      expect(consoleLogSpy).toHaveBeenCalledWith(JSON.stringify(expectedQuotes[0]));
      expect(consoleLogSpy).toHaveBeenCalledWith(JSON.stringify(expectedQuotes[1]));
    });

    test('should handle errors gracefully in puppeteer', async () => {
        mockPage.goto.mockRejectedValue(new Error('Puppeteer navigation error'));
        const quotes = await scrapeWithPuppeteer();
        expect(quotes).toEqual([]); // Should return empty array on error
        expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringContaining('Error during scraping with Puppeteer'), expect.any(Error));
    });
  });

  describe('scrapeWithCheerio', () => {
    beforeEach(() => {
      axios.get.mockResolvedValue({ data: SAMPLE_HTML_CHEERIO_QUOTES });
    });

    test('should call axios.get and return extracted quotes using Cheerio', async () => {
      const quotes = await scrapeWithCheerio(); // URL is hardcoded in the actual script

      expect(axios.get).toHaveBeenCalledWith('http://quotes.toscrape.com/');

      const expectedQuotes = [
        { text: 'Mocked Cheerio Quote 1', author: 'Cheerio Author 1' },
        { text: 'Mocked Cheerio Quote 2', author: 'Cheerio Author 2' },
      ];
      expect(quotes).toEqual(expectedQuotes);
      expect(consoleLogSpy).toHaveBeenCalledWith(JSON.stringify(expectedQuotes[0]));
      expect(consoleLogSpy).toHaveBeenCalledWith(JSON.stringify(expectedQuotes[1]));
    });

    test('should handle errors gracefully in cheerio (axios failure)', async () => {
        axios.get.mockRejectedValue(new Error('Axios network error'));
        const quotes = await scrapeWithCheerio();
        expect(quotes).toEqual([]); // Should return empty array on error
        expect(consoleErrorSpy).toHaveBeenCalledWith('Error during Cheerio scraping setup:', 'Axios network error');
    });

    test('should handle errors gracefully in cheerio (axios error response)', async () => {
        const errorResponse = { response: { status: 404 }, request: {}, message: "Request failed with status code 404"};
        axios.get.mockRejectedValue(errorResponse);
        const quotes = await scrapeWithCheerio();
        expect(quotes).toEqual([]);
        expect(consoleErrorSpy).toHaveBeenCalledWith('Error fetching page: Status Code 404 from http://quotes.toscrape.com/');
    });
  });
});
