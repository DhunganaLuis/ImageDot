function takeSnapShot() {
    snapshot = context.getImageData(0, 0, canvas.width, canvas.height);
}
function getMousePosition(canvas, event) {
    let rect = canvas.getBoundingClientRect();
    let scaleX = canvas.width / rect.width;
    let scaleY = canvas.height / rect.height;
    let x = Math.round((event.x - rect.left) * scaleX);
    let y = Math.round((event.y - rect.top) * scaleY);
    var coordinate = [x, y];
    return coordinate;
  }
  function restoreSnapShot() {
    context.putImageData(snapshot, 0, 0);
}
function drawRect(position) {
    console.log(position.x, dragStartLocation.x);
      var w = position.x - dragStartLocation.x ;
      var h = position.y - dragStartLocation.y  ;
      context.beginPath();
      context.rect(dragStartLocation.x, dragStartLocation.y, w, h);
  }
  function dragStart(event) {
    dragging = true;
    dragStartLocation = getCanvasCoordinates(event);
    takeSnapShot();
}
function calculateAngle(start, current) {

    var angle = 360 - Math.atan2(current.y - start.y, current.x - start.x) * 180 / Math.PI;


    return angle;
}
function drag(event) {
    var position;
    if (dragging === true) {
        restoreSnapShot();
        position = getCanvasCoordinates(event);
        //generic
        draw(position);
    }
}

function dragStop(event) {
    dragging = false; 
    restoreSnapShot();
    var position = getCanvasCoordinates(event);
    draw(position);
}