const { ApifyClient } = require('apify-client');
const fs = require('fs');

// The JavaScript function to be executed on every page by the actor
const pageFunctionString = `
async function pageFunction(context) {
    const { jQuery: $, page, request } = context;

    // The page title
    const title = await page.title();

    // Array to store the scraped quotes
    const quotes = [];

    // Select all quote elements
    const quoteElements = $('.quote');

    // Iterate over each quote element
    quoteElements.each((index, element) => {
        const text = $(element).find('.text').text().trim();
        const author = $(element).find('.author').text().trim();
        quotes.push({ text, author });
    });

    // Return the title and the quotes
    return {
        url: request.url,
        title,
        quotes
    };
}`;

async function runApifyActorAndFetchResults() { // Renamed function
    // Get the Apify API token from environment variable
    const token = process.env.APIFY_TOKEN;

    if (!token) {
        console.error('APIFY_TOKEN environment variable is not set.');
        console.error('Please get your API token from https://console.apify.com/account/integrations and set it.');
        console.error('Example: export APIFY_TOKEN="YOUR_TOKEN"');
        return []; // Return empty array if token is not set
    }

    // Initialize the ApifyClient with the API token
    const client = new ApifyClient({ token });

    // Actor ID for apify/web-scraper
    const actorId = 'apify/web-scraper'; // Using the actual actor ID for web-scraper

    console.log(`Preparing to run actor: ${actorId}`);

    // Prepare the actor input
    const actorInput = {
        "startUrls": [ // Simplified input for testing, actual actor has more options
            { "url": "http://quotes.toscrape.com/" }
        ],
        "pageFunction": pageFunctionString,
        "proxyConfiguration": { "useApifyProxy": true }
        // runMode is often part of web-scraper's input but we'll rely on actor default for this example.
        // For a direct call to `apify/web-scraper`, more specific input might be needed.
        // However, the test will mock `client.actor().call()` or `start().waitForFinish()`.
    };
    let items = []; // Initialize to ensure it's defined

    try {
        console.log('Calling actor and waiting for results...');
        // Using call() for simplicity as it combines start and waitForFinish
        // The actual script used start() then waitForFinish().
        // For testing, we can mock either behavior. Let's stick to the original structure.

        const run = await client.actor(actorId).start(actorInput);
        console.log(`Actor run started. Run ID: ${run.id}, Status: ${run.status}`);

        const finishedRun = await client.run(run.id).waitForFinish({ waitSecs: 300 });
        console.log(`Actor run finished with status: ${finishedRun.status}`);

        if (finishedRun.status === 'SUCCEEDED') {
            console.log('Fetching results from dataset:', finishedRun.defaultDatasetId);
            const dataset = client.dataset(finishedRun.defaultDatasetId);
            const datasetItems = await dataset.listItems();
            items = datasetItems.items;

            if (items.length > 0) {
                console.log(`\nSuccessfully retrieved ${items.length} items.`);
                items.forEach(item => {
                    console.log(JSON.stringify(item, null, 2));
                });
                fs.writeFileSync('apify_results.json', JSON.stringify(items, null, 2));
                console.log('\nResults also saved to apify_results.json');
            } else {
                console.log('Actor run succeeded, but no items were found.');
            }
        } else {
            console.error(`Actor run failed with status: ${finishedRun.status}`);
            try {
                const log = await client.log(finishedRun.id).get();
                console.error('\nActor Log:', log || 'Log not available or empty.');
            } catch (logError) {
                console.error('Could not retrieve actor log:', logError.message);
            }
        }
    } catch (error) {
        console.error('Error running Apify actor or fetching results:', error);
    }
    return items; // Return the fetched items
}

// If this script is run directly, execute runApifyActorAndFetchResults
if (require.main === module) {
  (async () => {
    await runApifyActorAndFetchResults();
  })();
}

module.exports = { runApifyActorAndFetchResults }; // Export for testing
