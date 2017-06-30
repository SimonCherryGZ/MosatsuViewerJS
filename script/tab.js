/**
 * Created by Simon on 2017/6/29.
 */
var switchTab = function(v) {
    var llis = document.getElementsByTagName("li");
    for(var i = 0; i < llis.length; i++) {
        var lli = llis[i];
        if(lli == document.getElementById("tab" + v)) {
            lli.style.backgroundColor = "orange";
        } else {
            lli.style.backgroundColor = "gray";
        }
    }

    var divs = document.getElementsByClassName("tab_css");
    for(var i = 0; i < divs.length; i++) {
        var divv = divs[i];
        if(divv == document.getElementById("tab" + v + "_content")) {
            divv.style.display = "block";
        } else {
            divv.style.display = "none";
        }
    }

    if (v == 1) {
        initCanvas();
    }
};