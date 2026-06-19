const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const html = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");
const match = html.match(/<script id="core-logic">([\s\S]*?)<\/script>/);
assert.ok(match, "core-logic script must exist");

const context = {};
vm.createContext(context);
vm.runInContext(match[1], context);

test("app version is v1.2.6", () => {
  assert.equal(context.APP_VERSION, "1.2.6");
});

test("app uses concise coordinate and magnetic field labels", () => {
  assert.doesNotMatch(html, /Separate latitude and longitude with \/ or ,/);
  assert.doesNotMatch(html, /\(magnetic °\)/);
  assert.doesNotMatch(html, /\(MAG\)/);
  assert.match(html, /placeholder="Enter coordinates"/);
  assert.match(html, /Width \(NM\)/);
  assert.match(html, /Depth \(NM\)/);
  assert.match(html, /Depth orientation</);
});

test("Axis and Mission Line appear before SAM and Custom panels and are collapsible", () => {
  assert.ok(html.indexOf('id="axis-panel"') < html.indexOf('id="sam-panel"'));
  assert.ok(html.indexOf('id="mission-panel"') < html.indexOf('id="sam-panel"'));
  assert.match(html, /<details id="axis-panel" class="panel">\s*<summary>Add Axis<\/summary>/);
  assert.match(html, /<details id="mission-panel" class="panel">\s*<summary>Add Mission Line<\/summary>/);
  assert.ok(html.indexOf('id="sam-panel"') < html.indexOf('id="custom-panel"'));
});

test("SAM and Custom use pale default fill colors with fill initially off", () => {
  assert.match(html, /id="sam-fill-color" type="color" value="#f6d6d6"/);
  assert.match(html, /id="custom-fill-color" type="color" value="#dadddf"/);
  assert.match(html, /id="sam-fill-row"[^>]*hidden/);
  assert.match(html, /id="custom-fill-row"[^>]*hidden/);
  assert.doesNotMatch(html, /id="sam-fill-enabled" type="checkbox" checked/);
  assert.doesNotMatch(html, /id="custom-fill-enabled" type="checkbox" checked/);
});

test("SAM and Custom Point Line Area panels are initially collapsed", () => {
  assert.match(html, /<details id="sam-panel" class="panel">\s*<summary>Add SAM Ring<\/summary>/);
  assert.match(html, /<details id="custom-panel" class="panel">\s*<summary>Add Custom Point \/ Line \/ Area<\/summary>/);
});

test("global Settings include magnetic variation and synchronized display format controls", () => {
  assert.match(html, /<h2>Settings<\/h2>/);
  assert.match(html, /Magnetic variation mode/);
  assert.match(html, /<select id="bull-magvar-mode"><option value="gsi2020">Auto \(Japan GSI 2020\.0\)<\/option><option value="auto">Auto \(WMM2025\)<\/option><option value="manual">Manual<\/option><option value="none">None \(True\)<\/option><\/select>/);
  assert.match(html, /Display format/);
  assert.match(html, /id="settings-coordinate-format"/);
  assert.match(html, /id="coordinate-format"/);
  assert.match(html, /function setCoordinateFormat/);
  assert.match(html, /\.setting-row\s*\{[^}]*justify-self:\s*start/);
  assert.match(html, /\.setting-row \.format-toggle\s*\{[^}]*width:\s*max-content/);
  assert.doesNotMatch(html, /Auto\/Manual treat headings and bearings as magnetic\. None treats them as true\./);
});

test("Custom Point Line Area supports Box, fill control, and Arc point counts", () => {
  for (const id of ["custom-form", "custom-point-mode", "custom-coordinates", "custom-bearing", "custom-range", "custom-generate", "custom-point-list", "custom-close-shape", "custom-fill-enabled", "custom-line-color", "custom-fill-color", "custom-name", "custom-box-center-mode", "custom-box-at-bullseye", "custom-box-coordinates", "custom-box-bearing", "custom-box-range", "custom-box-x", "custom-box-y", "custom-box-y-bearing", "custom-arc-center-mode", "custom-arc-at-bullseye", "custom-arc-coordinates", "custom-arc-count-mode", "custom-arc-count", "custom-arc-summary"]) {
    assert.match(html, new RegExp(`id="${id}"`));
  }
  assert.match(html, /const customPoints = \[\]/);
  assert.match(html, />Box</);
  assert.match(html, /<option value="arc">Arc<\/option>/);
  assert.doesNotMatch(html, />B\/E Arc</);
  assert.match(html, />Generate</);
  assert.match(html, /Custom Point/);
});

test("Object and pending point lists use Pointer Events reordering", () => {
  assert.match(html, /function bindPointerReorder/);
  assert.match(html, /pointerdown/);
  assert.match(html, /pointermove/);
  assert.match(html, /pointerup/);
  assert.match(html, /className = "drag-handle"/);
  assert.match(html, /moveArrayItem/);
  assert.match(html, /selectstart/);
  assert.match(html, /draggable = false/);
});

test("reordering supports continuous movement and immediate touch dragging", () => {
  assert.doesNotMatch(html, /elementFromPoint/);
  assert.doesNotMatch(html, /setTimeout\(activate,\s*350\)/);
  assert.match(html, /getBoundingClientRect/);
  assert.match(html, /handle\.setPointerCapture/);
  assert.match(html, /#object-list \.drag-handle,\s*#custom-point-list \.drag-handle\s*\{\s*touch-action:\s*none/);
});

test("reordering preserves pointer capture by moving data only on pointerup", () => {
  const reorder = html.match(/function bindPointerReorder[\s\S]*?\n\s{6}\}/)?.[0] || "";
  const move = reorder.match(/const move = event => \{[\s\S]*?\n\s{10}\};/)?.[0] || "";
  const end = reorder.match(/const end = event => \{[\s\S]*?\n\s{10}\};/)?.[0] || "";
  assert.doesNotMatch(move, /insertBefore|moveArrayItem|render\(\)/);
  assert.match(move, /dropIndex/);
  assert.match(end, /moveArrayItem/);
  assert.match(end, /render\(\)/);
});

test("coordinate lists align point numbers without adding text padding", () => {
  assert.match(html, /className = "coordinate-entry"/);
  assert.match(html, /className = "coordinate-index"/);
  assert.match(html, /className = "coordinate-value"/);
  assert.match(html, /\.coordinate-entry\s*\{[^}]*grid-template-columns:\s*3ch 1fr/);
  assert.match(html, /\.coordinate-index\s*\{[^}]*text-align:\s*right/);
  assert.match(html, /font-variant-numeric:\s*tabular-nums/);
});

test("public disclaimer and privacy statement are present", () => {
  assert.match(html, /Copyright © 2026 hemi-taro\. All rights reserved\./);
  assert.match(html, /Do not use this tool as the sole source/);
  assert.match(html, /does not collect or transmit data/);
});

test("application name is Tacticool KML", () => {
  assert.match(html, /<title>Tacticool KML<\/title>/);
  assert.match(html, /<h1>Tacticool KML <span id="app-version"><\/span><\/h1>/);
  assert.match(html, /document\.title = `Tacticool KML v\$\{APP_VERSION\}`/);
});

test("field layout follows the v0.12 section order", () => {
  assert.ok(html.indexOf("<h2>Magnetic Variation</h2>") < html.indexOf("<h2>Bullseye</h2>"));
  const bull = html.match(/<h2>Bullseye<\/h2>([\s\S]*?)<\/section>/)?.[1] || "";
  assert.ok(bull.indexOf('id="bull-coordinates"') < bull.indexOf('id="bull-name"'));
  for (const [formId, buttonText, nameId] of [["sam-form","Add SAM Ring","sam-name"],["axis-form","Add Axis","axis-name"],["mission-form","Add Mission Line","mission-name"]]) {
    const form = html.match(new RegExp(`<form id="${formId}">([\\s\\S]*?)<\\/form>`))?.[1] || "";
    assert.match(form, new RegExp(`<div class="actions add-with-name">[\\s\\S]*?<button type="submit">${buttonText}<\\/button>[\\s\\S]*?id="${nameId}"`));
  }
  const toolbar = html.match(/<div class="section-toolbar">([\s\S]*?)<\/div>\s*<\/div>\s*<ul id="object-list"/)?.[1] || "";
  assert.match(toolbar, /id="coordinate-format"/);
  assert.match(toolbar, /id="clear-all"/);
});

test("Add actions include Object List jump controls", () => {
  assert.match(html, /function scrollToObjectList/);
  assert.match(html, /class="[^"]*object-list-jump[^"]*"/);
  assert.match(html, /aria-label="Go to Object List"/);
  assert.match(html, /scrollIntoView\(\{ behavior: "smooth", block: "start" \}\)/);
});

test("successful KML download message clears automatically", () => {
  assert.match(html, /function showTemporaryExportMessage/);
  assert.match(html, /setTimeout\(\(\)=>\{if\(message\.textContent===text\)message\.textContent=""\;\},3000\)/);
  assert.match(html, /showTemporaryExportMessage\("KML download started\."\)/);
});

test("coordinate fields use single-line textareas with the standard text keyboard", () => {
  for (const id of ["bull-coordinates", "sam-coordinates"]) {
    const field = html.match(new RegExp(`<textarea id="${id}"[^>]*>`))?.[0];
    assert.ok(field, `${id} must exist`);
    assert.match(field, /class="coordinate-field"/);
    assert.match(field, /rows="1"/);
    assert.match(field, /inputmode="text"/);
    assert.match(field, /autocomplete="off"/);
    assert.match(field, /autocorrect="off"/);
    assert.match(field, /autocapitalize="characters"/);
    assert.match(field, /spellcheck="false"/);
    assert.match(field, /name="coordinate-entry"/);
  }
  assert.match(html, /document\.querySelectorAll\("\.coordinate-field"\)\.forEach\(preventFieldNewline\)/);
});

test("numeric fields use the standard decimal keyboard without step restrictions", () => {
  for (const id of ["sam-range", "sam-radius", "axis-length", "tick-start", "tick-end", "tick-main-interval", "tick-main-width", "tick-sub-interval", "tick-sub-width", "mission-distance", "mission-width"]) {
    const field = html.match(new RegExp(`<input id="${id}"[^>]*>`))?.[0];
    assert.ok(field, `${id} must exist`);
    assert.match(field, /inputmode="decimal"/);
    assert.doesNotMatch(field, /step=/);
  }
});

test("Geometry import uses FileReader for iOS compatibility", () => {
  const fileInput = html.match(/<input id="import-geometry-file"[^>]*>/)?.[0] || "";
  assert.ok(fileInput, "Geometry file input must exist");
  assert.doesNotMatch(fileInput, /accept=/);
  assert.match(html, /id="import-geometry"[^>]*>Import Geometry</);
  assert.match(html, /new FileReader\(\)/);
  assert.match(html, /readAsText\(file\)/);
  assert.doesNotMatch(html, /await file\.text\(\)/);
});

test("PWA metadata and service worker registration are present", () => {
  assert.match(html, /rel="manifest"\s+href="\.\/manifest\.json"/);
  assert.match(html, /rel="apple-touch-icon"/);
  assert.match(html, /navigator\.serviceWorker\.register\("\.\/service-worker\.js"\)/);
});

test("KML and JSON export use file-download actions", () => {
  assert.match(html, /id="export-kml"/);
  assert.match(html, /id="export-json"/);
  assert.doesNotMatch(html, /id="share-kml"/);
  assert.doesNotMatch(html, /navigator\.share/);
  assert.match(html, /function exportKml/);
  assert.match(html, /function createKmlFile/);
  assert.match(html, /function downloadFile/);
  assert.match(html, /buildGeoJson/);
});

test("custom aviation keyboard is removed", () => {
  assert.doesNotMatch(html, /data-aviation/);
  assert.doesNotMatch(html, /aviation-keyboard/);
  assert.doesNotMatch(html, /function openAviationKeyboard/);
});

test("standard iOS inputs retain 16px text to prevent zoom", () => {
  assert.match(html, /input,\s*select,\s*textarea\s*\{[^}]*font-size:\s*16px/s);
});

test("SAM center method labels remain short enough for iPad", () => {
  assert.match(html, />B\/E Bearing \/ Range</);
  assert.doesNotMatch(html, />Bearing \/ Range from B\/E</);
  assert.match(html, /id="sam-at-bullseye"/);
  assert.match(html, /id="sam-name"[^>]*placeholder="SAM center coordinates"/);
});

test("SAM and Box preserve center metadata for Object List details", () => {
  assert.match(html, /center:\s*\{\s*\.\.\.center\s*\}/);
  assert.match(html, /radius,\s*\n\s*coordinates:\s*generateCircle/);
  assert.match(html, /pendingCustomCenter/);
  assert.match(html, /Center:/);
});

test("magnetic variation mode supports true heading input", () => {
  assert.match(html, /<option value="none">None \(True\)<\/option>/);
  assert.equal(context.resolveTrueBearing(45, { mode: "none", magVar: -8 }), 45);
  assert.equal(context.resolveTrueBearing(45, { mode: "manual", magVar: -8 }), 37);
  assert.equal(context.resolveTrueBearing(350, { mode: "auto", magVar: 15 }), 5);
});

test("active Bullseye summaries appear in geometry panels and details", () => {
  for (const id of ["axis-active-bullseye", "sam-active-bullseye", "custom-active-bullseye"]) {
    assert.match(html, new RegExp(`id="${id}"`));
  }
  assert.match(html, /Created B\/E:/);
  assert.match(html, /function bullseyeValueText/);
  assert.match(html, /function variationForObjectPoint/);
  assert.match(html, /function formatCoordinateWithVariation/);
  assert.match(html, /function inboundMagneticHeading/);
  assert.match(html, /Endpoint Var:/);
  assert.match(html, /Inbound HDG:/);
  assert.doesNotMatch(html, /Endpoint variation:/);
  assert.doesNotMatch(html, /Center variation:/);
  assert.match(html, /save\.textContent = "Rename"/);
});

test("color controls use compact native picker plus preset swatches", () => {
  assert.match(html, /class="color-control"/);
  assert.match(html, /className = "color-presets"/);
  assert.match(html, /#FBC02D/);
  assert.doesNotMatch(html, /#FFFF00/);
  assert.match(html, /function createPresetColorEditor/);
  assert.match(html, /className = "object-detail-grid"/);
  assert.match(html, /\.object-detail-grid\s*\{[^}]*display:\s*flex/);
  assert.match(html, /\.object-name-edit label\s*\{[^}]*width:\s*300px/);
  assert.match(html, /function updateObjectColorProperty/);
  assert.match(html, /data-color-object-id/);
  assert.doesNotMatch(html, /grid-template-columns:\s*minmax\(240px,\s*300px\) minmax\(0,\s*1fr\)/);
});

test("Object List details can be collapsed from a floating control", () => {
  assert.match(html, /id="object-list-section"/);
  assert.match(html, /id="collapse-object-details"/);
  assert.match(html, /aria-label="Collapse all object details"/);
  assert.match(html, /expandedObjectIds\.size > 0/);
  assert.match(html, /expandedObjectIds\.clear\(\)/);
});

test("successful object creation clears transient geometry fields", () => {
  assert.match(html, /function clearFields/);
  assert.match(html, /clearFields\(\["sam-name","sam-coordinates","sam-bearing","sam-range","sam-radius"\]\)/);
  assert.match(html, /clearFields\(\["axis-heading","axis-name","axis-length","tick-start","tick-end","tick-main-interval","tick-main-width","tick-sub-interval","tick-sub-width"\]\)/);
  assert.match(html, /clearFields\(\["mission-name","mission-distance","mission-width"\]\)/);
});

test("coordinate parser detects DD DDM and DMS by decimal and digit count", () => {
  assert.equal(context.parseCoordinateInput("35.508333", true), 35.508333);
  assert.equal(context.parseCoordinateInput("35", true), 35);
  assert.equal(context.parseCoordinateInput("135", false), 135);
  assert.ok(Math.abs(context.parseCoordinateInput("3530.500N", true) - 35.5083333333) < 1e-9);
  assert.ok(Math.abs(context.parseCoordinateInput("353030N", true) - 35.5083333333) < 1e-9);
  assert.ok(Math.abs(context.parseCoordinateInput("13520.000E", false) - 135.3333333333) < 1e-9);
  assert.ok(Math.abs(context.parseCoordinateInput("1352000W", false) - (-135.3333333333)) < 1e-9);
  assert.throws(() => context.parseCoordinateInput("3560.0N", true), /Invalid/);
  assert.equal(context.parseCoordinateInput("34° 4' N", true), 34 + 4 / 60);
  assert.equal(context.parseCoordinateInput("129° 4' E", false), 129 + 4 / 60);
  assert.ok(Math.abs(context.parseCoordinateInput("34° 4' 30\" N", true) - (34 + 4 / 60 + 30 / 3600)) < 1e-9);
});

test("coordinate pair parser accepts slash and comma separators with whitespace", () => {
  const googlePair = context.parseCoordinatePair("33.6767373218162, 131.0185685567963");
  assert.equal(googlePair.lat, 33.6767373218162);
  assert.equal(googlePair.lon, 131.0185685567963);
  const pair = context.parseCoordinatePair("3530.500N / 13520.000E");
  assert.ok(Math.abs(pair.lat - 35.5083333333) < 1e-9);
  assert.ok(Math.abs(pair.lon - 135.3333333333) < 1e-9);
  assert.throws(() => context.parseCoordinatePair("35.5 135.3"), /separator/);
});

test("coordinate pair parser accepts compact hemisphere-delimited coordinates", () => {
  const pair = context.parseCoordinatePair("3500N12900E");
  assert.equal(pair.lat, 35);
  assert.equal(pair.lon, 129);
  const southWest = context.parseCoordinatePair("3500S12900W");
  assert.equal(southWest.lat, -35);
  assert.equal(southWest.lon, -129);
});

test("coordinate pair parser accepts GEOREF input", () => {
  const pair = context.parseCoordinatePair("WJLL0000");
  assert.equal(pair.lat, 40);
  assert.equal(pair.lon, 130);
  const spaced = context.parseCoordinatePair("WJ LL 0000");
  assert.equal(spaced.lat, 40);
  assert.equal(spaced.lon, 130);
  assert.throws(() => context.parseCoordinatePair("IIBE00000000"), /Invalid GEOREF/);
});

test("coordinate pair format detection follows DD DDM and DMS input", () => {
  assert.equal(context.detectCoordinatePairFormat("35.5, 129.5"), "dd");
  assert.equal(context.detectCoordinatePairFormat("3500N12900E"), "ddm");
  assert.equal(context.detectCoordinatePairFormat("350000N1290000E"), "dms");
  assert.equal(context.detectCoordinatePairFormat("35° 00' 00\" N / 129° 00' 00\" E"), "dms");
  assert.equal(context.formatCoordinatePair({ lat: 35, lon: 129 }, "ddm"), "35° 00.0000' N / 129° 00.0000' E");
  assert.equal(context.formatCoordinatePairCompact({ lat: 34 + 50 / 60, lon: 129 + 45 / 60 }, "ddm"), "34° 50' N / 129° 45' E");
  assert.equal(context.formatCoordinatePairCompact({ lat: 34 + 4 / 60, lon: 129 + 4 / 60 }, "ddm"), "34° 04' N / 129° 04' E");
  assert.equal(context.formatCoordinatePairCompact({ lat: 34, lon: 129 }, "ddm"), "34° N / 129° E");
});

test("default object names include object type and reference coordinates", () => {
  const center = { lat: 35, lon: 129 };
  assert.equal(context.formatSamDefaultName(center, "ddm"), "SAM 35° N / 129° E");
  assert.equal(context.formatBoxDefaultName(center, "ddm"), "BOX 35° N / 129° E");
  assert.equal(context.formatArcDefaultName(center, "ddm"), "ARC 35° N / 129° E");
  assert.equal(context.formatAxisDefaultName(45, center, "ddm"), "AXIS 045/225 35° N / 129° E");
});

test("mission line default name uses distance", () => {
  assert.equal(context.formatMissionLineName(25), "25NM");
  assert.equal(context.formatMissionLineName(12.5), "12.5NM");
});

test("default axis name contains heading and reciprocal", () => {
  assert.equal(context.formatAxisName(45), "045/225");
  assert.equal(context.formatAxisName(270), "270/090");
  assert.equal(context.formatAxisName(180), "180/360");
});

test("arc points support auto and manual counts while rejecting full circles", () => {
  assert.equal(context.generateArcPoints({ lat: 0, lon: 0 }, 350, 10, 20, "cw").length, 5);
  assert.equal(context.generateArcPoints({ lat: 0, lon: 0 }, 0, 90, 20, "cw", 10).length, 10);
  assert.deepEqual(Object.assign({}, context.describeArcPoints(0, 92, "cw", "auto")), { pointCount: 20, intervalDegrees: 92 / 19, sweepDegrees: 92 });
  assert.deepEqual(Object.assign({}, context.describeArcPoints(0, 90, "cw", 10)), { pointCount: 10, intervalDegrees: 10, sweepDegrees: 90 });
  assert.throws(() => context.describeArcPoints(0, 90, "cw", 182), /between 3 and 181/);
  assert.throws(() => context.generateArcPoints({ lat: 0, lon: 0 }, 0, 360, 20, "cw"), /different/);
});

test("box generation uses complete side lengths and positive Y bearing", () => {
  const box = context.generateBoxPoints({ lat: 0, lon: 0 }, 20, 40, 0);
  assert.equal(box.length, 5);
  assert.deepEqual(box[0], box.at(-1));
  const northSouthSpan = Math.max(...box.map(point => point.lat)) - Math.min(...box.map(point => point.lat));
  const eastWestSpan = Math.max(...box.map(point => point.lon)) - Math.min(...box.map(point => point.lon));
  const degreesPerNm = 180 / Math.PI / context.EARTH_RADIUS_NM;
  assert.ok(Math.abs(northSouthSpan - 40 * degreesPerNm) < 1e-4);
  assert.ok(Math.abs(eastWestSpan - 20 * degreesPerNm) < 1e-4);
});

test("default document name uses local date and time", () => {
  assert.equal(context.formatLocalDateTime(new Date(2026, 5, 11, 9, 7)), "2026-06-11-0907");
  assert.equal(context.resolveDocumentName("", new Date(2026, 5, 11, 9, 7)), "2026-06-11-0907");
  assert.equal(context.resolveDocumentName("Mission A", new Date(2026, 5, 11, 9, 7)), "Mission A");
});

test("required number rejects blank values", () => {
  assert.throws(() => context.parseRequiredNumber("", "Latitude"), /Latitude is required/);
  assert.equal(context.parseRequiredNumber("0", "Latitude"), 0);
});

test("optional number uses fallback only when blank", () => {
  assert.equal(context.parseOptionalNumber("", 80, "End"), 80);
  assert.equal(context.parseOptionalNumber("0", 80, "End"), 0);
});

test("WMM2025 calculates magnetic variation at sea level", () => {
  const tokyoArea = context.calculateWmmDeclination(35.5, 135.333333, new Date("2026-06-11T00:00:00Z"));
  const equator = context.calculateWmmDeclination(0, 0, new Date("2025-01-01T00:00:00Z"));
  assert.ok(Math.abs(tokyoArea - (-8.4119013884)) < 0.001, `Tokyo-area declination was ${tokyoArea}`);
  assert.ok(Math.abs(equator - (-4.0162438615)) < 0.001, `Equator declination was ${equator}`);
});

test("Japan GSI 2020.0 approximate variation is converted to east-positive", () => {
  const tokyo = context.calculateGsi2020ApproxDeclination(35.68, 139.70);
  assert.ok(Math.abs(tokyo - (-7.6083)) < 0.01, `Tokyo GSI east-positive declination was ${tokyo}`);
  assert.throws(() => context.calculateGsi2020ApproxDeclination(19.9, 139.70), /Change Magnetic variation mode to Auto \(WMM2025\)/);
  const contextAtTokyo = context.bearingContextForPoint({ mode: "gsi2020" }, { lat: 35.68, lon: 139.70 });
  assert.equal(contextAtTokyo.mode, "gsi2020");
  assert.ok(Math.abs(contextAtTokyo.magVar - tokyo) < 0.000001);
});

test("DDM converts to signed decimal degrees", () => {
  assert.equal(context.ddmToDecimal(35, 30.5, "N"), 35 + 30.5 / 60);
  assert.equal(context.ddmToDecimal(135, 20, "W"), -(135 + 20 / 60));
  assert.throws(() => context.ddmToDecimal(35, 60, "N"));
  assert.throws(() => context.validateLatLon(90.5, 135), /Latitude/);
  assert.throws(() => context.validateLatLon(35, 180.5), /Longitude/);
});

test("bearings normalize and magnetic converts to true", () => {
  assert.equal(context.normalizeBearing(370), 10);
  assert.equal(context.normalizeBearing(-10), 350);
  assert.equal(context.magToTrue(350, 15), 5);
  assert.equal(context.trueToMag(40, -7), 47);
});

test("destination point travels one degree of latitude north", () => {
  const distance = Math.PI / 180 * context.EARTH_RADIUS_NM;
  const point = context.destinationPoint(0, 0, 0, distance);
  assert.ok(Math.abs(point.lat - 1) < 1e-9);
  assert.ok(Math.abs(point.lon) < 1e-9);
});

test("circle is closed and has requested segments", () => {
  const circle = context.generateCircle(35, 135, 10, 72);
  assert.equal(circle.length, 73);
  assert.deepEqual(circle[0], circle.at(-1));
});

test("perpendicular line is centered at requested distance along axis", () => {
  const line = context.generatePerpendicularLine({ lat: 0, lon: 0 }, 0, 60, 20);
  assert.equal(line.length, 2);
  const midpointLat = (line[0].lat + line[1].lat) / 2;
  assert.ok(Math.abs(midpointLat - 60 / context.EARTH_RADIUS_NM * 180 / Math.PI) < 1e-4);
  assert.ok(line[0].lon < 0);
  assert.ok(line[1].lon > 0);
});

test("tickmarks include start and end distances", () => {
  const marks = context.generateTickmarks({ lat: 35, lon: 135 }, 45, 10, 30, 10, 20);
  assert.deepEqual(Array.from(marks, mark => mark.distanceNm), [10, 20, 30]);
  assert.ok(marks.every(mark => mark.coordinates.length === 2));
});

test("combined tickmarks skip sub marks where main marks exist", () => {
  const marks = context.generateCombinedTickmarks({ lat: 35, lon: 135 }, 45, {
    startNm: 0,
    endNm: 30,
    mainIntervalNm: 10,
    mainWidthNm: 20,
    subIntervalNm: 5,
    subWidthNm: 10
  });
  assert.deepEqual(Array.from(marks, mark => `${mark.kind}:${mark.distanceNm}`), [
    "Main:0", "Sub:5", "Main:10", "Sub:15", "Main:20", "Sub:25", "Main:30"
  ]);
  assert.ok(marks.every(mark => mark.coordinates.length === 2));
});

test("KML uses longitude latitude order and KML colors", () => {
  assert.equal(context.toKmlColor("#123456"), "ff563412");
  const kml = context.buildKml("Mission", [{
    id: "x",
    name: "Axis & One",
    type: "axis",
    color: "#123456",
    coordinates: [{ lat: 35, lon: 135 }, { lat: 36, lon: 136 }]
  }]);
  assert.match(kml, /135\.000000,35\.000000,0/);
  assert.match(kml, /ff563412/);
  assert.match(kml, /Axis &amp; One/);
});

test("bearing context resolves local auto variation without requiring Bullseye", () => {
  const directCenter = { lat: 35.5, lon: 135.333333 };
  const contextAtCenter = context.bearingContextForPoint({ mode: "auto" }, directCenter, new Date("2026-06-11T00:00:00Z"));
  assert.equal(contextAtCenter.mode, "auto");
  assert.ok(Math.abs(contextAtCenter.magVar - (-8.4119013884)) < 0.001);
  assert.equal(context.resolveTrueBearing(90, { mode: "none", magVar: contextAtCenter.magVar }), 90);
});

test("KML exports Point without an external icon href", () => {
  const kml = context.buildKml("Mission", [{
    name: "Point One",
    type: "Custom Point",
    color: "#123456",
    coordinates: [{ lat: 35, lon: 135 }]
  }], 4);
  assert.match(kml, /<IconStyle><color>ff563412<\/color><\/IconStyle>/);
  assert.match(kml, /<Point><coordinates>135\.000000,35\.000000,0<\/coordinates><\/Point>/);
  assert.doesNotMatch(kml, /<href>/);
});

test("GeoJSON exports points lines and polygons with properties", () => {
  const geojson = JSON.parse(context.buildGeoJson("Mission", [
    { name: "Point", type: "Custom Point", color: "#123456", coordinates: [{ lat: 35, lon: 135 }] },
    { name: "Line", type: "Axis", color: "#234567", coordinates: [{ lat: 35, lon: 135 }, { lat: 36, lon: 136 }] },
    { name: "Area", type: "Custom Area", color: "#345678", fillColor: "#abcdef", coordinates: [{ lat: 35, lon: 135 }, { lat: 35, lon: 136 }, { lat: 36, lon: 136 }, { lat: 35, lon: 135 }] }
  ]));
  assert.equal(geojson.type, "FeatureCollection");
  assert.equal(geojson.name, "Mission");
  assert.deepEqual(Array.from(geojson.features, feature => feature.geometry.type), ["Point", "LineString", "Polygon"]);
  assert.deepEqual(Array.from(geojson.features[0].geometry.coordinates), [135, 35]);
  assert.equal(geojson.features[2].properties.fillColor, "#abcdef");
});

test("GeoJSON import flattens multi and collection geometries", () => {
  const imported = context.parseGeoJsonObjects(JSON.stringify({
    type: "FeatureCollection",
    features: [{
      type: "Feature",
      properties: { name: "Mixed", lineColor: "#123456" },
      geometry: {
        type: "GeometryCollection",
        geometries: [
          { type: "Point", coordinates: [135, 35] },
          { type: "MultiLineString", coordinates: [[[135, 35], [136, 36]], [[137, 37], [138, 38]]] },
          { type: "MultiPolygon", coordinates: [[[[135, 35], [136, 35], [136, 36], [135, 35]]]] }
        ]
      }
    }]
  }));
  assert.deepEqual(Array.from(imported, object => object.type), ["Imported Point", "Imported Line", "Imported Line", "Imported Polygon"]);
  assert.equal(imported[0].coordinates.length, 1);
  assert.equal(imported[3].fillColor, null);
});

test("WebGIS JSON import reads polyline polygon circle and symbol objects", () => {
  const imported = context.parseGeometryJsonObjects(JSON.stringify([
    {
      name: "Route",
      type: "polyline",
      points: ["350000N1290000E", "351000N1291000E"],
      color: "rgba(37, 102, 234, 1)"
    },
    {
      name: "Area",
      type: "polygon",
      points: ["350000N1290000E", "350000N1291000E", "351000N1291000E", "350000N1290000E"],
      color: "rgba(233, 37, 37, 0.2)",
      fill: true
    },
    {
      name: "SAM",
      type: "circle",
      center: "350000N1290000E",
      radius: 25,
      color: "rgba(233, 37, 37, 0.2)",
      fill: true
    },
    {
      name: "Point",
      type: "symbol",
      point: "350000N1290000E",
      color: "rgba(37, 102, 234, 1)"
    }
  ]));
  assert.deepEqual(Array.from(imported, object => object.type), ["Imported Line", "Imported Polygon", "SAM Ring", "Imported Point"]);
  assert.equal(imported[0].color, "#2566ea");
  assert.equal(imported[1].fillColor, "#e92525");
  assert.equal(imported[2].radius, 25);
  assert.equal(imported[2].coordinates.length, 73);
  assert.equal(imported[3].coordinates.length, 1);
});

test("KML export applies document line width", () => {
  const kml = context.buildKml("Mission", [{
    name: "Axis",
    color: "#123456",
    coordinates: [{ lat: 35, lon: 135 }, { lat: 36, lon: 136 }]
  }], 4);
  assert.match(kml, /<width>4<\/width>/);
});

test("KML export preserves object list order and creates filled polygons", () => {
  const kml = context.buildKml("Mission", [
    { name: "First", color: "#123456", coordinates: [{ lat: 35, lon: 135 }, { lat: 36, lon: 136 }] },
    { name: "Area", color: "#455a64", fillColor: "#87abbd", coordinates: [{ lat: 35, lon: 135 }, { lat: 35, lon: 136 }, { lat: 36, lon: 136 }, { lat: 35, lon: 135 }] }
  ], 4);
  assert.ok(kml.indexOf("<name>First</name>") < kml.indexOf("<name>Area</name>"));
  assert.match(kml, /<Polygon>/);
  assert.match(kml, /<PolyStyle><color>55bdab87<\/color><\/PolyStyle>/);
});

test("KML exports a Custom Area without fill when fill is disabled", () => {
  const kml = context.buildKml("Mission", [{
    name: "Outline",
    type: "Custom Area",
    color: "#455a64",
    fillColor: null,
    coordinates: [{ lat: 35, lon: 135 }, { lat: 35, lon: 136 }, { lat: 36, lon: 136 }, { lat: 35, lon: 135 }]
  }], 4);
  assert.match(kml, /<Polygon>/);
  assert.match(kml, /<PolyStyle><fill>0<\/fill><\/PolyStyle>/);
});

test("preview projection fits coordinates into SVG viewbox", () => {
  const points = context.projectPreviewCoordinates([
    { lat: 35, lon: 135 },
    { lat: 36, lon: 136 }
  ], 600, 300, 20);
  assert.ok(points.every(point => point.x >= 20 && point.x <= 580));
  assert.ok(points.every(point => point.y >= 20 && point.y <= 280));
});

test("coordinate display supports DD DDM and DMS", () => {
  assert.equal(context.formatCoordinate(35.5083333333, true, "dd"), "35.508333N");
  assert.equal(context.formatCoordinate(35.5083333333, true, "ddm"), "35° 30.5000' N");
  assert.equal(context.formatCoordinate(35.0833333333, true, "ddm"), "35° 05.0000' N");
  assert.equal(context.formatCoordinate(-135.3333333333, false, "dms"), "135° 20' 00.00\" W");
});

test("KML coordinate text parser reads longitude latitude order", () => {
  const points = context.parseKmlCoordinateText("135.000000,35.000000,0 136.000000,36.000000,0");
  assert.equal(points.length, 2);
  assert.equal(points[0].lat, 35);
  assert.equal(points[0].lon, 135);
});
