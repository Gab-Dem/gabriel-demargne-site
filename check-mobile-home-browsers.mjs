import { chromium, firefox, webkit } from "playwright";

const targetUrl = process.argv[2] ?? "https://www.gabrieldemargne.com/";
const viewport = { width: 430, height: 932 };
const userAgent =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1";
const rootSelector = ".split-page--mobile-home";

const browsers = [
  ["chromium", chromium],
  ["webkit", webkit],
  ["firefox", firefox],
];

for (const [name, browserType] of browsers) {
  console.error(`Checking ${name}...`);

  let browser;

  try {
    browser = await browserType.launch();

    const context = await browser.newContext({
      viewport,
      isMobile: true,
      hasTouch: true,
      userAgent,
      deviceScaleFactor: 3,
    });

    const page = await context.newPage();
    page.setDefaultTimeout(15000);

    await page.goto(targetUrl, { waitUntil: "domcontentloaded", timeout: 15000 });
    await page.locator("body").waitFor({ state: "visible", timeout: 15000 });

    const root = page.locator(rootSelector);
    const rootCount = await root.count();

    if (rootCount !== 1) {
      const diagnostic = {
        browser: name,
        targetUrl,
        resolvedUrl: page.url(),
        title: await page.title(),
        rootSelector,
        rootCount,
      };

      console.log(JSON.stringify(diagnostic));
      await page.screenshot({
        path: `/private/tmp/mobile-home-${name}-error.png`,
        fullPage: false,
      });
      continue;
    }

    const imageBox = await page.locator(`${rootSelector} .left-image-wrap`).boundingBox();
    const lowerBox = await page.locator(`${rootSelector} .left-lower`).boundingBox();
    const bodyScrollWidth = await page.locator("body").evaluate((el) => el.scrollWidth);
    const bodyClientWidth = await page.locator("body").evaluate((el) => el.clientWidth);

    const result = {
      browser: name,
      targetUrl,
      resolvedUrl: page.url(),
      title: await page.title(),
      viewport,
      imageBox,
      lowerBox,
      overlapPx:
        imageBox && lowerBox
          ? Number((imageBox.y + imageBox.height - lowerBox.y).toFixed(2))
          : null,
      horizontalOverflowPx: bodyScrollWidth - bodyClientWidth,
    };

    console.log(JSON.stringify(result));
    await page.screenshot({ path: `/private/tmp/mobile-home-${name}.png`, fullPage: false });
  } catch (error) {
    console.log(
      JSON.stringify({
        browser: name,
        targetUrl,
        error: error instanceof Error ? error.message : String(error),
      }),
    );
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}
