/**
 * Created by Simon on 2017/6/27.
 */
window.onload = function () {
    var bodyStyle = document.body.style;
    bodyStyle.mozUserSelect = 'none';
    bodyStyle.webkitUserSelect = 'none';

    initCanvas();
};

window.addEventListener("resize", function () {
    initCanvas();
});

function initCanvas() {
    var imgBottom = new Image();
    var canvas = document.querySelector('canvas');
    canvas.style.backgroundColor = 'transparent';
    canvas.style.position = 'absolute';
    imgBottom.src = '../images/sample1_a.jpg';
    var imgScale = 0.6;

    imgBottom.addEventListener('load', function() {
        var ctx;
        var srcWidth = imgBottom.width,
            srcHeight = imgBottom.height;
        var ratio = srcWidth / srcHeight;

        var screenWidth = window.innerWidth;
        var screenHeight = window.innerHeight;

        var dstWidth;
        var dstHeight;
        // if (screenWidth >= screenHeight) {
        //     dstWidth = screenWidth * imgScale;
        //     dstHeight = dstWidth / ratio;
        // } else {
        //     dstHeight = screenHeight * imgScale;
        //     dstWidth = dstHeight * ratio;
        // }
        dstHeight = screenHeight * imgScale;
        dstWidth = dstHeight * ratio;

        var container = document.getElementById("container");
        container.style.width = (dstWidth + 2) + "px";

        var offsetX = canvas.offsetLeft,
            offsetY = canvas.offsetTop;
        var mouseDown = false;

        function layer(ctx) {
            var imgTop = new Image();
            imgTop.src = '../images/sample1_a.jpg';
            ctx.fillStyle = 'gray';
            ctx.drawImage(imgTop, 0, 0, dstWidth, dstHeight);
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
                ctx.arc(x, y, 10, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        canvas.width = dstWidth;
        canvas.height = dstHeight;
        canvas.style.backgroundImage = 'url(../images/sample1_b.jpg)';
        canvas.style.backgroundSize = dstWidth + "px " + dstHeight + "px";
        ctx = canvas.getContext('2d');
        ctx.fillStyle = 'transparent';
        ctx.fillRect(0, 0, dstWidth, dstHeight);
        layer(ctx);

        ctx.globalCompositeOperation = 'destination-out';

        canvas.addEventListener('touchstart', eventDown);
        canvas.addEventListener('touchend', eventUp);
        canvas.addEventListener('touchmove', eventMove);
        canvas.addEventListener('mousedown', eventDown);
        canvas.addEventListener('mouseup', eventUp);
        canvas.addEventListener('mousemove', eventMove);
    });
}