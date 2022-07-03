const puppeteer = require('puppeteer'); // ref: https://pptr.dev/
// const cron = require('node-cron');

async function main() {
  // Launch puppeteer
  const browser = await puppeteer.launch(); // { headless: false } to view the browser
  // Create a new page
  const page = await browser.newPage();
  // Navigate to the page, wait for it to load
  await page.goto('https://www.google.com/');
  // Entering search term
  await page.type('[aria-label="Search"]', 'puppeteer');
  // Press 'Enter' to start search
  await page.keyboard.press('Enter');
  // Waiting for 5 seconds
  await page.waitForTimeout(5000);
  // Screenshot of the page
  await page.screenshot({ path: 'google.png', fullPage: true });
  // Close the browser
  await browser.close();
}

// Run the main function
main();

// by using cron job, you can run the script every minute or in specific time
// cron job: https://www.npmjs.com/package/node-cron
// cron.schedule('*/5 * * * *', main); // every 5 seconds

// or by using setInterval
