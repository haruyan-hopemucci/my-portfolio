/**
 * loupebox.js
 * 
 * by haruyan-hopemucci
 * 
 * create: 2020.11.02
 * 
 * changelog:(above is newer)
 *  v0.1.0 2020.11.02  : Creation.
 * 
 * MIT License.
 */
window.addEventListener('load', function(event){
  let loupebox_template = `
    <div id="loupe-toolbar">
      <button class="loupe-a-controll">shrink</button>
      <button class="" onclick="loupeSizeUp()">+</button>
      <button class="" onclick="loupeSizeDown()">-</button>
    </div>
    <div id="loupe">
      <iframe id="loupe-frame" ></iframe>
    </div>
    <div id="loupe-init">
      <span>クリックして拡大鏡を開始します。</span>
    </div>
  `;
  let loupebox_style = `
  #loupe-box{
    position: fixed; 
    width: 800px;
    height: 400px;
    right: 0;
    bottom: 0;
    
  }
  #loupe-toolbar{
    position: absolute;
    width: 100%;
    height: 32px;
    background-color: cadetblue;
    top: -32px;
    left: 0px;
  }
  #loupe{
    position: relative; 
    width: 100%;
    height: 100%;
    overflow: hidden;
    right: 0;
    bottom: 0;
    border: 2px solid #aaa;
  }
  #loupe-frame{
    transform: scale(2.0);
    transform-origin: 0px 0px;
    overflow: hidden;
    pointer-events: none;
  }
  #loupe-init{
    display: flex;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: dimgrey;
    vertical-align: middle;
    text-align: center;
  }
  #loupe-init span{
    display: inline-block;
    margin: auto;
  }

  `;
  // 拡大鏡ボックスをページに追加する。
  let elem = document.createElement('div');
  elem.id ="loupe-box";
  elem.innerHTML = loupebox_template;
  document.body.appendChild(elem);

  // 拡大鏡用スタイルを追加する。
  let elemStyle = document.createElement('style');
  elemStyle.innerHTML = loupebox_style;
  document.head.appendChild(elemStyle);

  // グローバル変数定義
  var loupe = document.querySelector('#loupe');
  var loupeBox = document.querySelector('#loupe-box');
  var loupeToolbar = document.querySelector('#loupe-toolbar');

    // カーソルに追随してルーペフレームのウィンドウ表示領域を動かす
    document.addEventListener('mousemove', (event) => {
      // 実画面側の座標取得
      let mx = event.pageX;
      let my = event.pageY;
      // console.log(mx,my);
      // ループフレームのスクロール位置を設定。カーソル位置を2倍してclient領域のセンターへもっていく
      loupe.scrollTop = (my*2 - loupe.clientHeight / 2 *1)*1;
      loupe.scrollLeft = (mx*2 - loupe.clientWidth / 2 *1)*1;
      // console.log(my, loupe.clientHeight, loupe.scrollTop);
    });
  
    // クリックするとループフレームにドキュメントをコピーする（暫定）
    var iframe = document.querySelector('#loupe-frame').contentWindow;
    document.addEventListener('click', (event) => {
      // ループフレーム内部HTMLのサイズ指定。
      document.querySelector('#loupe-frame').style.height = `${document.body.scrollHeight}px`;
      // document.querySelector('#loupe-frame').style.height = `${document.body.scrollHeight+36}px`;
      // document.querySelector('#loupe-frame').style.width = `${document.body.scrollWidth}px`;
      document.querySelector('#loupe-frame').style.width = `${window.innerWidth}px`;
      // htmlコピー前にルーペフレームを非表示にする（映り込み防止）
      document.querySelector('#loupe-box').style.display = "none";
      // htmlを丸ごとコピー
      iframe.document.head.innerHTML = document.head.innerHTML;
      iframe.document.body.innerHTML = document.body.innerHTML;
  
      // ルーペフレーム復帰
      document.querySelector('#loupe-box').style.display = "block";
      // 初期ウィンドウ非表示
      document.querySelector('#loupe-init').style.display = "none";
  
    })
  
    // ツールバーボタン ルーペ自体の折り畳み
    document.querySelector('.loupe-a-controll').addEventListener('click', (event) => {
      if(event.target.innerHTML === "shrink"){
        loupe.style.display = "none";
        event.target.innerHTML = "expand";
      }else{
        loupe.style.display = "block";
        event.target.innerHTML = "shrink";
      }
    })
  
    // ルーペ移動用変数
    var loupeToolbarMoving = false;
    var loupeToolbarMovingStartX = -1;
    var loupeToolbarMovingStartY = -1;
  
    // ツールバーmousedown時にフラグと開始位置をセット
    loupeToolbar.addEventListener('mousedown', (event) => {
      console.log("mouseDown");
      loupeToolbarMoving = true;
      loupeToolbarMovingStartX = event.clientX;
      loupeToolbarMovingStartY = event.clientY;
  
    });
  
    // ドラッグすると開始位置からの距離分loupe-boxをずらしていく
    document.addEventListener('mousemove', (event) => {
      // フラグがoffの状態では何もしない
      if(!loupeToolbarMoving)
        return;
      console.log("moving");
      loupeBox.style.left = `${loupeBox.offsetLeft + (event.clientX - loupeToolbarMovingStartX)}px`;
      loupeBox.style.top = `${loupeBox.offsetTop + (event.clientY - loupeToolbarMovingStartY)}px`;
      loupeToolbarMovingStartX = event.clientX;
      loupeToolbarMovingStartY = event.clientY;
  
    });
  
    document.addEventListener('mouseleave', (event) => {
      // フラグがoffの状態では何もしない
      if(!loupeToolbarMoving)
        return;
      loupeBox.style.left = `${loupeBox.offsetLeft + (event.clientX - loupeToolbarMovingStartX)}px`;
      loupeBox.style.top = `${loupeBox.offsetTop + (event.clientY - loupeToolbarMovingStartY)}px`;
      loupeToolbarMovingStartX = event.clientX;
      loupeToolbarMovingStartY = event.clientY;
  
    });
  
    // mouseupしたらフラグを片づける（どの位置でも共通）
    document.addEventListener('mouseup', (event) => {
      loupeToolbarMoving = false;
    });
  
});
// エリア拡大
function loupeSizeUp(){
  let loupeBox = document.querySelector('#loupe-box');
  loupeBox.style.width = `${loupeBox.clientWidth * 1.2}px`;
  loupeBox.style.height = `${loupeBox.clientHeight * 1.2}px`;
}
// エリア縮小
function loupeSizeDown(){
  let loupeBox = document.querySelector('#loupe-box');
  loupeBox.style.width = `${loupeBox.clientWidth * 0.8}px`;
  loupeBox.style.height = `${loupeBox.clientHeight * 0.8}px`;
}
  
