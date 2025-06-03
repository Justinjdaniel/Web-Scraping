const playwright = require('playwright');

async function scrapeQuotes() {
    console.log('Launching browser...');
    // Launch a browser (Chromium by default)
    const browser = await playwright.chromium.launch({
        // headless: false // You can set headless to false to see the browser UI
    });

    console.log('Browser launched. Creating new page...');
    const context = await browser.newContext();
    const page = await context.newPage();

    const url = "http://quotes.toscrape.com/js/";
    console.log(`Navigating to ${url}...`);
    let quotesData = []; // Initialize quotesData here

    try {
        await page.goto(url, { waitUntil: 'networkidle' }); // Wait until network is idle
        console.log('Page navigated. Waiting for quotes to load...');

        // Playwright's auto-waiting will handle most cases.
        // We can also explicitly wait for the first quote element to be visible if needed.
        await page.waitForSelector('div.quote', { timeout: 20000 }); // Wait up to 20 seconds
        console.log('Quotes container found.');

        // Extract quotes
        quotesData = await page.evaluate(() => { // Assign to the outer scope variable
            const quotes = [];
            const quoteElements = document.querySelectorAll('div.quote');
            quoteElements.forEach(quoteElement => {
                const text = quoteElement.querySelector('span.text').innerText;
                const author = quoteElement.querySelector('small.author').innerText;
                quotes.push({ text, author });
            });
            return quotes;
        });

        if (quotesData.length > 0) {
            console.log(`\nSuccessfully scraped ${quotesData.length} quotes:`);
            quotesData.forEach(quote => {
                console.log(JSON.stringify(quote));
            });
        } else {
            console.log('No quotes found. The page structure might have changed or content did not load as expected.');
        }

        // Optionally, save to a file
        // const fs = require('fs');
        // fs.writeFileSync('playwright_quotes.json', JSON.stringify(quotesData, null, 2));
        // console.log('\nData saved to playwright_quotes.json');

    } catch (error) {
        console.error('Error during scraping:', error);
    } finally {
        console.log('Closing browser...');
        await browser.close();
        console.log('Browser closed.');
    }
    return quotesData; // Return the data for testing purposes
}

// If this script is run directly, execute scrapeQuotes
if (require.main === module) {
    (async () => {
        await scrapeQuotes();
    })();
}

module.exports = { scrapeQuotes }; // Export for testing
