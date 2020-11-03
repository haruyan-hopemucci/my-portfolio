/**
 * auto-load-anchor.js
 * 
 * by haruyan-hopemucci
 * 
 * create: 2020.10.14
 * 
 * changelog:(above is newer)
 *  v0.1.1 2020.10.30  : add setting param: gap, anchorPoint.
 *  v0.1.1 2020.10.15  : add 1 argment of func when called.
 *  v0.1.0 2020.10.14  : Creation.
 * 
 * MIT License.
 */

class AutoLoadAncher{
  constructor(settings){
    this.anchorSelector = settings.anchorSelector;
    this.func = settings.func;
    this.semaphore = 0;
    this.terminated = 0;
    this.runImmediate = settings.runImmediate ? settings.runImmediate : true;
    this.gap = settings.gap ? settings.gap : 0;
    this.anchorPoint = settings.anchorPoint ? settings.anchorPoint : "top";   // "top" or "bottom"
    this.main();
  }
  stop = () => this.terminated = 1;

  restart = () => this.terminated = 0;

  eventHandler = (event) => {
    if(this.terminated != 0){
      return;
    }
    // セレクタで指定される全ての要素に対して判定するように変更
    let targets = document.querySelectorAll(this.anchorSelector);
    for(let target of targets){
      // console.dir(target);
      // 表示されているウィンドウ領域の座標判定
      let wtop = window.scrollY;  // 現ウィンドウのtop位置がドキュメント全体のどの位置か
      let wbtm = wtop + window.innerHeight  // 現ウィンドウのbottom位置がドキュメント全体のどの位置か
      // console.log('wtop:',wtop, 'wbtm', wbtm);
      //　対象要素の座標取得。gapを計算に入れる。
      let tanchor;
      if(this.anchorPoint === "top"){
        tanchor = target.offsetTop + this.gap;
      }else if(this.anchorPoint === "bottom"){
        console.log("bottom",target.offsetTop,target.clientHeight );
        tanchor = target.offsetTop + target.clientHeight + this.gap;
      }else{
        tanchor = target.offsetTop + this.gap;   // 無効な指定の場合はtop扱い
      }
      // 対象要素のtopがwindowのbottom以下の場合はウィンドウ内にあるという判定になる。
      // また、セマフォが0のときのみ中の関数を実行する。
      if(tanchor <= wbtm && tanchor >= wtop && this.semaphore == 0){
        // セマフォ処理を関数の前後で行う。
        this.semaphore = 1;
        // funcには引数にtargetを追加
        this.func(target);
        this.semaphore = 0;
      }else if(this.semaphore == 1){
        console.log("semaphore block");
      }
    }
  }

  main = () => {
    window.addEventListener('scroll', this.eventHandler);
    if(this.runImmediate){
      window.addEventListener('load', this.eventHandler);
    }
  }

  // ヘルプ表示
  static help = () => {
    console.log(`
      usage:
        let obj = new AutoLoadAnchor({
          anchorSelector : 'anySelector', // required
          func : funcObjectWhenAnchorIsAppered, // required
          runImmadeate: false, // true if run func when document is loaded
          gap: 0, // y-coodinate gap when anchor is appered. positive value, y-coodinate of anchor will shift downward.
          anchorPoint: "top" // Specify "top" or "bottom" which side to use as the ancherpoint.
        });
        
        function funcObjectWhenAncherIsAppered(targetAnchor){
          // write code when target anchor is appeaed.
        }

        // when you want to stop AutoLoadAnchor:
        obj.stop();
        // when you want to restart AutoLoadAnchor:
        obj.restart();
    `);
  }
}

export default AutoLoadAncher;