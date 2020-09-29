import {} from "./jquery-3.5.1.js"

// li要素をmouseoverしたらactiveクラス付与
$('li.list-group-item').on('mouseenter',(e)=>{
    $(e.target).addClass('active');
})
.on('mouseout',(e)=>{
    $(e.target).removeClass('active');
});

// li要素をmouseoverしたらactiveクラス付与
$('.list-group-item').on('mouseenter',(e)=>{
    $(e.target).addClass('active');
})
.on('mouseout',(e)=>{
    $(e.target).removeClass('active');
});