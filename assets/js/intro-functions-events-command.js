window.onresize = function (){

    var elem = document.getElementById("search-options");

    doc.heightChange();

    document.body.style.backgroundSize = "none";
    document.body.style.backgroundSize = "cover";

}

doc.EventUtil.addHandler(document.getElementById("search-check"), "click", function (){
    doc.introEffect.check(document.getElementById("search-check"));
});
doc.EventUtil.addHandler(document.getElementById("bingSE"), "click", function (){
    doc.introEffect.check(document.getElementById("bingSE"));
});
doc.EventUtil.addHandler(document.getElementById("baiduSE"), "click", function (){
    doc.introEffect.check(document.getElementById("baiduSE"));
});
doc.EventUtil.addHandler(document.getElementById("googleSE"), "click", function (){
    doc.introEffect.check(document.getElementById("googleSE"));
});
doc.EventUtil.addHandler(document.getElementById("search-text"), "click", function (){
    doc.introEffect.textCloseSelector();
});
doc.EventUtil.addHandler(document.getElementById("search-action"), "click", function (){
    doc.introEffect.textCloseSelector();
});
//搜索框下拉功能实现

/*
if (doc.browser == "LowIE"){

}
*/
//针对IE8及以下用户提出建议
