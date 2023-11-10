//save Image Dot
function saveDotImage() {
    var name= document.getElementById("nameImg").value;
    var ext= document.getElementById("formatImg").value;
    var link = document.createElement('a');
    link.download = name+"."+ext;
    link.href = document.getElementById('canvas').toDataURL();
    link.click();
}