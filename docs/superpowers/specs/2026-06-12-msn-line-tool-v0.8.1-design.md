# MSN Line Tool v0.8.1 Design

## Scope

Build a fully offline, single-page iPad Safari tool that creates mission geometry from a Bullseye and exports it as KML.

## Input Model

- Bullseye latitude and longitude use DDM fields: degrees, decimal minutes, and hemisphere.
- Magnetic variation is east-positive. Auto mode calculates it at Bullseye using WMM2025, current date, and sea-level altitude. Manual mode remains available.
- All distances are nautical miles.
- Numeric inputs are validated before geometry is created.

## Geometry

- Core functions are embedded in `index.html`: `ddmToDecimal`, `normalizeBearing`, `magToTrue`, `destinationPoint`, and `generateCircle`.
- SAM rings are stored as closed 72-segment outlines.
- Axes start at Bullseye and end at the requested distance and true heading.
- Optional Tickmarks are configured and generated together with an Axis.
- A Mission Line is a single perpendicular line centered at a specified distance from Bullseye along a selected Axis.

## Object Model and KML

- Objects are stored in memory as line geometries with name, type, color, and coordinate arrays.
- KML output creates one style and one Placemark per object.
- Coordinates use KML order: longitude, latitude, altitude.
- KML line colors convert HTML `#RRGGBB` to opaque KML `aabbggrr`.

## UI

- Sections: Bullseye, Add SAM Ring, Add Axis with optional Tickmarks, Add Mission Line, Object List, Export KML.
- The object list supports deletion and clearing all objects.
- Axis selection is explicit when creating cross lines.

## Verification

- Node standard-library tests extract and execute the embedded core geometry script.
- Tests cover DDM conversion, bearing normalization, magnetic-to-true conversion, destination calculations, circles, and KML formatting.
- Browser smoke testing verifies basic rendering and interaction.
