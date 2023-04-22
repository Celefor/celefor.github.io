var Ctors = {
    max: 20,
    index: null,
    XHR: function (url, method, async, type, func){
        if (!url || !method) {
            console.error("url or method is not defined.");
            return 0;
        }
        var xhr = new XMLHttpRequest(), that = this;
        xhr.open(method, url, async);
        xhr.setRequestHeader('content-type', type);
        xhr.send();
        xhr.onload = function() {
            if (xhr.status == 200) {
                that.type = type;
                that.data = (type == "application/json") ? JSON.parse(xhr.responseText) : xhr.responseText;
                that.status = xhr.status;
                that.result = func(that.data, that.type);
            } else {
                console.error('请求失败：' + xhr.status);
            }
        };
    },
    buildCatalog: function (data, type){
        for (var i = (Ctors.index == null) ? (Ctors.index = data.length) - 1 : Ctors.index; i >= 0; i--) {
            if (Ctors.index - i >= Ctors.max) break;
            document.querySelector("#pages").innerHTML += "<h2><a href='/pages/blogs/" + data[i].url + ".html'>" + data[i].title + "</a></h2>";
            document.querySelector("#pages").innerHTML += "<p>" + data[i].date + "&nbsp;&nbsp;&nbsp;&nbsp;" + data[i].keywords + "</p>";
        }
        Ctors.index = i;
    },/*
    build: function (data, type){
        if (type == "application/json") {
            for (var i = data.length - 1; i >= 0 && data.length - this.max >= 0; i--) {
                document.querySelector("#pages").innerHTML += "<h2><a href='/pages/blogs/" + data[i].url + ".html'>" + data[i].title + "</a></h2>";
                document.querySelector("#pages").innerHTML += "<p>" + data[i].date + "&nbsp;&nbsp;&nbsp;&nbsp;" +  "</p>";
            }
        }
    }*/
}

var catalog = new Ctors.XHR("/pages/blogs/data.json", "GET", true, "application/json", Ctors.buildCatalog);