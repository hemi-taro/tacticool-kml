# Tacticool KML v0.14.2

Bullseye基準のAxis、Mission Line、SAM Ring、Custom Line / Areaを作成し、KMLとして出力するPWAです。インストール後は完全オフラインで動作します。

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
3. Axis、Mission Line、SAM Ring、Custom Line / Areaを追加します。
4. Object Listで内容を確認し、必要に応じて並べ替えます。
5. プレビューを確認して`Export KML`を押します。

Object Listの並び順はプレビューとKML出力順へ反映されます。Import KMLはLineStringとPolygon外周を読み込みます。

Custom Line / Areaでは、直接座標、B/E Bearing / Range、B/E Arcからポイントを追加できます。B/E ArcはStart / End radial、Radius、方向を指定し、約5度間隔でポイントを自動生成します。

Object Listの色スウォッチからLine colorを変更できます。項目を展開すると、名前とFill colorを変更できます。

## Coordinate Input

緯度と経度は`/`または`,`で区切ります。DD・DDM・DMSを自動判定します。

- DD: `35.508333, 135.333333`
- DDM: `3530.500N / 13520.000E`
- DMS: `353030N / 1352000E`
- KML座標順: `longitude,latitude,altitude`

距離単位はNMです。入力方位は磁方位で、東偏を正、西偏を負として真方位へ変換します。Auto magnetic variationはBullseye座標、現在日付、海面高度からWMM2025で計算します。

## Privacy

This app does not collect or transmit data.

## Disclaimer

Do not use this tool as the sole source for navigation, flight safety, or real mission decisions. Verify coordinates, magnetic variation, and generated KML independently. Accuracy and completeness are not guaranteed.

Copyright © 2026 Hemi-Taro. All rights reserved. Permission to reuse, redistribute, or modify this software has not been granted.
