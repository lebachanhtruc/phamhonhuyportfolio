import { chromium, devices } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext(
    devices['iPhone 13']
  );
  const page = await context.newPage();
  
  console.log("Navigating to page...");
  await page.goto('http://localhost:5173/');
  
  console.log("Waiting for load...");
  await page.waitForTimeout(2000);
  
  console.log("Scrolling down to reveal navbar...");
  await page.evaluate(() => window.scrollTo(0, 500));
  await page.waitForTimeout(1000);

  console.log("Screenshot before click...");
  await page.screenshot({ path: 'before_click.png' });
  
  console.log("Evaluating navRight classes before click:");
  let classes = await page.evaluate(() => {
    return {
      hamburger: document.querySelector('.hamburger').className,
      navRight: document.querySelector('.nav-right').className
    };
  });
  console.log(classes);

  console.log("Clicking hamburger...");
  await page.click('.hamburger');
  await page.waitForTimeout(1000);
  
  console.log("Screenshot after click...");
  await page.screenshot({ path: 'after_click.png' });

  console.log("Evaluating navRight classes after click:");
  classes = await page.evaluate(() => {
    return {
      hamburger: document.querySelector('.hamburger').className,
      navRight: document.querySelector('.nav-right').className
    };
  });
  console.log(classes);
  
  await browser.close();
})();
