"use strict";
import notifier from "node-notifier";

let prevTextRef = { value: null };
let prevOffseasonTextRef = { value: null };

while (true) {
  try {
    await check(
      "SUMMER",
      "https://raw.githubusercontent.com/SimplifyJobs/Summer2024-Internships/dev/README.md",
      "https://github.com/SimplifyJobs/Summer2024-Internships",
      prevTextRef
    );

    await check(
      "OFFSEASON",
      "https://raw.githubusercontent.com/SimplifyJobs/Summer2024-Internships/dev/README-Off-Season.md",
      "https://github.com/SimplifyJobs/Summer2024-Internships/blob/dev/README-Off-Season.md",
      prevOffseasonTextRef
    );
  } catch (e) {
    console.log(e);
  }

  console.log("\x1b[32m", ".");
  await sleep();
}

async function check(type, rawUrl, prettyUrl, prevTextRef) {
  let text = await fetch(rawUrl, { cache: "no-store" }).then((response) =>
    response.text()
  );

  if (prevTextRef.value !== text) {
    console.log("\x1b[31m", type);
    console.log(new Date());
    console.log(prettyUrl);

    notifier.notify({
      title: "NEW JOB!!",
      message: type,
    });
    prevTextRef.value = text;
  }
}

async function sleep() {
  await new Promise((r) => setTimeout(r, 2000));
}
