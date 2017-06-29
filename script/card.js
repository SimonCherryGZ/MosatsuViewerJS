/**
 * Created by Simon on 2017/6/27.
 */
var canvas;
var ctx;
var imgTop;
var imgBottom;
var imgScale = 0.6;
var paintSize = 10;
var mouseDown = false;
var dstWidth;
var dstHeight;
var offsetX;
var offsetY;

window.onload = function () {
    var bodyStyle = document.body.style;
    bodyStyle.mozUserSelect = 'none';
    bodyStyle.webkitUserSelect = 'none';

    initImage();
};

window.addEventListener("resize", function () {
    initCanvas();
});

function initImage() {
    canvas = document.querySelector('canvas');

    imgTop = new Image();
    imgTop.src = 'images/sample1_a.jpg';

    imgBottom = new Image();
    imgBottom.src = 'images/sample1_b.jpg';

    imgBottom.addEventListener('load', function() {
        initCanvas();
    });
}

function initCanvas() {
    recalculate();

    var container = document.getElementById("container");
    container.style.width = (dstWidth + 2) + "px";

    canvas.style.backgroundColor = 'transparent';
    canvas.style.position = 'absolute';

    canvas.width = dstWidth;
    canvas.height = dstHeight;
    canvas.style.backgroundImage = 'url(images/sample1_b.jpg)';
    canvas.style.backgroundSize = dstWidth + "px " + dstHeight + "px";

    offsetX = canvas.offsetLeft;
    offsetY = canvas.offsetTop;

    ctx = canvas.getContext('2d');
    ctx.fillStyle = 'transparent';
    ctx.fillRect(0, 0, dstWidth, dstHeight);
    layer(dstWidth, dstHeight);
    // ctx.globalCompositeOperation = 'destination-out';
    //
    // canvas.addEventListener('touchstart', eventDown);
    // canvas.addEventListener('touchend', eventUp);
    // canvas.addEventListener('touchmove', eventMove);
    // canvas.addEventListener('mousedown', eventDown);
    // canvas.addEventListener('mouseup', eventUp);
    // canvas.addEventListener('mousemove', eventMove);
    // canvas.addEventListener('mouseout', eventUp);
}

function recalculate() {
    var srcWidth = imgBottom.width,
        srcHeight = imgBottom.height;
    var ratio = srcWidth / srcHeight;

    // var screenWidth = window.innerWidth;
    var screenHeight = window.innerHeight;

    // if (screenWidth >= screenHeight) {
    //     dstWidth = screenWidth * imgScale;
    //     dstHeight = dstWidth / ratio;
    // } else {
    //     dstHeight = screenHeight * imgScale;
    //     dstWidth = dstHeight * ratio;
    // }
    dstHeight = screenHeight * imgScale;
    dstWidth = dstHeight * ratio;

    paintSize = dstWidth / 20;
}

function layer(dstWidth, dstHeight) {
    // ctx.fillStyle = 'gray';
    // ctx.drawImage(imgTop, 0, 0, dstWidth, dstHeight);
    if (imgTop.complete) {
        console.debug("imgTop complete");
        ctx.fillStyle = 'gray';
        ctx.drawImage(imgTop, 0, 0, dstWidth, dstHeight);

        ctx.globalCompositeOperation = 'destination-out';

        canvas.addEventListener('touchstart', eventDown);
        canvas.addEventListener('touchend', eventUp);
        canvas.addEventListener('touchmove', eventMove);
        canvas.addEventListener('mousedown', eventDown);
        canvas.addEventListener('mouseup', eventUp);
        canvas.addEventListener('mousemove', eventMove);
        canvas.addEventListener('mouseout', eventUp);
    } else {
        console.debug("imgTop not complete");
        imgTop.onload = function () {
            layer(dstWidth, dstHeight);
        }
    }
}

function eventDown(e){
    e.preventDefault();
    mouseDown = true;
}

function eventUp(e){
    e.preventDefault();
    mouseDown = false;
}

function eventMove(e){
    e.preventDefault();
    if(mouseDown) {
        if(e.changedTouches){
            e = e.changedTouches[e.changedTouches.length - 1];
        }
        var x = (e.clientX + document.body.scrollLeft || e.pageX) - offsetX || 0,
            y = (e.clientY + document.body.scrollTop || e.pageY) - offsetY || 0;
        ctx.beginPath();
        ctx.arc(x, y, paintSize, 0, Math.PI * 2);
        ctx.fill();
        // ctx.stroke();
    }
}

function updateUrl(url, key) {
    key = (key || 't') + '=';  //默认是“t”
    var reg = new RegExp(key + '\\d+');  //正则：t=1472286066028
    var timestamp = + new Date();
    if(url.indexOf(key) > -1) {  //有时间戳，直接更新
        return url.replace(reg, key + timestamp);
    } else {  //没有时间戳，加上时间戳
        if(url.indexOf('\?') > -1) {
            var urlArr = url.split('\?');
            if(urlArr[1]) {
                return urlArr[0] + '?' + key + timestamp + '&' + urlArr[1];
            } else {
                return urlArr[0] + '?' + key + timestamp;
            }
        } else {
            if(url.indexOf('#') > -1) {
                return url.split('#')[0] + '?' + key + timestamp + location.hash;
            } else {
                return url + '?' + key + timestamp;
            }
        }
    }
}

function onPaintSizeChange() {
    var value = document.getElementById('paintSizeRange').value ;
    console.debug("paint size: " + value);
    paintSize = value * 2;
}