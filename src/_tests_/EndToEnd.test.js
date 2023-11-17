import puppeteer from "puppeteer";

describe("show/hide an event details", () => {
  let browser;
  let page;
  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: true,
      slowMo: 250,
      timeout: 0,
    });
    page = await browser.newPage();
    await page.goto("http://localhost:3000/");
    await page.waitForSelector(".eventCard");
  });

  afterAll(() => {
    browser.close();
  });

  test("An event element is collapsed by default", async () => {
    const eventDetails = await page.$(".eventCard .details");
    expect(eventDetails).toBeNull();
  });

  test("User can expand an event to see its details", async () => {
    await page.click(".eventCard .details-btn");
    const eventDetails = await page.$(".eventCard .details");
    expect(eventDetails).toBeDefined();
  });

  test("User can collapse an event to hide details", async () => {
    await page.click(".eventCard .details-btn");
    const eventDetails = await page.$(".eventCard .details");
    expect(eventDetails).toBeNull();
  });
});
