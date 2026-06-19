# Changelog

このプロジェクトはSemantic Versioning形式でバージョンを管理します。

## [1.2.9] - 2026-06-20

### Added

- B/E SpiderにRange ring intervalを追加
- B/E SpiderのStart/End rangeに沿ったrange ringsをKML/GeoJSON/Previewへ出力
- Preview背景に軽量化したworld coastline SVG pathを追加

### Changed

- PWAキャッシュをv1.2.9へ更新

## [1.2.8] - 2026-06-20

### Added

- BullseyeからB/E Spiderを作成する機能を追加
- Spiderの通常ラジアルと000/090/180/270カーディナルラジアルを別色・別太さで出力
- SpiderをKMLでは通常/カーディナル別Placemark、GeoJSONでは別Featureとして出力

### Fixed

- Axis Tickmark有効時にMain interval関連で作成に失敗するバグを修正
- TickmarkのStart distanceをinterval開始点ではなく、B/E基準tickmarkの表示下限として扱うよう修正
- PWAキャッシュをv1.2.8へ更新

## [1.2.7] - 2026-06-19

### Changed

- BullseyeのカスタムName入力欄を削除
- Axis Tickmarkの既定値をMain 50NM / Width 10NM、Sub 10NM / Width 5NMへ変更
- TickmarkをObject List上で1つのTickmark Groupとして管理
- Tickmark GroupをKMLでは1つのMultiGeometry Placemark、GeoJSONでは1つのMultiLineStringとして出力
- PWAキャッシュをv1.2.7へ更新

## [1.2.6] - 2026-06-19

### Added

- Axis TickmarkにMain/Sub Tickmark設定を追加
- GEOREF座標の入力対応を追加
- WebGIS-style JSON importを追加

### Changed

- TickmarkはMainとSubが同距離の場合、Mainを優先してSubを省略
- Import GeometryでGeoJSONとして読めないJSONをWebGIS-style JSONとして判定
- PWAキャッシュをv1.2.6へ更新

## [1.2.5] - 2026-06-19

### Added

- 各Addボタン横にObject Listへ移動する下矢印ボタンを追加
- Object List詳細が開いている時に、全詳細を閉じる右下の上矢印ボタンを追加

### Changed

- Object List詳細のName入力、Rename、Line color配置を調整
- Object List詳細でLine color / Fill colorを変更した時、一覧行とプレビューへ即時反映
- 既定名のDDM分表示を二桁に統一
- Symbolic DDM/DMS入力で一桁分を受け付けるよう変更
- PWAキャッシュをv1.2.5へ更新

## [1.2.4] - 2026-06-19

### Changed

- Magnetic Variationの既定値を`Auto (Japan GSI 2020.0)`へ変更
- Magnetic Variationの選択肢を`Auto (Japan GSI 2020.0)`、`Auto (WMM2025)`、`Manual`、`None (True)`へ整理
- GSI範囲外エラーでWMM2025への変更を案内
- Object List詳細のCreated B/EとCenterにVariationを同じ行で表示
- Axis詳細にEndpoint VarとInbound HDGを表示
- PC幅のObject List詳細でName入力欄を300pxへ調整
- PWAキャッシュをv1.2.4へ更新

## [1.2.3] - 2026-06-18

### Added

- Magnetic Variationに`Japan GSI 2020.0 approx`を追加

### Changed

- Settingsの磁気偏差説明文を削除
- PC幅のObject List詳細でNameとLine color presetsが1段に収まりやすいよう調整
- PWAキャッシュをv1.2.3へ更新

## [1.2.2] - 2026-06-18

### Changed

- SettingsのDisplay format幅と説明文配置を調整
- Object List一覧行は小さいLine color pickerのみ表示
- Object詳細を開いた時だけLine color / Fill colorプリセットを表示
- Add AxisとAdd Mission Lineを折りたたみ式へ変更
- PWAキャッシュをv1.2.2へ更新

## [1.2.1] - 2026-06-18

### Changed

- Magnetic VariationをSettingsへ変更し、Display format切替を追加
- SettingsとObject ListのDD/DDM/DMS表示切替を同期
- B/E、Created B/E、Center、既定名の座標表示を短縮表示へ変更
- SAM RingとCustom AreaのPolygon fillを初期OFFへ変更
- Fill colorはPolygon fill有効時のみ表示
- Color入力を小型化し、プリセット色を追加
- B/E Bearing / Range入力のラベルをBearing / Rangeへ短縮

### Added

- Box由来Custom AreaのObject List詳細にCenter variation表示を追加

## [1.2.0] - 2026-06-18

### Added

- Magnetic Variationに`None (True HDG)`を追加
- Arc中心をDirect coordinatesまたはAt B/Eで指定可能に変更
- Axis、SAM Ring、Custom欄に現在のB/E表示を追加
- Object List詳細にCreated B/E、Axis endpoint variation、SAM radius表示を追加

### Changed

- 方位入力ラベルから`(MAG)`表記を削除
- Direct BoxとDirect ArcをB/E未入力でも作成可能に変更
- Direct BoxとDirect ArcはAuto時に中心座標のWMM2025磁気偏差を使用
- 既定名を`SAM {中心座標}`、`BOX {中心座標}`、`ARC {中心座標}`、`AXIS {方位/反方位} {B/E座標}`へ変更
- Object Listの名前変更ボタンを`Rename`へ変更
- PWAキャッシュをv1.2.0へ更新

## [1.1.4] - 2026-06-16

### Changed

- 並べ替え中はPointer Captureを維持し、ドロップ時に一度だけObject Listの順序を確定する方式へ変更
- PC・iPhone・iPadで一度のドラッグによる複数段移動が途中で止まる問題を修正
- PWAキャッシュをv1.1.4へ更新

## [1.1.3] - 2026-06-16

### Changed

- PC・iPhone・iPadの並べ替えを、三本線から即時開始する連続ドラッグ方式へ変更
- 一度のドラッグで複数段を移動できない問題を修正
- Object List詳細とCustomポイント一覧の番号列を整列
- PWAキャッシュをv1.1.3へ更新

## [1.1.2] - 2026-06-16

### Changed

- Box入力名をWidth、Depth、Depth orientationへ変更
- 方位入力ラベルを`(MAG)`表記へ統一
- 座標入力placeholderを`Enter coordinates`へ簡略化
- Object ListのDDM表示で分の整数部を2桁表示
- Copyright名を`hemi-taro`へ変更
- PWAキャッシュをv1.1.2へ更新

## [1.1.1] - 2026-06-16

### Added

- SAM Ringの`At B/E`中心指定
- SAM RingとBox由来Custom AreaのObject List詳細へCenter表示

### Changed

- SAM RingのName未入力時、中心指定元のDD・DDM・DMS形式を継承した中心座標を使用
- PWAキャッシュをv1.1.1へ更新

## [1.1.0] - 2026-06-16

### Added

- GeoJSONのImport / Export
- Custom PointとBox生成
- B/E ArcのAuto / Manualポイント数設定と間隔表示
- Custom AreaのFill無効化
- 区切り文字なしのコンパクト座標入力

### Changed

- Import KMLをImport Geometryへ変更
- Custom Line / AreaをCustom Point / Line / Areaへ拡張
- Object ListとCustomポイントの並べ替え操作を改善
- PWAキャッシュをv1.1.0へ更新

## [1.0.0] - 2026-06-14

### Changed

- 初回安定版としてv1.0.0を公開
- Axis名の反方位が北向きの場合、`000`ではなく`360`と表示
- PWAキャッシュをv1.0.0へ更新

## [0.15.0] - 2026-06-14

### Added

- Custom Line / AreaへB/E Arcポイント生成を追加
- Object List詳細で名前とFill colorを編集する機能
- Object ListのLine colorスウォッチから色を直接変更する機能

### Changed

- Arcポイント数を約5度間隔、最低3点・最大73点で自動生成
- Object List操作領域の連続タップによる誤ズームを抑制
- READMEから開発者向け項目を削除し、testsを公開リポジトリの追跡対象から除外
- PWAキャッシュをv0.15.0へ更新

## [0.14.2] - 2026-06-14

### Changed

- READMEを利用者向けの公開案内へ整理
- 開発用キーボード試作、内部仕様・計画、AGENTS、元アイコン画像を公開リポジトリの追跡対象から除外
- PWAキャッシュをv0.14.2へ更新

## [0.14.1] - 2026-06-14

### Changed

- Axis、Mission Lineの後にSAM Ring、Custom Line / Areaを配置
- Custom Line / AreaのLine colorとFill color配置をSAM Ringと統一
- SAM RingとCustom Areaの既定Fill colorを薄い色へ変更
- PWAキャッシュをv0.14.1へ更新

## [0.14.0] - 2026-06-14

### Added

- 直接座標またはB/E Bearing / Rangeからポイントを追加するCustom Line / Area
- アプリ内の免責事項、プライバシー表示、著作権表示

### Changed

- Object ListとCustomポイント一覧をドラッグハンドルで並べ替え可能に変更
- Object Listの順序をプレビューとKML出力順へ反映
- SAM RingとCustom Line / Areaを初期状態で閉じた折りたたみパネルへ変更
- SAM RingのPolygon fillを既定で有効化
- PWAキャッシュをv0.14.0へ更新

## [0.13.1] - 2026-06-14

### Fixed

- PWAアイコンを曲線的な迷彩と角丸形状を維持したSVGから高品質に再生成
- PWAキャッシュをv0.13.1へ更新

## [0.13.0] - 2026-06-13

### Changed

- アプリ名を`Tacticool KML`へ変更
- PWAアイコンを青色迷彩色を使ったKML書類アイコンへ変更
- PWAテーマ色と背景色を`#0B121F`へ変更
- PWAキャッシュをv0.13.0へ更新

## [0.12.0] - 2026-06-13

### Changed

- Magnetic Variationを独立セクションとして画面最上部へ移動
- BullseyeのCoordinatesをNameより上へ移動
- SAM Ring、Axis、Mission LineのName欄を追加ボタン右横へ移動
- Object ListのClear Allを座標表示切替と同じ上部段へ移動
- KMLダウンロード開始メッセージを3秒後に自動消去
- PWAキャッシュをv0.12.0へ更新

## [0.11.3] - 2026-06-13

### Fixed

- iOSファイル選択画面でKMLファイルがグレーアウトして選択できない問題を修正
- PWAキャッシュをv0.11.3へ更新

## [0.11.2] - 2026-06-13

### Changed

- 座標欄を1行表示の`textarea`へ変更
- 座標欄でEnterを押した場合は改行せずキーボードを閉じる
- PWAキャッシュをv0.11.2へ更新

## [0.11.1] - 2026-06-13

### Changed

- 座標欄に自動入力、自動修正、自動大文字化、スペルチェックの抑制属性を追加
- PWAキャッシュをv0.11.1へ更新

## [0.11.0] - 2026-06-13

### Changed

- 座標欄とName欄はiOS標準文字キーボードを使用
- 方位、距離、幅などの数値欄は`inputmode="decimal"`でiOS標準小数キーボードを使用
- PWAキャッシュをv0.11.0へ更新

### Removed

- 専用キーボードと関連するページ固定、スクロール、入力補助処理を削除

## [0.10.7] - 2026-06-13

### Changed

- iPhoneのホーム画面起動時のみ専用キーボード全体を下へ34px移動
- 専用キーボードの上下ボタンで移動した入力欄が画面上側・キーボード上側の両方向で見えるよう追従
- PWAキャッシュをv0.10.7へ更新

### Fixed

- ページをスクロールするためのドラッグがタップ扱いになり、専用キーボードが閉じる問題を修正

## [0.10.6] - 2026-06-13

### Changed

- 専用キーボード表示中はページ本体を固定し、上部コンテンツのドラッグを独自スクロールとして処理
- PWAキャッシュをv0.10.6へ更新

### Fixed

- 専用キーボードを開いたままスクロールするとキーボードが移動する問題を修正

## [0.10.5] - 2026-06-13

### Changed

- SAM Center methodの選択肢を`B/E Bearing / Range`へ短縮
- PWAキャッシュをv0.10.5へ更新

### Fixed

- Visual Viewport位置補正を撤回し、専用キーボードがページ途中へ固定される問題を修正

## [0.10.4] - 2026-06-13

### Changed

- 更新・キャッシュ削除操作をヘッダー右端のリロードアイコンへ移動
- SAM、Axis、Mission Lineの追加成功後に一時入力フィールドをクリア
- PWAキャッシュをv0.10.4へ更新

### Fixed

- iOS PWAのスクロール中に専用キーボードが可視画面下端からずれる問題を修正

## [0.10.3] - 2026-06-13

### Added

- `Check for Updates / Clear Cache`操作を追加

### Changed

- iPhoneのヘッダーを上部セーフエリアに対応
- PWAキャッシュをv0.10.3へ更新

### Fixed

- 閉じた専用キーボードがスクロールやネイティブキーボードの背面から見える問題を修正
- Visual Viewport位置補正に起因する専用キーボード下部の隙間を修正

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
- 共有候補に対象アプリが表示されない場合は、ファイルアプリ経由で共有できる案内を表示
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
