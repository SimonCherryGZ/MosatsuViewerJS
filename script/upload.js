/* lalala */
var result = document.getElementById("result");
var input = document.getElementById("file_input");

if(typeof FileReader === 'undefined'){
    result.innerHTML = "抱歉，你的浏览器不支持 FileReader";
    input.setAttribute('disabled','disabled');
}else{
    input.addEventListener('change',readFile,false);
}

function readFile(){
    var file = this.files[0];
    if(!/image\/\w+/.test(file.type)){
        alert("请确保文件为图像类型");
        return false;
    }
    var reader = new FileReader();

    // reader.onload = function(e){
    //     result.innerHTML = '<img src="'+this.result+'" alt=""/>'
    // }

    reader.onload = function() {
        var image = new Image();
        image.src = reader.result;
        image.onload = function() {
            // console.debug("image.width: " + image.width);
            var newWidth = image.width;
            var newHeight = image.height;
            var ratio = newHeight / newWidth;

            if (newHeight > 400) {
                newHeight = 400;
                newWidth = newHeight / ratio;
            }

            // result.innerHTML = '<img src="'+this.result+'" alt=""/>';
            result.innerHTML = '<img src="'+reader.result+'" height="'+newHeight+'" width="'+newWidth+'"  alt=""/>';
        };
    };

    reader.readAsDataURL(file);
}