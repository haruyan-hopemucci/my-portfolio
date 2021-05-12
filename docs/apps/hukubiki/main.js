itemdata = {
    f: {name: 'ふくびきけん'  , buyp:0,  sellp:53},
    y: {name: 'やくそう'      , buyp:8,  sellp:4},
    d: {name: 'どくけしそう'  , buyp:10, sellp:8},
    k: {name: 'キメラのつばさ', buyp:25, sellp:20},
};

opdata = {
    o:"おまけ", s:"売", b:"買",
}
/**
 * 所持金の各桁を合計して5の倍数だったらtrue
 * ふくびきけん取得判定
 * @param {uint} g 
 */
function checkGold(g){
    if(g <= 0){
        return false;
    }
    let v = 0;
    while(g > 0){
        v += g % 10;
        g = Math.floor(g/10);
    }
    return (v % 5) === 0;
}

function getTrans(g){
    if(g < 0){
        return [false, []];
    }
    if(checkGold(g-25)){
        return [true, ['k']];
    }else if(checkGold(g-20)){
        return [true, ['d','d']];
    }else if(checkGold(g-18)){
        return [true, ['d','y']];
    }else if(checkGold(g-10)){
        return [true, ['d']];
    }else if(checkGold(g-16)){
        return [true, ['y','y']];
    }else if(checkGold(g-24)){
        return [true, ['y','y']];
    }else if(checkGold(g-8)){
        return [true, ['y']];
    }else{
        return [false, []];
    }
}

function buy(g,trans,inv,item_id){
    let item = itemdata[item_id];
    g -= item.buyp;
    trans.push(['b',item_id,item.buyp,"",g]);
    inv.push(item_id);
    if(checkGold(g)){
        trans.push(['o','f',"","",g]);
        inv.push('f');
    }
    return [g, trans, inv];
}

/**
 * 
 * @param {int} g 
 * @param {Array} trans 
 * @param {Array} inv 
 * @param {string} item_id 
 */
function sell(g,trans,inv,item_id){
    let item = itemdata[item_id];
    g += item.sellp;
    trans.push(['s',item_id,"",item.sellp,g]);
    inv.splice(inv.indexOf(item_id),1);
    return [g, trans, inv];
}

function run(arg_g){
    let g = arg_g;
    let inv = ['y'];
    let trans = [];
    let jadge = false;
    let items = [];
    while(!jadge){
        [jadge, items] = getTrans(g);
        // 当該パターンがない場合、やくそうを売買して4G減らす
        if(!jadge && g <= 8){
            alert("お金を増やせるパターンがありません。");
            return;
        }
        if(!jadge){
                [g,trans,inv] = buy(g,trans,inv,'y');
            [g,trans,inv] = sell(g,trans,inv,'y');
        }
    }
    for(let item_id of items){
        [g,trans,inv] = buy(g,trans,inv,item_id);
    }
    // やくそう1つになるまで売買
    while(!(inv.length === 1 && inv[0] === 'y')){
        // やくそう2つ：両方売ってやくそう1つ購入
        if(inv.filter( e => e === 'y').length >= 2){
            [g,trans,inv] = sell(g,trans,inv,'y');
            [g,trans,inv] = sell(g,trans,inv,'y');
            [g,trans,inv] = buy(g,trans,inv,'y');
        }else if(inv.filter(e => e === 'd').length >= 1){
            // どくけしそう：売却してやくそう購入
            [g,trans,inv] = sell(g,trans,inv,'d');
            [g,trans,inv] = buy(g,trans,inv,'y');
        }else if(inv.filter(e => e === 'k').length >= 1){
            // キメラのつばさ：売却してどくけしそう2つ購入
            [g,trans,inv] = sell(g,trans,inv,'k');
            [g,trans,inv] = buy(g,trans,inv,'d');
            [g,trans,inv] = buy(g,trans,inv,'d');
        }else{
            // 売れるものがなくなったらふくびきけんをすべて売却
            [g,trans,inv] = sell(g,trans,inv,'f');
        }
    }
    
    return [g,trans,inv];
}

function main(){
    let gold = document.querySelector("#gold").value;
    let [result_gold, trans, inv] = run(gold);
    // console.log(result);
    console.log(result_gold);
    console.log(trans);
    let tbl = document.querySelector("table#op-list tbody");
    tbl.innerHTML = "";
    let tmp = document.querySelector("template#template-row").content
    for(let tran of trans){
        let row = document.importNode(tmp, true);
        row.querySelector(".op").innerHTML = opdata[tran[0]];
        row.querySelector(".item-name").innerHTML = itemdata[tran[1]].name;
        row.querySelector(".buyp").innerHTML = tran[2];
        row.querySelector(".sellp").innerHTML = tran[3];
        row.querySelector(".bl").innerHTML = tran[4];
        tbl.appendChild(row);
    }
    document.querySelector("#gold").value = result_gold;
}