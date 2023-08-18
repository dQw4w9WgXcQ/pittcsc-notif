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
    text = await fetch(url, { cache: "no-store" }).then((response) =>
      response.text()
    );
  } catch (e) {
    console.log(e);
    await sleep();
    continue;
  }

  if (prevText == text) {
    console.log("\x1b[32m", ".");
  } else {
    console.log("\x1b[31m", "@@@@@@@@@@@@@@@@@@@@@@@@");
    console.log("\x1b[31m", "@@@@@@@@@@@@@@@@@@@@@@@@");
    console.log("\x1b[31m", "@@@@@@@@@@@@@@@@@@@@@@@@");
    console.log("\x1b[31m", "@@@@@@@@@@@@@@@@@@@@@@@@");
    console.log("\x1b[31m", "@@@@@@@@@@@@@@@@@@@@@@@@");
    console.log("SUMMER");
    console.log(new Date());
    console.log("https://github.com/SimplifyJobs/Summer2024-Internships");

    notifier.notify({
      title: "NEW JOB!!",
      message: "summer",
    });
    prevText = text;
  }

  let offseasonText;
  try {
    offseasonText = await fetch(offseasonUrl, { cache: "no-store" }).then(
      (response) => response.text()
    );
  } catch (e) {
    console.log(e);
    await sleep();
    continue;
  }

  if (prevTextOffseason == offseasonText) {
    console.log("\x1b[32m", "..");
  } else {
    console.log("\x1b[31m", "@@@@@@@@@@@@@@@@@@@@@@@@");
    console.log("\x1b[31m", "@@@@@@@@@@@@@@@@@@@@@@@@");
    console.log("\x1b[31m", "@@@@@@@@@@@@@@@@@@@@@@@@");
    console.log("\x1b[31m", "@@@@@@@@@@@@@@@@@@@@@@@@");
    console.log("\x1b[31m", "@@@@@@@@@@@@@@@@@@@@@@@@");
    console.log("OFFSEASON");
    console.log(new Date());
    console.log(
      "https://github.com/SimplifyJobs/Summer2024-Internships/blob/dev/README-Off-Season.md"
    );

    notifier.notify({
      title: "NEW JOB!!",
      message: "offseason",
    });
    prevTextOffseason = offseasonText;
  }

  await sleep();
}

async function sleep() {
  await new Promise((r) => setTimeout(r, 2000));
}
