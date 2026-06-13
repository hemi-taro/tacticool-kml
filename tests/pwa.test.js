const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.join(__dirname, "..");
const manifest = JSON.parse(fs.readFileSync(path.join(root, "manifest.json"), "utf8"));
const worker = fs.readFileSync(path.join(root, "service-worker.js"), "utf8");

test("manifest supports standalone offline installation", () => {
  assert.equal(manifest.start_url, "./");
  assert.equal(manifest.scope, "./");
  assert.equal(manifest.display, "standalone");
  assert.ok(manifest.icons.length >= 2);
});

test("service worker caches the PWA shell and removes old caches", () => {
  assert.match(worker, /msn-line-tool-v0\.10\.7/);
  for (const file of ["./", "./index.html", "./manifest.json", "./icon-192.png", "./icon-512.png"]) {
    assert.match(worker, new RegExp(file.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
  assert.match(worker, /caches\.delete/);
  assert.match(worker, /event\.respondWith/);
});
