doc = {
    dis: [],
    loading: true,
    $: function (value){
        return document.querySelectorAll(value);
    },
    getElementsByProper: function (tagName,theProperty){
        var points = document.querySelectorAll(tagName),
            elems = [];
        for (var i=0, len=points.length; i < len; i++){
            if (typeof points[i].getAttribute(theProperty) == "string"){
                elems.push(points[i]);
            }
        }
        return elems;
    },
    unsetSameSpan: function (){
        var elems = doc.getElementsByProper("span", "data-id");
        for (var i=1,len=elems.length; i<len; i++){
            if (elems[i].getAttribute("data-id") == elems[0].getAttribute("data-id")){
                elems[i].style.display = "none";
                if (doc.dis.length == 2){
                    doc.dis.splice(0,1);
                }
                doc.dis.push(elems[i]);
            }
        }
    },
    recoverOldSpan: function (){
        if (doc.dis != null){
            doc.dis[0].style.display = "inline-block";
        }
    },
    addLoadEvent: function (func){
        var oldonload = window.onload;
        if (typeof window.onload != 'function'){
            window.onload = func;
        } else {
            window.onload = function(){
                oldonload();
                func();
            }
        }
    },
    heightChange: function (){
        document.getElementById("search-options").style.height = doc.introEffect.heightNumber(doc.introEffect.bigSpanNum, doc.introEffect.smallSpanNum) + "em";
    },
    loaded: function (){
        doc.loading = false;
    },
    browser: (function (){
        var isIE = !! window.ActiveXObject;
        var isIELow = isIE && document.documentMode <= 8;
        if (isIELow){
            return "LowIE";
        } else if (isIE){
            return "IE";
        } else {
            return "other";
        }
    })(),
    pageWidth: function (){
        var pageWidth = window.innerWidth;

        if (typeof pageWidth != "number"){
            if (document.compatMode == "CSS1Compat"){
                pageWidth = document.documentElement.clientWidth;
            } else {
                pageWidth = document.body.clientWidth;
            }
        }

        return pageWidth;
    },
    pageHeight: function (){
        var pageHeight = window.innerHeight;

        if (typeof pageHeight != "number"){
            if (document.compatMode == "CSS1Compat"){
                pageHeight = document.documentElement.clientHeight;
            } else {
                pageHeight = document.body.clientHeight;
            }
        }

        return pageHeight;
    },
    getStyle: function (elem, attr) {
        if(elem.currentStyle) {
            return elem.currentStyle[attr];
        } else {
            return window.getComputedStyle(elem, false)[attr];
        }
    }
};
doc.introEffect = {
    num: 0,
    openIt: null,
    closeIt: null,
    isOpening: null,
    isClosing: null,
    bigSpanNum: 2.688392,
    smallSpanNum: 2.36,
    box: document.getElementById("search-options-available"),
    wholeBox: document.getElementById("search-options"),
    check: function (elem){
        var elems,
            that = this;
        if (elem.id == "search-check" && this.box.style.display != "none"){

            /*当触发onclick的是被选中的元素且box是有形的*/
            that.closeSelector();
        } else if (elem.id == "search-check" && this.box.style.display == "none"){

            /*当触发onclick的是被选中的元素且box是无形的*/
            that.openSelector();
        } else if (elem.id != "search-check" && this.box.style.display != "none"){

            /*当触发onclick的不是被选中的元素且box是有形的*/
            elems = doc.getElementsByProper("span", "data-id");//获取所有的span/data-id元素
            elems[0].setAttribute("data-id", elem.getAttribute("data-id"));
            elems[0].setAttribute("data-textName", elem.getAttribute("data-textName"));
            elems[0].setAttribute("data-url", elem.getAttribute("data-url"));
            //更改第一个元素的三属性，Cookies将使用

            elems[0].innerHTML = elem.innerHTML;//内容替换
            doc.unsetSameSpan();//重复元素移除
            doc.recoverOldSpan();//原移除元素复位
            that.closeSelector();
            that.SEChange(elem);
        } else {

            /*当触发onclick的不是被选中的元素且box是无形的，此项不可能*/
            throw new error("Unexpected Error: We found an impossible error.");
        }
    },
    SEChange: function (elem){
        var data_url = elem.getAttribute("data-url"),
            data_textName = elem.getAttribute("data-textName"),
            form_action = document.getElementById("search-box"),
            search_text = document.getElementById("search-text");
        form_action.setAttribute("action", data_url);
        search_text.setAttribute("name", data_textName);
        doc.introCookie.setSECookie();//记录最后一次选择的搜索引擎并存入Cookies
    },
    heightNumber: function (big, small){
        if (doc.pageWidth() >= 200 && doc.pageWidth() <= 550){
            return small;
        } else {
            return big;
        }
    },
    textCloseSelector: function (){
        if (this.box.style.display == "none"){
            return false;
        } else {
            this.closeSelector();
        }
    },
    openSelector: function (){
        var that = this,
            spans = doc.getElementsByProper("span", "data-placeholder").length-1,
            high = this.heightNumber(this.bigSpanNum, this.smallSpanNum)*spans,
            boxHeight = parseFloat(this.wholeBox.style.height.split("em")[0]);
            if (that.isOpening == true || that.isClosing == true || doc.loading != false) return false;
        openIt = setTimeout(function (){
            that.isOpening = true;
            that.box.style.display = "inline-block";
            that.num++;
            boxHeight += high/30;
            that.wholeBox.style.height = boxHeight + "em";
            if (that.num == 30){
                that.num = 0;
                that.isOpening = false;
            } else {
                setTimeout(arguments.callee, 10);
            }
        }, 10);
    },
    closeSelector: function (){
        var that = this,
            spans = doc.getElementsByProper("span", "data-placeholder").length-1,
            high = this.heightNumber(this.bigSpanNum, this.smallSpanNum)*spans,
            boxHeight = this.wholeBox.style.height.split("em")[0];
            if (that.isOpening == true || that.isClosing == true || doc.loading != false) return false;
        closeIt = setTimeout(function (){
            that.isClosing = true;
            that.num++;
            boxHeight -= high/30;
            that.wholeBox.style.height = boxHeight + "em";
            if (that.num == 30){
                that.num = 0;
                that.box.style.display = "none";
                that.isClosing = false;
            } else {
                setTimeout(arguments.callee, 10);
            }
        }, 10);
    }
};
doc.introCookie = {
    //搜索引擎的Cookies储存格式(intro-data)为 SE=chineseName:idValue:textName:URL;
    //从Cookies中获取最后选择的搜索引擎
    changeSE: function (){
        if (!!document.cookie && doc.CookieUtil.get("SE") != null && doc.CookieUtil.get("SE") != ""){
            var theValue = doc.CookieUtil.get("SE"),
                theForm = document.getElementById("search-box"),
                theSpan = document.getElementById("search-check"),
                searchText = document.getElementById("search-text");
            theValue = theValue.split("|");
            theSpan.innerHTML = theValue[0];
            searchText.setAttribute("name", theValue[2]);
            theForm.setAttribute("action", theValue[3]);
            //以上为主要功能，以下较为次要
            theSpan.setAttribute("data-id", theValue[1]);
            theSpan.setAttribute("data-textName", theValue[2]);
            theSpan.setAttribute("data-url", theValue[3]);
        }
    },
    //将最终选择的搜索引擎的intro-data记入Cookies
    setSECookie: function (){
        if (!!document.cookie && doc.CookieUtil.get("SE") != null && doc.CookieUtil.get("SE") != ""){
            doc.CookieUtil.unset("SE");
        }
        var theSpan = document.getElementById("search-check"),
            searchText = document.getElementById("search-text"),
            theArr = [];
        theArr.push(theSpan.innerHTML);
        theArr.push(theSpan.getAttribute("data-id"));
        theArr.push(theSpan.getAttribute("data-textName"));
        theArr.push(theSpan.getAttribute("data-url"));
        theArr = theArr.join("|");
        doc.CookieUtil.set("SE", theArr, this.timeForCookie.expireByYear(10));
    },
    timeForCookie: {
        now: function (){
            var time = new Date();
            return time.getTime();
            //返回当前毫秒数
        },
        expireByDay: function (days){
            var theExpire = new Date(parseInt(this.now()) + days * 86400000);
            return theExpire;
        },
        expireByYear: function (years){
            var theExpire = new Date(parseInt(this.now()) + years * 31560000000);
            return theExpire;
        }
    }
};
