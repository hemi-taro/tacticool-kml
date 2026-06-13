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

test("app version is v0.10.5", () => {
  assert.equal(context.APP_VERSION, "0.10.5");
});

test("coordinate fields are not native inputs that can trigger iOS text assistance", () => {
  for (const id of ["bull-coordinates", "sam-coordinates"]) {
    const field = html.match(new RegExp(`<div id="${id}"[^>]*>`))?.[0];
    assert.ok(field, `${id} must exist`);
    assert.match(field, /data-aviation="coordinate"/);
    assert.match(field, /role="textbox"/);
    assert.doesNotMatch(html, new RegExp(`<input id="${id}"`));
  }
});

test("distance fields use custom input without HTML step restrictions", () => {
  for (const id of ["sam-range", "sam-radius", "axis-length", "tick-start", "tick-end", "tick-interval", "tick-width", "mission-distance", "mission-width"]) {
    const field = html.match(new RegExp(`<div id="${id}"[^>]*>`))?.[0];
    assert.ok(field, `${id} must exist`);
    assert.match(field, /data-aviation="numeric"/);
    assert.doesNotMatch(field, /step=/);
  }
});

test("KML import uses FileReader for iOS compatibility", () => {
  assert.match(html, /new FileReader\(\)/);
  assert.match(html, /readAsText\(file\)/);
  assert.doesNotMatch(html, /await file\.text\(\)/);
});

test("PWA metadata and service worker registration are present", () => {
  assert.match(html, /rel="manifest"\s+href="\.\/manifest\.json"/);
  assert.match(html, /rel="apple-touch-icon"/);
  assert.match(html, /navigator\.serviceWorker\.register\("\.\/service-worker\.js"\)/);
});

test("KML export uses one file-download action", () => {
  assert.match(html, /id="export-kml"/);
  assert.doesNotMatch(html, /id="share-kml"/);
  assert.doesNotMatch(html, /navigator\.share/);
  assert.match(html, /function exportKml/);
  assert.match(html, /function createKmlFile/);
  assert.match(html, /downloadKmlFile/);
});

test("aviation keyboard is wired to coordinate and numeric inputs", () => {
  assert.match(html, /id="aviation-keyboard"/);
  for (const id of ["bull-coordinates", "sam-coordinates", "sam-bearing", "axis-heading", "mission-distance"]) {
    const field = html.match(new RegExp(`<div id="${id}"[^>]*>`))?.[0];
    assert.ok(field, `${id} must be a non-input aviation field`);
    assert.match(field, /data-aviation=/);
    assert.match(field, /role="textbox"/);
  }
  assert.match(html, /function openAviationKeyboard/);
  assert.match(html, /function keepAviationInputVisible/);
  assert.match(html, /function initializeAviationFields/);
});

test("iOS zoom and keyboard handoff protections are present", () => {
  assert.match(html, /input,\s*select,\s*textarea\s*\{[^}]*font-size:\s*16px/s);
  assert.match(html, /function handoffToStandardInput/);
  assert.match(html, /hideAviationKeyboard\(\)/);
});

test("iPhone aviation keyboard toolbar and text field attributes are present", () => {
  assert.match(html, /id="aviation-toolbar"/);
  assert.match(html, /function openAviationKeyboardAfterBlur/);
  for (const id of ["bull-name", "sam-name", "axis-name", "mission-name", "document-name"]) {
    const field = html.match(new RegExp(`<textarea id="${id}"[^>]*>`))?.[0];
    assert.match(field, /rows="1"/);
    assert.match(field, /autocomplete="off"/);
    assert.match(field, /autocorrect="off"/);
    assert.match(field, /autocapitalize="sentences"/);
    assert.match(field, /spellcheck="true"/);
  }
  assert.match(html, /function preventNameFieldNewline/);
  assert.match(html, /\.name-field/);
});

test("aviation inputs stay focusless and same-input taps bypass viewport waiting", () => {
  const openFunction = html.match(/function openAviationKeyboard\(input\) \{([\s\S]*?)\n      \}/)?.[1] || "";
  const afterBlurFunction = html.match(/function openAviationKeyboardAfterBlur\(input\) \{([\s\S]*?)\n      \}/)?.[1] || "";
  assert.doesNotMatch(openFunction, /\.focus\(/);
  assert.doesNotMatch(openFunction, /input\.focus\(/);
  assert.match(afterBlurFunction, /aviationInput===input/);
  assert.match(afterBlurFunction, /if\(aviationInput===input&&document\.body\.classList\.contains\("aviation-open"\)\)\{return;\}/);
});

test("aviation visibility scrolling does not inspect the whole section", () => {
  const visibleFunction = html.match(/function keepAviationInputVisible\(\) \{([\s\S]*?)\n      \}/)?.[1] || "";
  assert.doesNotMatch(visibleFunction, /closest\("section"\)/);
  assert.doesNotMatch(visibleFunction, /section\?\.querySelector/);
  assert.match(visibleFunction, /nextElementSibling/);
});

test("aviation keyboard uses explicit allowed-key rules for each input mode", () => {
  assert.match(html, /function aviationKeyAllowed\(area,mode\)/);
  assert.match(html, /coordinateKeys/);
  assert.match(html, /numericKeys/);
  assert.match(html, /signedKeys/);
  const updateFunction = html.match(/function updateAviationKeys\(\) \{([\s\S]*?)\n      \}/)?.[1] || "";
  assert.match(updateFunction, /aviationKeyAllowed\(key\.dataset\.area,aviationInput\?\.dataset\.aviation\)/);
  assert.doesNotMatch(updateFunction, /mode!==aviationInput\?\.dataset\.aviation/);
});

test("aviation keyboard transitions cancel stale work and use tap completion", () => {
  assert.match(html, /let aviationTransitionId\s*=\s*0/);
  assert.match(html, /function cancelAviationTransition/);
  assert.match(html, /function scheduleAviationVisibility/);
  assert.match(html, /function bindAviationFieldTap/);
  assert.match(html, /pointerup/);
  assert.match(html, /pointercancel/);
  assert.match(html, /Math\.hypot/);
  assert.doesNotMatch(html, /input\.addEventListener\("pointerdown",\s*event\s*=>\s*\{\s*event\.preventDefault\(\);\s*openAviationKeyboardAfterBlur/);
});

test("aviation keyboard height follows visible key bounds and resets on close", () => {
  assert.match(html, /function aviationLayoutHeight/);
  assert.match(html, /Math\.max\(\.\.\.layout\.keys\.map/);
  const closeFunction = html.match(/function closeAviationKeyboard\(\) \{([\s\S]*?)\n      \}/)?.[1] || "";
  assert.match(closeFunction, /keyboard\.style\.bottom=""|keyboard\.style\.removeProperty\("bottom"\)/);
  assert.match(closeFunction, /document\.documentElement\.style\.setProperty\("--aviation-keyboard-height","0px"\)/);
});

test("closed aviation keyboard is fully hidden", () => {
  assert.match(html, /<aside id="aviation-keyboard"[^>]*hidden/);
  assert.match(html, /function showAviationKeyboard/);
  assert.match(html, /function hideAviationKeyboard/);
});

test("PWA header uses the top safe area and provides an update action", () => {
  assert.match(html, /header\s*\{[^}]*env\(safe-area-inset-top\)/s);
  const updateButton = html.match(/<button id="update-app"[^>]*>/)?.[0] || "";
  assert.match(updateButton, /aria-label="Check for Updates \/ Clear Cache"/);
  assert.match(updateButton, /title="Check for Updates \/ Clear Cache"/);
  assert.match(html, /<header>[\s\S]*id="update-app"[\s\S]*<\/header>/);
  assert.match(html, /function refreshAppCache/);
  assert.match(html, /caches\.keys\(\)/);
});

test("aviation keyboard stays fixed to the layout viewport bottom", () => {
  assert.doesNotMatch(html, /function positionAviationKeyboard/);
  assert.doesNotMatch(html, /visualViewport\.addEventListener/);
  assert.match(html, /#aviation-keyboard\s*\{[^}]*inset:\s*auto 0 0/s);
});

test("SAM center method labels remain short enough for iPad", () => {
  assert.match(html, />B\/E Bearing \/ Range</);
  assert.doesNotMatch(html, />Bearing \/ Range from B\/E</);
});

test("successful object creation clears transient geometry fields", () => {
  assert.match(html, /function clearAviationFields/);
  assert.match(html, /clearAviationFields\(\["sam-name","sam-coordinates","sam-bearing","sam-range","sam-radius"\]\)/);
  assert.match(html, /clearAviationFields\(\["axis-heading","axis-name","axis-length","tick-start","tick-end","tick-interval","tick-width"\]\)/);
  assert.match(html, /clearAviationFields\(\["mission-name","mission-distance","mission-width"\]\)/);
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

test("mission line default name uses distance", () => {
  assert.equal(context.formatMissionLineName(25), "25NM");
  assert.equal(context.formatMissionLineName(12.5), "12.5NM");
});

test("default axis name contains heading and reciprocal", () => {
  assert.equal(context.formatAxisName(45), "045/225");
  assert.equal(context.formatAxisName(270), "270/090");
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

test("KML export applies document line width", () => {
  const kml = context.buildKml("Mission", [{
    name: "Axis",
    color: "#123456",
    coordinates: [{ lat: 35, lon: 135 }, { lat: 36, lon: 136 }]
  }], 4);
  assert.match(kml, /<width>4<\/width>/);
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
  assert.equal(context.formatCoordinate(-135.3333333333, false, "dms"), "135° 20' 00.00\" W");
});

test("KML coordinate text parser reads longitude latitude order", () => {
  const points = context.parseKmlCoordinateText("135.000000,35.000000,0 136.000000,36.000000,0");
  assert.equal(points.length, 2);
  assert.equal(points[0].lat, 35);
  assert.equal(points[0].lon, 135);
});
