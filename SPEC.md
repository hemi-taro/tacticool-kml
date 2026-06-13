\# Tacticool KML v0.14.1



\## Goal



Create a small, standalone, fully offline iPad web tool for generating mission geometry lines and exporting them as KML files.



This is a separate project from the existing GPX Replay app. Do not integrate with the existing app.



\## Target Environment



\- iPad Safari

\- Fully offline use

\- No backend server requirement

\- No external map tiles

\- No internet dependency

\- Installed PWA header respects the iOS top safe area

\- Coordinate and name fields use the standard iOS text keyboard

\- Coordinate fields request that iOS disable autocomplete, autocorrect, capitalization, and spellcheck

\- Coordinate fields are single-line textareas; Enter closes the keyboard without adding a line break

\- KML Import does not filter the iOS file picker; selected files are validated after reading

\- Update/cache-clear action requires an internet connection, clears PWA caches, and reloads the app

\- Successful SAM, Axis, and Mission Line creation clears transient geometry input fields

\- Numeric geometry fields request the standard iOS decimal keyboard

\- Prefer a single `index.html` with embedded CSS and JavaScript

\- It may be served locally via a-Shell using `python3 -m http.server 8765`



\## Core Concept



The tool lets the user define a Bullseye point, then generate:



1\. SAM rings based on Bullseye bearing/range

2\. Axis lines from Bullseye using magnetic heading

3\. Optional tickmarks perpendicular to an Axis at regular intervals

4\. Individual Mission Lines perpendicular to a selected Axis

5\. Custom Line / Area geometry from direct coordinates or Bullseye bearing/range

6\. Import supported KML geometry and export all objects

\- SAM Ring and Custom Line / Area panels are initially collapsed and retain entered values while collapsed.

\- Object List order can be changed with drag handles and determines preview and KML export order.

\- SAM polygon fill is enabled by default and exported with semi-transparent fill.

\- SAM Ring and Custom Area use pale default fill colors.

\- Custom Line requires at least two points. Custom Area requires at least three points and closes the polygon automatically.

\- The app does not collect or transmit data.

\- Do not use this tool as the sole source for navigation, flight safety, or real mission decisions. Users must independently verify coordinates, magnetic variation, and generated KML. Accuracy and completeness are not guaranteed.

\- Copyright © 2026 Hemi-Taro. All rights reserved.


\## Important Aviation Assumptions



\- Distances are in nautical miles.

\- Headings and bearings entered by the user are magnetic.

\- KML coordinates must be generated using true bearing.

\- Magnetic variation is user-configurable.

\- Use this rule:



```text

trueBearing = magneticBearing + magVarEastPositive
```
