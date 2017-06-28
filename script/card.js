/**
 * Created by Simon on 2017/6/27.
 */
window.onload = function () {
    // alert("Hello");
    // // var c = document.getElementById('myCanvas');
    // // var ctx = c.getContext('2d');
    // // ctx.fillStyle="#FF0000";
    // // ctx.fillRect(0,0,150,75);

    var bodyStyle = document.body.style;
    bodyStyle.mozUserSelect = 'none';
    bodyStyle.webkitUserSelect = 'none';

    var imgBottom = new Image();
    var canvas = document.querySelector('canvas');
    canvas.style.backgroundColor = 'transparent';
    canvas.style.position = 'absolute';
    imgBottom.src = '../images/sample1_a.jpg';

    imgBottom.addEventListener('load', function() {
        var ctx;
        var w = imgBottom.width,
            h = imgBottom.height;
        var offsetX = canvas.offsetLeft,
            offsetY = canvas.offsetTop;
        var mouseDown = false;

        function layer(ctx) {
            var imgTop = new Image();
            imgTop.src = '../images/sample1_a.jpg';
            ctx.fillStyle = 'gray';
            ctx.drawImage(imgTop, 0, 0);
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

        canvas.width = w;
        canvas.height = h;
        canvas.style.backgroundImage = 'url(../images/sample1_b.jpg)';
        ctx = canvas.getContext('2d');
        ctx.fillStyle = 'transparent';
        ctx.fillRect(0, 0, w, h);
        layer(ctx);

        ctx.globalCompositeOperation = 'destination-out';

        canvas.addEventListener('touchstart', eventDown);
        canvas.addEventListener('touchend', eventUp);
        canvas.addEventListener('touchmove', eventMove);
        canvas.addEventListener('mousedown', eventDown);
        canvas.addEventListener('mouseup', eventUp);
        canvas.addEventListener('mousemove', eventMove);
    });
};