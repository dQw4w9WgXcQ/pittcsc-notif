"use strict";
import notifier from "node-notifier";

const url =
  "https://raw.githubusercontent.com/SimplifyJobs/Summer2024-Internships/dev/README.md";
const offseasonUrl =
  "https://raw.githubusercontent.com/SimplifyJobs/Summer2024-Internships/dev/README-Off-Season.md";

let prevText = null;
let prevTextOffseason = null;

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
  } else {
    if (prevText == text) {
      console.log("\x1b[32m", ".");
    } else {
      console.log("\x1b[31m", "@@@@@@@@@@@@@@@@@@@@@@@@");
      console.log("\x1b[31m", "@@@@@@@@@@@@@@@@@@@@@@@@");
      console.log("\x1b[31m", "@@@@@@@@@@@@@@@@@@@@@@@@");
      console.log("\x1b[31m", "@@@@@@@@@@@@@@@@@@@@@@@@");
      console.log("\x1b[31m", "@@@@@@@@@@@@@@@@@@@@@@@@");
      console.log("SUMMER");
      console.log("https://github.com/SimplifyJobs/Summer2024-Internships");

      notifier.notify({
        title: "NEW JOB!!",
        message: "NEW JOB!! summer",
      });
      prevText = text;
    }
  }

  let offseasonText;
  try {
    offseasonText = await fetch(offseasonUrl).then((response) =>
      response.text()
    );
  } catch (e) {
    console.log(e);
    await sleep();
    continue;
  }

  if (prevTextOffseason == null) {
    prevTextOffseason = offseasonText;
  } else {
    if (prevTextOffseason == offseasonText) {
      console.log("\x1b[32m", "..");
    } else {
      console.log("\x1b[31m", "@@@@@@@@@@@@@@@@@@@@@@@@");
      console.log("\x1b[31m", "@@@@@@@@@@@@@@@@@@@@@@@@");
      console.log("\x1b[31m", "@@@@@@@@@@@@@@@@@@@@@@@@");
      console.log("\x1b[31m", "@@@@@@@@@@@@@@@@@@@@@@@@");
      console.log("\x1b[31m", "@@@@@@@@@@@@@@@@@@@@@@@@");
      console.log("OFFSEASON");
      console.log(
        "https://github.com/SimplifyJobs/Summer2024-Internships/blob/dev/README-Off-Season.md"
      );

      notifier.notify({
        title: "NEW JOB!!",
        message: "NEW JOB!! offseason",
      });
      prevTextOffseason = offseasonText;
    }
  }

  await sleep();
}

async function sleep() {
  await new Promise((r) => setTimeout(r, 2000));
}
