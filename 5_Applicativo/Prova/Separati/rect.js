var starDragX = 0;
var starDragY = 0;
var canDrag = true;
var shouldDrag = false;
let canvas = document.getElementById("canvas");
var context = canvas.getContext('2d');
var rettangoli;
class Rect {
    constructor(posX, posY, startX, starY) {
        this.startX = startX;
        this.starY = starY;
        this.x = posX;
        this.y = posY;
    }
    draw(context) {
        var w = this.x - this.startX;
        var h = this.y - this.starY;
        context.beginPath();
        context.rect(this.startX, this.starY, w, h);
        context.stroke();
        console.log("draw");
    }

}
function dragStart(event) {
    if (canDrag) {
        shouldDrag = true;
        var startDragCoo = getMousePosition(canvas, event);
        starDragX = startDragCoo[0];
        starDragY = startDragCoo[1];
    }

}
function drag(event) {
    if (shouldDrag) {
        clearCanvas(context);
        var lastCoo = getMousePosition(canvas, event);
        var rettangolo = new Rect(lastCoo[0], lastCoo[1], starDragX, starDragY);
        rettangolo.draw(context);
    }

}
function dragStop() {
    shouldDrag = false;
    redrawRect();
}
canvas.addEventListener("mousedown", dragStart);
canvas.addEventListener("mouseup", dragStop);
canvas.addEventListener("mousemove", drag);