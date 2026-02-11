import puppeteer from "puppeteer";

describe("Page start", () => {
  let browser;
  let page;

  beforeEach(async () => {
    browser = await puppeteer.launch({
      // headless: false,
      headless: true, // Запуск браузера в головолом режиме (headless), что означает отсутствие графического интерфейса
      slowMo: 0, //100, // Без замедления
      devtools: false, // DevTools не открываются
      args: ["--no-sandbox"],
    });

    page = await browser.newPage();
  });

  test("my test", async () => {
    await page.goto("https://tereshcuk.github.io/WorkingHTMLForms_1/");
    await page.waitForSelector("body");
    expect(true).toBeTruthy();
  });

  // test("Click on the button", async () => {
  //   jest.setTimeout(5000);

  //   await page.goto("https://tereshcuk.github.io/WorkingHTMLForms_1/");

  //   await page.waitForSelector("#formContainer");
  //   const submit = await page.$("button");
  //   await submit.click();

  //   await page.waitForSelector(".popover", { state: "attached" });
  //   const isPopoverVisible = await page.evaluate(() => {
  //     const popover = document.querySelector(".popover");
  //     return !!(popover && popover.style.display !== "none");
  //   });
  //   expect(isPopoverVisible).toBe(true);
  // });

  afterEach(async () => {
    if (browser) {
      await browser.close();
    }
  });
});
