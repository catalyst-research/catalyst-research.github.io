const { chromium } = require('playwright');
(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto('file:///Users/guest2/Desktop/repos/catalyst/index.html');
    const theme1 = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
    console.log('Theme 1:', theme1);
    await page.click('#theme-toggle', { force: true });
    const theme2 = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
    console.log('Theme 2:', theme2);
    
    // Check background color of body
    const bodyBg = await page.evaluate(() => window.getComputedStyle(document.body).backgroundColor);
    console.log('Body bg:', bodyBg);
    
    await browser.close();
})();
