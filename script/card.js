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
var pixelRatio = 1.0;

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
    ctx = canvas.getContext('2d');

    // 屏幕的设备像素比
    var devicePixelRatio = window.devicePixelRatio || 1;

    // 浏览器在渲染canvas之前存储画布信息的像素比
    var backingStoreRatio = ctx.webkitBackingStorePixelRatio ||
        ctx.mozBackingStorePixelRatio ||
        ctx.msBackingStorePixelRatio ||
        ctx.oBackingStorePixelRatio ||
        ctx.backingStorePixelRatio || 1;

    pixelRatio = devicePixelRatio / backingStoreRatio;
    console.debug("pixelRatio: " + pixelRatio);

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

    canvas.width = dstWidth * pixelRatio;
    canvas.height = dstHeight * pixelRatio;
    canvas.style.width = dstWidth + "px";  // 注意不要漏了px
    canvas.style.height = dstHeight + "px";
    canvas.style.backgroundImage = 'url(' + imgBottom.src + ')';
    canvas.style.backgroundSize = dstWidth + "px " + dstHeight + "px";

    offsetX = canvas.offsetLeft;
    offsetY = canvas.offsetTop;

    layer(dstWidth, dstHeight);
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
    if (imgTop.complete) {
        console.debug("imgTop complete");
        ctx.fillStyle = 'gray';
        ctx.drawImage(imgTop, 0, 0, dstWidth * pixelRatio, dstHeight * pixelRatio);
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
        ctx.arc(x * pixelRatio, y * pixelRatio, paintSize * pixelRatio, 0, Math.PI * 2);
        ctx.fill();
    }
}

function resetCanvas() {
    canvas.width = dstWidth * pixelRatio;
    canvas.height = dstHeight * pixelRatio;

    ctx.fillStyle = 'gray';
    ctx.drawImage(imgTop, 0, 0, dstWidth * pixelRatio, dstHeight * pixelRatio);
    ctx.globalCompositeOperation = 'destination-out';
}

function onPaintSizeChange() {
    var value = document.getElementById('paintSizeRange').value ;
    console.debug("paint size: " + value);
    paintSize = value * 2;
}