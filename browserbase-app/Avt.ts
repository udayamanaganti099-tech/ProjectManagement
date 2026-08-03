
import "dotenv/config";
import { Stagehand } from "@browserbasehq/stagehand";


async function main() {
  const stagehand = new Stagehand({
  env: "LOCAL",
  model: "google/gemini-2.5-flash",
  localBrowserLaunchOptions: {
    headless: false,
  },
});


  await stagehand.init();


  const page = stagehand.context.pages()[0];


  await page.goto("https://www.wikipedia.org");
  console.log("Opened:", await page.title());


  await stagehand.act("Type 'Artificial Intelligence' into the search box");


 
  await page.waitForTimeout(2000);
  console.log("After search:", await page.title());


  await stagehand.act("Scroll down the page");


  await page.waitForTimeout(1000);


  const { extraction } = await stagehand.extract(
    "Extract the first paragraph of the article"
  );
  console.log("Extracted:", extraction);


  await stagehand.close();
}


main();
