# Changelog

このプロジェクトはSemantic Versioning形式でバージョンを管理します。

## [0.10.2] - 2026-06-13

### Changed

- KML出力を単一の`Export KML`操作へ戻し、Web Share APIを削除
- PWAキャッシュをv0.10.2へ更新

### Fixed

- iOS標準キーボード表示時に専用キーボードのDoneツールバーが残る問題を修正
- iPhone専用キーボード下部に余分な隙間が発生する問題を改善

## [0.10.1] - 2026-06-13

### Changed

- KML出力を`Share KML`と`Save KML to Files`の二つに分離
- ForeFlightが共有候補に表示されない場合は、ファイルアプリ経由で共有できる案内を表示
- PWAキャッシュをv0.10.1へ更新

## [0.10.0] - 2026-06-13

### Added

- GitHub Pages配信用のPWA manifest、Service Worker、ホーム画面アイコンを追加
- インストール後のオフライン起動に対応
- 対応端末でKMLを共有シートへ直接渡す機能を追加

### Changed

- KML共有が利用できない場合は従来のダウンロードへフォールバック
- PWA更新時に旧キャッシュを削除する処理を追加

## [0.9.8] - 2026-06-13

### Changed

- Name系入力欄を一行表示のtextareaへ変更

### Fixed

- iOSでName系入力欄に連絡先AutoFillやパスワードアプリのショートカットが表示される問題を抑制
- Name系入力欄への改行入力を無効化

## [0.9.7] - 2026-06-13

### Fixed

- 素早い連続タップ時に古いキーボード切替処理が後から実行される問題を修正
- 専用欄上でスクロールを開始した際にキーボードが開く問題を修正
- 通常キーボードと専用キーボードが低頻度で二重表示される問題を改善

## [0.9.6] - 2026-06-13

### Changed

- 専用キーボード対象欄をiOSが入力欄として認識しない表示コンポーネントへ変更

### Fixed

- iPadで専用入力欄タップ時にAutoFillが表示され、専用キーボードが開かないことがある問題を修正

## [0.9.5] - 2026-06-13

### Fixed

- iPadの座標・数値・符号付き入力で、使用可能な専用キーボードキーが誤って無効表示される問題を修正

## [0.9.4] - 2026-06-13

### Fixed

- iPhoneで同じ専用入力欄を再タップした際、キーが無効表示になる問題を修正

## [0.9.3] - 2026-06-13

### Fixed

- iPadで専用キーボード使用時にAutoFillメニューが表示される問題を修正
- iPhoneで同じ数値入力欄を再タップすると専用キーボードが無効表示になる問題を修正
- 専用キーボード表示時の自動スクロールが入力欄から離れすぎる問題を修正

## [0.9.2] - 2026-06-13

### Changed

- iPhone専用キーボードにiOS風の前後移動・Done操作バーを追加
- iPhone専用キーボードの配置を更新し、iPad配置は維持
- Name系文字欄のスペルチェックを有効化し、補助入力属性を調整

### Fixed

- スクロール時に専用キーボードが画面下端からずれる問題を修正
- 文字入力から専用キーボードへ移る際に二重表示される問題を修正

## [0.9.1] - 2026-06-13

### Fixed

- iOS Safariで入力時に画面が自動ズームする問題を修正
- 専用キーボード表示中に文字入力欄へ移るとキーボードが二重表示される問題を修正

## [0.9.0] - 2026-06-13

### Added

- iPhone/iPad向けAviation Keyboardを座標・数値入力欄へ追加
- 端末別キーレイアウト、入力欄移動、Clear、Paste、キャレット移動、長押し削除
- 入力中の項目と補足表示がキーボードに隠れないスクロール補正

## [0.8.3] - 2026-06-12

### Fixed

- NM距離入力で5NM刻み以外が無効になる問題を修正
- iPhone/iPadでのKML Import互換性を改善

## [0.8.2] - 2026-06-12

### Fixed

- iPhone/iPadの座標入力欄で自動修正と自動大文字化を抑制

## [0.8.1] - 2026-06-12

### Fixed

- iPhone/iPadで座標入力欄に数字専用キーボードが表示される問題を修正

## [0.8.0] - 2026-06-12

### Added

- Object ListへのKML Import
- Object List項目タップによる座標一覧表示
- DD / DDM / DMS座標表示切替

### Changed

- KML Line Widthの既定値をplaceholder `4`へ変更

## [0.7.0] - 2026-06-12

### Added

- Export欄に生成形状の軽量SVGプレビュー
- KML全体へ適用する線幅設定

### Changed

- SAM直接座標を単一ペア入力へ変更
- Mission Line入力順をAxis、Name、Distance、Widthへ変更
- Mission Line Widthの40NM既定値をplaceholder表示へ変更

## [0.6.0] - 2026-06-12

### Added

- B/E座標の単一ペア入力。`/`または`,`区切りに対応
- Google Mapsの`latitude, longitude`コピー形式に対応

### Changed

- Axis入力順をHeading、Name、Length、Colorへ変更
- Mission Lineの既定名を入力距離の`XXNM`形式へ変更
- B/E・SAM座標欄の数値placeholderを削除

## [0.5.0] - 2026-06-12

### Added

- B/EとSAM直接座標に、DD・DDM・DMSを桁数と小数点位置から自動判定する座標入力

### Changed

- SAM中心の既定モードを直接座標へ変更
- SAM・Axis個別Mag Var Overrideを削除し、B/EのAuto / Manual設定へ統一
- Tickmark Start、Interval、Widthの既定値をplaceholder表示へ変更

## [0.4.1] - 2026-06-12

### Fixed

- DDMのdecimal minutesで小数点3桁を超える値がフォーム検証で拒否される問題を修正

## [0.4.0] - 2026-06-11

### Added

- SAM中心を直接DDM座標で指定するモード
- Tickmark EndのAxis Length連動

### Changed

- B/E座標、SAM方位・距離・半径、Axis方位・長さ、Mission Line距離を空欄で開始
- Tickmark Startの既定値を0NMへ変更
- KML名が空欄の場合、Downloadクリック時のローカル日時を使用

## [0.3.1] - 2026-06-11

### Changed

- Name欄の既定名を灰色のplaceholder表示へ変更
- Bullseye、SAM、Axis、Mission Line、Documentの自動名を更新
- 方位入力を5度刻み、NM距離入力を5NM刻みへ変更
- SAM Ring radiusの既定値を25NM、Mission Line widthの既定値を40NMへ変更

## [0.3.0] - 2026-06-11

### Added

- Bullseye座標、現在日付、海面高度からWMM2025で磁気偏差を自動計算するAutoモード
- Auto / Manual magnetic variation切替

### Changed

- Bullseyeの既定磁気偏差をAuto WMM2025へ変更

## [0.2.0] - 2026-06-11

### Added

- Axis作成時のTickmark ON/OFFと、開始距離・終了距離・間隔・幅・色の設定
- 選択Axis上のB/Eからの距離と幅で作成する単発Mission Line
- アプリ内バージョン定数と画面上のバージョン表示

### Changed

- 複数Cross Lines機能を単発Mission Line機能へ変更

## [0.1.0] - 2026-06-11

### Added

- DDM形式のBullseye入力
- SAM Ring、Axis、複数Cross Linesの生成
- オブジェクト一覧、削除、全削除
- KML出力
