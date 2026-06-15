# Tacticool KML v1.1.4

Stable release.

Bullseye基準のAxis、Mission Line、SAM Ring、Custom Point / Line / Areaを作成し、KMLまたはGeoJSONとして出力するPWAです。インストール後は完全オフラインで動作します。

## Open App

[Tacticool KML](https://hemi-taro.github.io/tacticool-kml/)

## Install on iPhone / iPad

1. 上記URLをSafariで開きます。
2. Safariの共有ボタンから`ホーム画面に追加`を選択します。
3. ホーム画面のアイコンから起動します。

古いバージョンが表示される場合は、アプリ右上の更新アイコンを押してください。更新確認にはインターネット接続が必要です。

## Basic Use

1. Magnetic VariationをAutoまたはManualから選択します。
2. Bullseye座標を入力します。
3. Axis、Mission Line、SAM Ring、Custom Point / Line / Areaを追加します。
4. Object Listで内容を確認し、必要に応じて並べ替えます。
5. プレビューを確認して`Export KML`または`Export JSON`を押します。

Object Listの並び順はプレビュー、KML出力、GeoJSON出力の順序へ反映されます。Import GeometryはKMLとGeoJSONを読み込みます。

Custom Point / Line / Areaでは、直接座標、B/E Bearing / Range、B/E Arc、Boxからポイントを生成できます。1点はPoint、2点以上はLine、Close shape有効時はAreaとして追加されます。B/E Arcはポイント数をAutoまたは3–181点のManualで設定できます。

Object Listの色スウォッチからLine colorを変更できます。項目を展開すると、名前とFill colorを変更できます。

SAM Ringは`At B/E`を選択でき、名前を省略すると中心座標が入力元と同じDD・DDM・DMS形式で名前になります。SAM RingとBoxから作成したCustom Areaは、Object List詳細にCenterを表示します。

## Coordinate Input

緯度と経度は`/`、`,`、または方位記号で区切ります。DD・DDM・DMSを自動判定します。

- DD: `35.508333, 135.333333`
- DDM: `3530.500N / 13520.000E`
- DMS: `353030N / 1352000E`
- Compact DDM: `3500N12900E`
- KML座標順: `longitude,latitude,altitude`

距離単位はNMです。入力方位は磁方位で、東偏を正、西偏を負として真方位へ変換します。Auto magnetic variationはBullseye座標、現在日付、海面高度からWMM2025で計算します。

## Privacy

This app does not collect or transmit data.

## Disclaimer

Do not use this tool as the sole source for navigation, flight safety, or real mission decisions. Verify coordinates, magnetic variation, and generated KML independently. Accuracy and completeness are not guaranteed.

Copyright © 2026 hemi-taro. All rights reserved. Permission to reuse, redistribute, or modify this software has not been granted.
