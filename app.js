'use strict'
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox'
    ]
  });
  const page = await browser.newPage();
  // await page.goto('http://d-fw-rel.coreprice.com/');
  await page.goto('http://kakaku.com/');
  // await page.setViewport({ width: 10, height: 10 });

  let selector = "body > div.c-jack > div.l-wrap-top > div.l-c.l-c-2column > div.l-c_cont.l-c-2column_cont.p-cont > div > div.c-box-regularBox.p-newProduct";
  // await page.waitFor(selector);
  const clip = await page.evaluate(s => {
    const el = document.querySelector(s);
    const { width, height, top: y, left: x } = el.getBoundingClientRect();
    return { width, height, x, y };
  }, selector)

  // let buff = await page.screenshot({ clip })
  await page.screenshot({ path: 'sandbox/kakakucom.png', clip: clip });

  const crypto = require('crypto');
  const fs = require('fs');
  const shasum = crypto.createHash('sha1');

  fs.readFile('sandbox/kakakucom.png', (err, data) => {
    shasum.update(data);
    // やはりこれだと微妙かもしれん
    // 開発本番でデータが違うからハッシュ値が違う、だけだと微妙
    // 距離を取って、完全に一致/データが違うかもしれないが多分一致/全く違う　くらいの判定はしてもいい
    console.log(shasum.digest('hex'));
  })

  browser.close()
})();