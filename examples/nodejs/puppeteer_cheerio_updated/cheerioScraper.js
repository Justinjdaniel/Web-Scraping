const cheerio = require('cheerio');
const axios = require('axios');
const fs = require('fs'); // For optional file saving

async function scrapeWithCheerio() { // Renamed function
  const url = 'http://quotes.toscrape.com/'; // URL will be passed in tests, this is for direct run
  console.log(`Fetching HTML from ${url} using Axios...`);
  let quotesData = []; // Initialize to ensure it's defined in all paths

  try {
    const response = await axios.get(url);
    const html = response.data;
    console.log('HTML fetched. Parsing with Cheerio...');

    const $ = cheerio.load(html);

    $('div.quote').each((index, element) => {
      const text = $(element).find('span.text').text().trim();
      const author = $(element).find('small.author').text().trim();
      if (text && author) { // Ensure both text and author are present
        quotesData.push({ text, author });
      }
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
    if (error.response) {
      console.error(`Error fetching page: Status Code ${error.response.status} from ${url}`);
    } else if (error.request) {
      console.error(`Error fetching page: No response received from ${url}`);
    } else {
      console.error('Error during Cheerio scraping setup:', error.message);
    }
  }
  return quotesData; // Return the data
}

// If this script is run directly, execute scrapeWithCheerio
if (require.main === module) {
  (async () => {
    await scrapeWithCheerio();
  })();
}

module.exports = { scrapeWithCheerio }; // Export for testing
