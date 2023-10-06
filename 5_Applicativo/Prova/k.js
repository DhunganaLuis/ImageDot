var canvas,
    context,
    dragging = false, 
    dragStartLocation,
    snapshot;



function getCanvasCoordinates(event) {
    var x = event.clientX - canvas.getBoundingClientRect().left;
    var y = event.clientY - canvas.getBoundingClientRect().top;

    return {x: x, y: y};
}

function takeSnapShot() {
    snapshot = context.getImageData(0, 0, canvas.width, canvas.height);
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

//Drag Stop
function dragStop(event) {
    dragging = false; //dragging stops here
    restoreSnapShot();
    var position = getCanvasCoordinates(event);
    //generic
    draw(position);
}
function init() {
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');


    var lineWidth = document.getElementById('lineWidth'),
        fillColor = document.getElementById('fillColor'),
        strokeColor = document.getElementById('strokeColor'),
        canvasColor = document.getElementById('backgroundColor'),
        clearCanvas = document.getElementById('clearCanvas'),
        textInput = document.getElementById('textInput');

    context.lineWidth = lineWidth.value;
    context.fillStyle = fillColor.value;

    canvas.addEventListener('mousedown', dragStart, false);
    canvas.addEventListener('mousemove', drag, false);
    canvas.addEventListener('mouseup', dragStop, false);
    lineWidth.addEventListener('input', changeLineWidth, false);
    fillColor.addEventListener('input', changeFillStyle, false);
    strokeColor.addEventListener('input', changeStrokeStyle, false);
    canvasColor.addEventListener('input', changeBackgroundColor, false);
    clearCanvas.addEventListener('click', eraseCanvas, false);
    textInput.addEventListener('input', writeCanvas, false);
}

window.addEventListener('load', init, false);
