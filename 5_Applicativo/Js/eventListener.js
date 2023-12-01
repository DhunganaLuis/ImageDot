var clear = document.getElementById('clear');
var deleteAllLine = document.getElementById("Delete-All-Line");
canvas.addEventListener("mousedown", thereIsDot);
canvas.addEventListener("mousemove", movePoint);
canvas.addEventListener("mouseup", endPointMove);
canvas.addEventListener("mousedown", makeDot);
canvas.addEventListener("mousedown", startLine);
canvas.addEventListener("mouseup", endLine);
canvas.addEventListener("mousemove", makeLine);
canvas.addEventListener("mousemove", moveRect);
canvas.addEventListener("mouseup", endRectMove);
canvas.addEventListener("mousedown", thereIsRect);
canvas.addEventListener("mousedown", rectStart);
canvas.addEventListener("mouseup", rectStop);
canvas.addEventListener("mousemove", makeRect);
canvas.addEventListener("mousedown", ellStart);
canvas.addEventListener("mouseup", ellStop);
canvas.addEventListener("mousemove", moveEll);
canvas.addEventListener("mouseup", endEllMove);
canvas.addEventListener("mousedown", thereisEll);
canvas.addEventListener("mousemove", makeell);
canvas.addEventListener("mousedown", segmentStart);
canvas.addEventListener("mouseup", segmentStop);
canvas.addEventListener("mousemove", makeSegment);
fileInput.addEventListener("change", loadImage);
clear.addEventListener("click", function () {
  resetCanvas(context);
});
deleteAllLine.addEventListener("click", function () {
  clearAllLine(context);
});
document.querySelector('#container').oninput = function (ev) {
  if (ev.target.value) {
    refreshCanvas(context);
  }
}
