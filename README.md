# MSN Line Tool v0.10.6

PWAとしてインストール後は完全オフラインで動作する、Bullseye基準のミッションライン作成・KML出力ツールです。外部ライブラリ、地図、バックエンドは使用しません。

## GitHub Pages / PWA

1. GitHub PagesのURLをiPhoneまたはiPadのSafariで開きます。
2. Safariの共有ボタンから`ホーム画面に追加`を選びます。
3. 以後はホーム画面のアイコンからオフライン起動できます。

`Export KML`でKMLファイルを保存できます。古い画面が残る場合は、ヘッダー右端の更新アイコンを押して最新版を再読み込みできます。この操作にはインターネット接続が必要です。

## 使い方

1. `index.html` をSafariで開きます。iPad上でHTTP配信する場合は、a-Shellなどで次を実行します。

   ```sh
   python3 -m http.server 8765
   ```

2. Bullseyeの緯度・経度を単一欄へ入力します。緯度と経度は`/`または`,`で区切り、DD・DDM・DMSを自動判定します。
3. SAM RingまたはAxisを追加します。SAM直接座標もB/Eと同様に単一欄へ入力できます。Axis作成時にTickmarkを有効にすると、距離目盛り線も同時に作成されます。
4. Mission Lineを作る場合は、作成済みAxisを選択し、B/Eからの距離と幅を指定します。
5. Export欄のプレビューで相対配置を確認し、KML Line Widthを指定して`Download KML`を押します。Document Nameが空欄の場合、出力時のローカル日時が名前になります。

Object Listでは、項目をタップして座標一覧を表示できます。右側の`DD / DDM / DMS`で表示形式を切り替えられます。Import KMLはLineStringとPolygon外周を読み込みます。

## 座標・方位の規則

- 距離単位: nautical miles (NM)
- 入力方位: magnetic degrees
- 磁気偏差: 東偏を正、西偏を負
- Auto magnetic variation: Bullseye座標、現在日付、海面高度からWMM2025で計算
- Manual magnetic variation: 必要な場合に手動値へ切替可能
- 真方位: `magnetic bearing + magnetic variation`
- DD例: `35.508333`, `135.333333`
- DDM例: `3530.500N`, `13520.000E`
- DMS例: `353030N`, `1352000E`
- B/Eペア例: `3530.500N / 13520.000E`
- Google Maps例: `33.6767373218162, 131.0185685567963`
- KML座標順: `longitude,latitude,altitude`

## SAM Fill

既定ではSAM Ringを閉じたKML `LineString` として出力します。`Enable polygon fill` を有効にすると、半透明のKML `Polygon` として出力します。

## テスト

Node.jsが利用可能な環境で次を実行します。

```sh
node --test tests/*.test.js
```

テストは、WMM2025磁気偏差、DDM変換、方位変換、測地線上の目的地点、円生成、KML色と座標順を検証します。

## バージョン管理

- バグ修正のみ: パッチ番号を上げる（例: `0.2.0` → `0.2.1`）
- 機能追加・仕様変更: マイナー番号を上げる（例: `0.2.1` → `0.3.0`）
- 安定版として公開するとき: `1.0.0`

アプリのバージョンは`index.html`内の`APP_VERSION`を基準とし、変更内容は`CHANGELOG.md`へ記録します。

## WMM2025について

Auto magnetic variationはWMM2025標準モデルを完全オフラインで計算します。Axis長や各形状の位置ごとには再計算せず、Bullseye地点の偏差を共通利用します。WMMは局地的・一時的な磁気異常を表現しないため、必要に応じてManual値を使用してください。
