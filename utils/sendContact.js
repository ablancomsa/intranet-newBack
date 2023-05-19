const puppeteer = require('puppeteer');
const randomUseragent = require('random-useragent');

const sendContact = async (userData) => {
  
  const header = randomUseragent.getRandom((ua) => {
    return ua.browserName === 'Firefox';
  });
  console.log(header)
  
  const browser = await puppeteer.launch({
    headless: false,
    ignoreHTTPSErrors: true,
    args: ['--disable-features=IsolateOrigins']
    
  });
  const page = await browser.newPage();
  await page.goto('https://www.linkedin.com/login');
  await page.type('#username', 'msadeveloper@yahoo.com');
  await page.type('#password', 'proyectolinkedin');
  await page.waitForTimeout(3000);
  await page.click('button[data-litms-control-urn="login-submit"]');
  await page.waitForTimeout(15000);
  console.log(userData.linkedin)
  await page.goto(`https://${userData.linkedin}`);
  await page.waitForTimeout(3000);
  await page.waitForSelector(`.pv-top-card-v2-ctas >>> button`);
  const div = await page.$(`.pv-top-card-v2-ctas >>> button`);
  console.log(div);
  await page.click(`.pv-top-card-v2-ctas >>> button`);
  await page.waitForTimeout(3000);
  await page.close()

  return true
}

module.exports = sendContact;