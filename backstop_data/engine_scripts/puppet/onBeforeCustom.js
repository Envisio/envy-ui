module.exports = async (page, scenario, vp) => {
  await require('./loadCookies')(page, scenario);
    await page.goto(scenario.url);
    console.log('-------------------------------XXXXXXX----------');
    await page.type('input[id="gsearchsimple"]', 'wwwwwwwwwwwwButton');
    // await page.type('a.kss-js-bg-example', 'XXXXXXX');
    // await page.type('input[name="password"]', 'XXXXXXX');
    await page.click('a.kss-js-bg-example');
    // await page.waitForNavigation();
};
