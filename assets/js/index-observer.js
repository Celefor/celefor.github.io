/*
*******************************************************
* Author: Celefor lee
* Date: 06/08/19
* Description: The program response some events.
* Alert: The program can't be well compiled under the
*		 environment of IE8 or under it.
*******************************************************
*/

doc.IndexPageControl = function (decrease, increase){
	decreasor = document.querySelector(decrease);
	increasor = document.querySelector(increase);
	decreasor.style.display = "none";
	increasor.style.display = "inline-block";
	//转换主页
	if (increase == "#search-box"){
		var millisecond = new Date().getTime();
		var expiresTime = new Date(millisecond + 60 * 1000 * 15);
		doc.CookieUtil.set("se_clicked", "true", expiresTime);
		//设置COOKIE
	} else {
		var millisecond = new Date().getTime();
		var expiresTime = new Date(millisecond + 60 * 1000 * 15);
		doc.CookieUtil.set("se_clicked", "false", expiresTime);
	}
}

window.onload = function(){
	var num = 1,
		str = "rgba(0, 0, 0, ",
		elem = document.getElementById("loading-black-cover"),
		timeout = setTimeout(function(){
			if(num <= 0.5) return false;
			elem.style.backgroundColor = str + num.toString() + ")";
			num -= 0.065;
			setTimeout(arguments.callee, 100);
		}, 1);
	if (doc.CookieUtil.get("se_clicked") == "true") {
		doc.IndexPageControl("#index-introduction", "#search-box");
	}
};
document.querySelector(".wp").onclick = function(){
	var wp = document.querySelector("#wordpress");
	//document.querySelector("#wechat").style.display = "none";
	document.querySelector("#qq").style.display = "none";
	wp.style.display = (wp.style.display == "block") ? "none" : "block";
};
document.querySelector(".qq").onclick = function(){
	var qq = document.querySelector("#qq");
	document.querySelector("#wordpress").style.display = "none";
	//document.querySelector("#wechat").style.display = "none";
	qq.style.display = (qq.style.display == "block") ? "none" : "block";
};
/*document.querySelector(".wx").onclick = function(){
	var wx = document.querySelector("#wechat");
	document.querySelector("#wordpress").style.display = "none";
	document.querySelector("#qq").style.display = "none";
	wx.style.display = (wx.style.display == "block") ? "none" : "block";
};*/

doc.EventUtil.addHandler(document.querySelector(".nav-left a"), "click", function (){
	if (Math.random() < 0.5) doc.IndexPageControl("#index-introduction", "#search-box");
	else doc.IndexPageControl("#search-box", "#index-introduction");
});

