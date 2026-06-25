# Tacticool KML v1.6.1

Offline bullseye geometry and KML / GeoJSON / CSV export tool.

[Open App](https://hemi-taro.github.io/tacticool-kml/)

## Overview

Tacticool KML is a single-page offline web app for creating simple aviation-style geometry from a bullseye reference point.

It supports KML, GeoJSON, and coordinate CSV export for compatible map tools.

## Features

- Bullseye coordinate entry
- Automatic magnetic variation:
  - Japan GSI 2020.0 approximate model
  - WMM2025
  - Manual variation
  - True heading mode
- Axis and tickmark generation
- Mission lines
- SAM rings
- B/E spider radials and range rings
- Live geometry preview before adding objects
- Interactive preview pan, zoom, coordinate copy, and bearing/range ruler
- Separate BULLS point creation with B/E Spider
- Custom Point / Line / Area
- Arc and Box generation
- KML export
- GeoJSON export
- CSV coordinate export
- KML / GeoJSON / WebGIS-style JSON import
- Offline PWA support for iPhone and iPad

## Coordinate Input

Coordinates can be entered in DD, DDM, DMS, compact hemisphere-delimited formats, or GEOREF.

Examples:

```text
35.508333, 135.333333
3530.500N / 13520.000E
34° 04' N / 129° 04' E
353030N / 1352000E
WJLL0000
```

## Basic Use

1. Select magnetic variation mode and coordinate display format.
2. Enter the Bullseye coordinates.
3. Add Axis, Mission Line, SAM Ring, B/E Spider, or Custom geometry.
4. Review and reorder objects in the Object List.
5. Export as KML, GeoJSON, or CSV.

## Notes

- Distance units are nautical miles.
- KML and GeoJSON output preserve Object List order.
- CSV output is coordinate-row based and separates independent lines with blank rows.
- The preview map is only a lightweight visual reference and is not exported.
- The app runs locally after loading and does not collect or transmit data.

## Japanese Note

このツールは、オフラインで動作するBullseye基準のKML / GeoJSON / CSV作成ツールです。生成された座標・図形は、使用前に必ず確認してください。

## Disclaimer

This tool is provided as-is. Verify all generated geometry before operational use.

## Copyright

Copyright (c) 2026 hemi-taro. All rights reserved.
