/**
 * auto-load-anchor.js
 * 
 * by haruyan-hopemucci
 * 
 * create: 2020.10.14
 * 
 * changelog:(above is newer)
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
    this.main();
  }
  stop = () => this.terminated = 1;

  restart = () => this.terminated = 0;

  main = () => {
    window.addEventListener('scroll', event => {
      if(this.terminated != 0){
        return;
      }
      let target = document.querySelector(this.anchorSelector);
      // console.dir(target);
      // 表示されているウィンドウ領域の座標判定
      let wtop = window.scrollY;  // 現ウィンドウのtop位置がドキュメント全体のどの位置か
      let wbtm = wtop + window.innerHeight  // 現ウィンドウのbottom位置がドキュメント全体のどの位置か
      // console.log('wtop:',wtop, 'wbtm', wbtm);
      //　対象要素の座標取得
      let ttop = target.offsetTop;
      // console.log('ttop:',ttop);
      // 対象要素のtopがwindowのbottom以下の場合はウィンドウ内にあるという判定になる。
      // また、セマフォが0のときのみ中の関数を実行する。
      if(ttop <= wbtm && ttop >= wtop && this.semaphore == 0){
        // セマフォ処理を関数の前後で行う。
        this.semaphore = 1;
        this.func();
        this.semaphore = 0;
      }
    });
  }

  // ヘルプ表示
  static help = () => {
    console.log(`
      usage:
        let obj = new AutoLoadAnchor({
          anchorSelector : 'anySelector',
          func : funcObjectWhenAncherIsAppered,
        });
        
        // when you want to stop AutoLoadAnchor:
        obj.stop();
        // when you want to restart AutoLoadAnchor:
        obj.restart();
    `);
  }
}

export default AutoLoadAncher;