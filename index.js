"use strict"
import notifier from "node-notifier"

//.includes()
const LOCATION_BANLIST = ["Canada"]
const TERM_ALLOWLIST = ["Fall 2024"]

let prevSummerRef = {
  text: null,
  count: 0
}

let prevOffseasonRef = {
  text: null,
  count: 0
}

while (true) {
  // try {
  //   await poll(
  //     "SUMMER",
  //     "https://raw.githubusercontent.com/SimplifyJobs/Summer2024-Internships/dev/README.md",
  //     "https://github.com/SimplifyJobs/Summer2024-Internships",
  //     prevSummerRef
  //   )
  // } catch (e) {
  //   console.log(e)
  // }

  try {
    await poll(
      "OFFSEASON",
      "https://raw.githubusercontent.com/SimplifyJobs/Summer2024-Internships/dev/README-Off-Season.md",
      "https://github.com/SimplifyJobs/Summer2024-Internships/blob/dev/README-Off-Season.md",
      prevOffseasonRef
    )
  } catch (e) {
    console.log(e)
  }

  await sleep()
}

async function poll(type, rawUrl, prettyUrl, prevRef) {
  let text = await fetch(rawUrl, { cache: "no-store" }).then((response) => response.text())

  if (prevRef.text === text) return

  let jobs = parseMarkdownTable(text, type === "OFFSEASON")

  if (prevRef.text === null) {
    prevRef.text = text
    prevRef.count = jobs.length
    return
  }

  let newJobsCount = jobs.length - prevRef.count

  let filteredNewJobsCount = 0
  outer: for (let i = 0; i < newJobsCount; i++) {
    let job = jobs[i]
    for (let location of LOCATION_BANLIST) {
      if (job.location.includes(location)) continue outer
    }

    filteredNewJobsCount++
  }

  if (filteredNewJobsCount !== 0) {
    console.log(`found ${filteredNewJobsCount} new jobs`)
    console.log("\x1b[31m", type)
    console.log(new Date())
    console.log(prettyUrl)

    notifier.notify({
      title: `${newJobsCount} new jobs`,
      message: type
    })
  }

  prevRef.count = jobs.length
  prevRef.text = text
}

/**
 *
 * @param {string} md
 * @param {boolean} offseason
 */
function parseMarkdownTable(md, offseason) {
  let separator
  if (offseason) {
    separator = `| Company | Role | Location | Terms | Application/Link | Date Posted |
| ------- | ---- | -------- | ----- | ---------------- | ----------- |
`
  } else {
    separator = `| Company | Role | Location | Application/Link | Date Posted |
| ------- | ---- | -------- | ---------------- | ----------- |
`
  }
  md = md.split(separator)[1]
  let lines = md.split("\n")

  let jobs = []
  let prevCompany = null
  for (let line of lines) {
    if (!line) continue

    line = line.trim()

    if (!line.includes("|")) break

    let cols = line.split("|")
    if (cols.length < 6) break

    let i = 1

    let company
    let companyRaw = cols[i++]
    if (companyRaw.includes("[")) {
      let match = companyRaw.match(/\[(.*?)]/)
      if (!match) throw new Error(`cant parse company from:${companyRaw}`)
      company = match[1]
    } else if (companyRaw.includes("↳")) {
      if (!prevCompany) throw new Error("!prevCompany")
      company = prevCompany
    } else {
      company = companyRaw.trim()
    }
    prevCompany = company

    let role = cols[i++].trim()

    let location = cols[i++].trim()

    let terms
    if (offseason) {
      terms = cols[i++].trim()
    }

    i++ //skip application link

    let datePosted = cols[i++].trim()

    let job = {
      company,
      role,
      location,
      terms, //may be undefined
      datePosted
    }

    jobs.push(job)
  }

  return jobs
}

async function sleep() {
  await new Promise((r) => setTimeout(r, 2000))
}
