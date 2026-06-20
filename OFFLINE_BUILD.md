# Offline Build Handoff

This document defines the manual-update offline handoff artifact for environments without external web access.

## Purpose

- Create a manual-update offline copy from the current `index.html`.
- The output is a DOCX containing the modified HTML source text only.
- The DOCX is intended to be converted back to `index.html` inside the offline environment.

## Output

- File name: `offline-build/tacticool-kml-offline-vX.X.X.docx`
- The DOCX must contain only the modified HTML source text.
- No line numbers.
- No procedure text.
- The first paragraph must be `<!doctype html>`.

## Required HTML Changes

Start from the current `index.html`, then:

- Remove the update button from the header.
- Remove `refreshAppCache()`.
- Remove the `update-app` click event listener.
- Remove `navigator.serviceWorker.register(...)`.
- Remove PWA install/cache metadata:
  - `<link rel="manifest" ...>`
  - `<link rel="apple-touch-icon" ...>`
  - `<meta name="apple-mobile-web-app-*" ...>`
  - `<meta name="theme-color" ...>`
- Add a header-side offline notice where the update button normally appears.

## Offline Notice

Use the current app version in the notice:

```html
<div class="offline-build-notice">
  Manual-update offline copy vX.X.X. Automatic updates are disabled.<br>
  Latest public version: https://hemi-taro.github.io/tacticool-kml/
</div>
```

The notice may link to the public URL, but the offline copy must not depend on that URL for runtime behavior.

## Verification

Confirm the generated DOCX text contains:

- Current `APP_VERSION`
- `Manual-update offline copy`
- `Latest public version`
- `https://hemi-taro.github.io/tacticool-kml/`

Confirm the generated DOCX text does not contain:

- `id="update-app"`
- `refreshAppCache`
- `serviceWorker.register`
- `rel="manifest"`
- `apple-mobile-web-app`
- `apple-touch-icon`

Confirm the generated DOCX has no runtime external web dependency:

- No external `<script src="http...">`
- No external `<link href="http...">`
- No external `<img src="http...">`
- No external CSS `url(http...)`

Allowed URL-like strings:

- `https://hemi-taro.github.io/tacticool-kml/` inside the offline notice
- XML/SVG/KML namespace strings such as:
  - `http://www.opengis.net/kml/2.2`
  - `http://www.w3.org/2000/svg`

These namespace strings are identifiers, not network fetches.
