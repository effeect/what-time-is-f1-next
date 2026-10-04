// Downloads a circuit layout diagram (SVG) per circuit from Wikimedia Commons
// and writes it to public/track-maps/{circuitId}.svg, along with attribution
// metadata to public/data/track_map_credits.json.
//
// Which Commons file belongs to which circuitId is curated in
// src/data/circuitTrackMaps.js; this script resolves the current file URL +
// license/author for each entry and caches the result. A circuitId missing
// from that table, or a Commons lookup that fails, is logged and skipped —
// it never fails the whole run.
const fs = require("fs");
const path = require("path");
const { CIRCUIT_TRACK_MAPS } = require("../data/circuitTrackMaps");

const USER_AGENT =
  "WhatTimeIsF1Next-TrackMapBot/1.0 (https://github.com/odimes/what-time-is-f1-next)";

function getYearSchedule() {
  const filePath = path.join(
    process.cwd(),
    "public",
    "data",
    "year_schedule.json",
  );
  const jsonData = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(jsonData);
}

function stripHtml(value) {
  if (!value) return undefined;
  const text = String(value).replace(/<[^>]*>/g, "").trim();
  return text || undefined;
}

async function fetchJson(url) {
  const response = await fetch(url, {
    headers: { "User-Agent": USER_AGENT },
  });
  if (!response.ok) {
    throw new Error(`Commons API returned ${response.status} ${response.statusText}`);
  }
  return response.json();
}

async function resolveCommonsFile(commonsFile) {
  const url =
    "https://commons.wikimedia.org/w/api.php?action=query&titles=" +
    encodeURIComponent(commonsFile) +
    "&prop=imageinfo&iiprop=url|extmetadata|mime&format=json";
  const data = await fetchJson(url);
  const pages = data?.query?.pages ?? {};
  const page = Object.values(pages)[0];
  if (!page || page.missing !== undefined) {
    throw new Error(`Commons file not found: ${commonsFile}`);
  }
  const info = page.imageinfo?.[0];
  if (!info) {
    throw new Error(`No imageinfo for Commons file: ${commonsFile}`);
  }
  return {
    pageTitle: page.title,
    imageUrl: info.url,
    mime: info.mime,
    artist: stripHtml(info.extmetadata?.Artist?.value),
    license: stripHtml(info.extmetadata?.LicenseShortName?.value),
    licenseUrl: stripHtml(info.extmetadata?.LicenseUrl?.value),
  };
}

async function downloadSvg(imageUrl, mime) {
  if (mime !== "image/svg+xml") {
    throw new Error(`Expected an SVG, got mime type: ${mime}`);
  }
  const response = await fetch(imageUrl, {
    headers: { "User-Agent": USER_AGENT },
  });
  if (!response.ok) {
    throw new Error(`Failed to download ${imageUrl}: ${response.status} ${response.statusText}`);
  }
  const buffer = Buffer.from(await response.arrayBuffer());
  if (!buffer.toString("utf-8", 0, 200).includes("<svg")) {
    throw new Error(`Downloaded content does not look like an SVG: ${imageUrl}`);
  }
  return buffer;
}

function sourceUrlFor(pageTitle) {
  const name = pageTitle.replace(/^File:/, "").replace(/ /g, "_");
  return `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(name)}`;
}

async function getTrackMaps() {
  let yearSchedule;
  try {
    yearSchedule = getYearSchedule();
  } catch (error) {
    console.error("Error reading year_schedule.json:", error.message);
    process.exit(1);
  }

  const circuitIds = new Set();
  for (const entry of yearSchedule.customRaceData ?? []) {
    const circuitId = entry.race?.sessions?.race?.Circuit?.circuitId;
    if (circuitId) circuitIds.add(circuitId);
  }

  const outputDir = path.join(process.cwd(), "public", "track-maps");
  fs.mkdirSync(outputDir, { recursive: true });

  const credits = {};

  for (const circuitId of circuitIds) {
    const mapping = CIRCUIT_TRACK_MAPS[circuitId];
    if (!mapping) {
      console.warn(`Skipping ${circuitId}: no entry in src/data/circuitTrackMaps.js`);
      continue;
    }

    try {
      const resolved = await resolveCommonsFile(mapping.commonsFile);
      const buffer = await downloadSvg(resolved.imageUrl, resolved.mime);
      fs.writeFileSync(path.join(outputDir, `${circuitId}.svg`), buffer);

      credits[circuitId] = {
        title: resolved.pageTitle,
        sourceUrl: sourceUrlFor(resolved.pageTitle),
        author: resolved.artist,
        license: resolved.license,
        licenseUrl: resolved.licenseUrl,
      };
      console.log(`Saved track map for ${circuitId} (${resolved.pageTitle})`);
    } catch (error) {
      console.warn(`Skipping ${circuitId}: ${error.message}`);
    }
  }

  const creditsPath = path.join(process.cwd(), "public", "data", "track_map_credits.json");
  fs.writeFileSync(
    creditsPath,
    JSON.stringify({ lastUpdated: new Date().toISOString(), credits }, null, 2),
  );
}

getTrackMaps();
