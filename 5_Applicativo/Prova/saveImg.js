//save Image Dot
function saveDotImage() {
    var link = document.createElement('a');
    link.download = 'image.png';
    link.href = document.getElementById('canvas3').toDataURL()
    link.click();
}