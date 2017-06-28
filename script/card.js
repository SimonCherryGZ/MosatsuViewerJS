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
    var imgScale = 1.0;

    imgBottom.addEventListener('load', function() {
        var ctx;
        var imgWidth = imgBottom.width,
            imgHeight = imgBottom.height;

        var ratio = imgWidth / imgHeight;

        var windowWidth = window.innerHeight * imgScale * ratio,
            windowHeight = window.innerHeight * imgScale;

        var offsetX = canvas.offsetLeft,
            offsetY = canvas.offsetTop;
        var mouseDown = false;

        function layer(ctx) {
            var imgTop = new Image();
            imgTop.src = '../images/sample1_a.jpg';
            ctx.fillStyle = 'gray';
            ctx.drawImage(imgTop, 0, 0, windowWidth, windowHeight);
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

        canvas.width = windowWidth;
        canvas.height = windowHeight;
        canvas.style.backgroundImage = 'url(../images/sample1_b.jpg)';
        canvas.style.backgroundSize = windowWidth + "px " + windowHeight + "px";
        ctx = canvas.getContext('2d');
        ctx.fillStyle = 'transparent';
        ctx.fillRect(0, 0, windowWidth, windowHeight);
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