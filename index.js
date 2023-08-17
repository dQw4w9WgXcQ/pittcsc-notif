"use strict";
import notifier from "node-notifier";

const url =
  "https://raw.githubusercontent.com/SimplifyJobs/Summer2024-Internships/dev/README.md";

let prevText = null;

while (true) {
  let text;
  try {
    text = await fetch(url).then((response) => response.text());
  } catch (e) {
    console.log(e);
    await sleep();
    continue;
  }

  if (prevText == null) {
    prevText = text;
    continue;
  }

  if (prevText == text) {
    console.log("\x1b[32m", "...");
    await sleep();
    continue;
  }

  console.log("\x1b[31m", "change detected");

  notifier.notify({
    title: "NEW JOB!!",
    message: "NEW JOB!!",
  });
  prevText = text;
  await sleep();
}

async function sleep() {
  await new Promise((r) => setTimeout(r, 2000));
}
