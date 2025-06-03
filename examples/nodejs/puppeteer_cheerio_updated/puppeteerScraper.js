const puppeteer = require('puppeteer');
const fs = require('fs'); // For optional file saving

async function scrapeWithPuppeteer() { // Renamed function
  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    // headless: false, // Set to false to see the browser UI
    // args: ['--no-sandbox', '--disable-setuid-sandbox'] // Useful for some CI environments
  });
  const page = await browser.newPage();
  const url = 'http://quotes.toscrape.com/'; // URL will be passed in tests, this is for direct run
  console.log(`Navigating to ${url}...`);
  let quotesData = []; // Initialize to ensure it's defined in all paths

  try {
    await page.goto(url, { waitUntil: 'networkidle2' });
    console.log('Page navigated. Extracting quotes...');

    await page.waitForSelector('div.quote', { timeout: 10000 });

    quotesData = await page.evaluate(() => { // Assign to outer scope variable
      const quotes = [];
      const quoteElements = document.querySelectorAll('div.quote');
      quoteElements.forEach(quoteElement => {
        const text = quoteElement.querySelector('span.text').innerText.trim();
        const author = quoteElement.querySelector('small.author').innerText.trim();
        if (text && author) { // Ensure both text and author are present
            quotes.push({ text, author });
        }
      });
      return quotes;
    });

    if (quotesData.length > 0) {
      console.log(`\nSuccessfully scraped ${quotesData.length} quotes from ${url}:`);
      quotesData.forEach(quote => {
        console.log(JSON.stringify(quote));
      });
    } else {
      console.log(`No quotes found on ${url}.`);
    }

  } catch (error) {
    console.error(`Error during scraping with Puppeteer from ${url}:`, error);
  } finally {
    console.log('Closing browser...');
    await browser.close();
    console.log('Browser closed.');
  }
  return quotesData; // Return the data
}

// If this script is run directly, execute scrapeWithPuppeteer
if (require.main === module) {
  (async () => {
    await scrapeWithPuppeteer();
  })();
}

module.exports = { scrapeWithPuppeteer }; // Export for testing
