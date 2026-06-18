# Tacticool KML v1.2.3

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

1. SettingsでMagnetic VariationとDisplay formatを選択します。
2. Bullseye座標を入力します。
3. Axis、Mission Line、SAM Ring、Custom Point / Line / Areaを追加します。
4. Object Listで内容を確認し、必要に応じて並べ替えます。
5. プレビューを確認して`Export KML`または`Export JSON`を押します。

Object Listの並び順はプレビュー、KML出力、GeoJSON出力の順序へ反映されます。Import GeometryはKMLとGeoJSONを読み込みます。

Custom Point / Line / Areaでは、直接座標、B/E Bearing / Range、Arc、Boxからポイントを生成できます。1点はPoint、2点以上はLine、Close shape有効時はAreaとして追加されます。Arcは中心を直接座標またはAt B/Eで指定でき、ポイント数をAutoまたは3–181点のManualで設定できます。

Color欄は小さいネイティブカラーピッカーとプリセット色から選択できます。Object Listの一覧行では小さいLine color pickerのみを表示し、項目を展開すると名前、Line color preset、Fill colorを編集できます。

Axis、Mission Line、SAM Ring、Custom Point / Line / Areaは折りたたみ式です。SAM RingとCustom Areaのpolygon fillは初期状態では無効です。ONにするとFill colorが表示されます。

SAM Ringは`At B/E`を選択でき、名前を省略すると`SAM {中心座標}`になります。BoxとArcは生成時にNameが空なら`BOX {中心座標}`または`ARC {中心座標}`を自動入力します。Axisの既定名は`AXIS {方位/反方位} {B/E座標}`です。これらの短い名前やB/E表示では、入力されていない小数や分秒のゼロ埋めを省略します。内部計算とKML/GeoJSON出力の精度は維持します。

## Coordinate Input

緯度と経度は`/`、`,`、または方位記号で区切ります。DD・DDM・DMSを自動判定します。

- DD: `35.508333, 135.333333`
- DDM: `3530.500N / 13520.000E`
- DMS: `353030N / 1352000E`

距離単位はNMです。Auto/Manual/Japan GSI 2020.0 approxでは入力方位を磁方位として扱い、東偏を正、西偏を負として真方位へ変換します。None (True HDG)では入力方位を真方位として扱い、磁気偏差補正を行いません。Auto magnetic variationはB/EまたはDirect Box/Arcの中心座標、現在日付、海面高度からWMM2025で計算します。Japan GSI 2020.0 approxは国土地理院の2020.0年値近似式を使う日本周辺専用の概算モードです。

## Privacy

This app does not collect or transmit data.

## Disclaimer

Do not use this tool as the sole source for navigation, flight safety, or real mission decisions. Verify coordinates, magnetic variation, and generated KML independently. Accuracy and completeness are not guaranteed.

Copyright © 2026 hemi-taro. All rights reserved. Permission to reuse, redistribute, or modify this software has not been granted.
