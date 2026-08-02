import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Set to iPhone 12 Pro dimensions
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  
  console.log("Navigating to page...");
  await page.goto('http://localhost:5173/');
  
  console.log("Waiting for load...");
  await new Promise(r => setTimeout(r, 2000));
  
  console.log("Forcing .scrolled on navbar...");
  await page.evaluate(() => document.querySelector('.navbar').classList.add('scrolled'));
  await new Promise(r => setTimeout(r, 1000));

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
  await page.tap('.hamburger');
  await new Promise(r => setTimeout(r, 1000));
  
  console.log("Screenshot after click...");
  await page.screenshot({ path: 'after_click.png' });

  console.log("Evaluating navRight classes after click:");
  classes = await page.evaluate(() => {
    return {
      hamburger: document.querySelector('.hamburger').className,
      navRight: document.querySelector('.nav-right').className,
      navRightStyles: window.getComputedStyle(document.querySelector('.nav-right')).cssText
    };
  });
  console.log("Hamburger:", classes.hamburger);
  console.log("navRight:", classes.navRight);
  console.log("navRight Display:", await page.evaluate(() => window.getComputedStyle(document.querySelector('.nav-right')).display));
  console.log("navRight Opacity:", await page.evaluate(() => window.getComputedStyle(document.querySelector('.nav-right')).opacity));
  console.log("navRight Visibility:", await page.evaluate(() => window.getComputedStyle(document.querySelector('.nav-right')).visibility));
  
  await browser.close();
})();
