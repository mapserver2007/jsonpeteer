const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox'
    ]
  });
  const page = await browser.newPage();
  await page.goto('http://kakaku.com');
  await page.screenshot({ path: '/workspace/jsonpeteer/sandbox/kakakucom.png' });

  browser.close();
})();