doc.introCookie.changeSE();
//改变默认搜索引擎
doc.addLoadEvent(doc.unsetSameSpan);
//相同搜索引擎选项去除
doc.addLoadEvent(doc.heightChange);
//改变选择框高度
doc.addLoadEvent(doc.loaded);
//doc.addLoadEvent();

(function (){
    var pageHeight = doc.pageHeight();
        that = document.getElementById("search-box"),
        num1 = (that.offsetHeight)? (pageHeight/2) - (that.offsetHeight/2): pageHeight/2 - 20,
        num2 = pageHeight/10;
    that.style.top = num1 - num2 + "px";
    //form固定
})();