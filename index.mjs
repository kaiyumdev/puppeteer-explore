import puppeteer from 'puppeteer';

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: { width: 1920, height: 1080 },
        slowMo: 250,
        userDataDir: 'temporary',
    });

    const page = await browser.newPage();

    try {
        await page.goto('https://duckduckgo.com', {
            waitUntil: 'networkidle2',
        });

        const searchBox = await page.waitForSelector('#searchbox_input');
        await searchBox.type('devconfbd');
        const searchButton = await page.waitForSelector('.searchbox_searchButton__F5Bwq');

        await searchButton.click();

        const mainPage = await page.waitForSelector('[data-testid="result-title-a"]', { timeout: 60000 });
        const result = await page.evaluate(() => {
            return [...document.querySelectorAll('[data-testid="result-title-a"]')].map(e => e.href)
        })

        
        console.log(result)
        // console.log('Result found:', firstResult);
        await mainPage.click()

        await page.screenshot({ path: 'result.png' });
    } catch (error) {
        console.error('Error occurred:', error);
    } finally {
        await browser.close();
    }
})();