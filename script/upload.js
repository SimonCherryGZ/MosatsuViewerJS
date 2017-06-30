/* lalala */
var resultTop = document.getElementById("result1");
var inputTop = document.getElementById("file_input1");
var resultBottom = document.getElementById("result2");
var inputBottom = document.getElementById("file_input2");
var type = 0;

if(typeof FileReader === 'undefined'){
    resultTop.innerHTML = "抱歉，你的浏览器不支持 FileReader";
    inputTop.setAttribute('disabled','disabled');
}else{
    inputTop.addEventListener('change', function () {
        type = 0;
        readFile();
    });
    inputBottom.addEventListener('change', function () {
        type = 1;
        readFile();
    });
}

function readFile(){
    var input;
    var result;
    var card;
    if (type == 0) {
        input = inputTop;
        result = resultTop;
        card = imgTop;
    } else {
        input = inputBottom;
        result = resultBottom;
        card = imgBottom;
    }
    var file = input.files[0];
    if(!/image\/\w+/.test(file.type)){
        alert("请确保文件为图像类型");
        return false;
    }
    var reader = new FileReader();

    reader.onload = function() {
        var image = new Image();
        image.src = reader.result;
        image.onload = function() {
            var newWidth = image.width;
            var newHeight = image.height;
            var ratio = newHeight / newWidth;

            if (newHeight > 400) {
                newHeight = 400;
                newWidth = newHeight / ratio;
            }

            result.innerHTML = '<img src="'+reader.result+'" height="'+newHeight+'" width="'+newWidth+'"  alt=""/>';

            card.addEventListener('load', function() {
                console.debug("card on load");
                // initCanvas();
            });
            card.src = image.src;
        };
    };

    reader.readAsDataURL(file);
}