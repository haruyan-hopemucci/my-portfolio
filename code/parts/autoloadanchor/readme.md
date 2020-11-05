# auto-load-anchor

指定した要素が画面内に表示された際に、任意の関数を実行するモジュールです。

## Getting Started

```javascript
  <script type="module">
    import AutoLoadAnchor from "./auto-load-anchor.js";
    let obj = new AutoLoadAnchor({
      // 表示起点の対象になる要素をセレクタで指定する。
      anchorSelector: '.topic',
      // そのセレクタの対象要素が画面内に表示された際に実行する関数を設定する。
      func: (target) => {
        target.classList.remove('hidden');
      },
    })
  </script>
```

## Options

デフォルト：
```javascript

new AutoLoadAnchor({
  anchorSelector: required,
  func: required,
  runImmediate: true,
  anchorPoint: "top",
  gap: 0,
});

```

|オプション名|型|必須|説明|デフォルト値|
| ---- | ---- | ---- | ---- | ---- |
|anchorSelector| string | required | 判定対象の要素をセレクタで指定する。||
|func| Function | required | 判定対象が画面に表示された際に実行される関数を指定する。この関数は引数を1つ取る。引数の中身は判定対象のNode。||
|runImmediate|bool|no|trueだと初期化した際に判定を実行する。falseだとscrollイベントのみで判定を行う。| true |
|anchorPoint|string|no|画面表示された対象の上端か下端どちらが表示されたら処理を実行するか選択する。"top"で上端、"bottom"で下端が判定対象になる。|"top"|
|gap|number|no|判定するポイントをanchorPointで指定した辺からどのくらいずらすかを設定する。単位はpxで、正の値を入力すると判定座標が下側へずれ、負の値を入力すると判定座標が上側へずれる。0で上端、下端と同じ座標となる。|0|
