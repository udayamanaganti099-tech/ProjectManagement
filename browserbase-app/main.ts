import "dotenv/config";
import { Stagehand } from "@browserbasehq/stagehand";

const APP_ID = process.env.ADZUNA_APP_ID || process.env.APP_ID;
const API_KEY = process.env.ADZUNA_API_KEY || process.env.API_KEY;
interface Job {
  title: string;
  redirect_url: string;
}
async function getJobs(): Promise<Job[]> {
  if (!APP_ID || !API_KEY) {
    throw new Error("Missing Adzuna API credentials in your .env file.");
  }

  const url = `https://api.adzuna.com/v1/api/jobs/gb/search/1?app_id=${APP_ID}&app_key=${API_KEY}&what=react+developer&results_per_page=3`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Adzuna API Error: ${res.status} ${res.statusText}`);
  }
  const data = await res.json();
  return data.results || [];
}
async function main() {
  const stagehand = new Stagehand({
    env: "LOCAL",
    localBrowserLaunchOptions: {
      headless: false,
    },
  });
  try {
    await stagehand.init();
    const page = stagehand.context.pages()[0];
    const jobs = await getJobs();
    console.log(`Found ${jobs.length} jobs. Starting browser navigation...`);
    for (const job of jobs) {
      console.log("Opening:", job.title);
      await page.goto(job.redirect_url, { waitUntil: "domcontentloaded" });
      await page.waitForTimeout(3000);
      console.log("Visited:", await page.title());
    }
    console.log("Done! Visited", jobs.length, "jobs.");
  } catch (error) {
    console.error("An error occurred during automation:", error);
  } finally {
    await stagehand.close();
  }
}
main();