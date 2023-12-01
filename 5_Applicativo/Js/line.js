//classe linea
class Line {
    constructor(startX, startY, endX, endY) {
      this.startX = startX;
      this.startY = startY;
      this.endX = endX;
      this.endY = endY;
      this.size = 4;
      this.color = "#000";
    }
    draw(context) {
      context.lineJoin = "round";
      context.lineCap = "round";
      context.lineWidth = this.size;
      context.strokeStyle = this.color;
      context.beginPath();
      context.moveTo(this.startX, this.startY);
      context.lineTo(this.endX, this.endY);
      context.stroke();
    }
  }
  function startLine(event) {
    if (canDraw) {
      if (event.button === MAIN_MOUSE_BUTTON) {
        shouldDraw = true;
        var starCoo = getMousePosition(canvas, event);
        xLine = starCoo[0];
        yLine = starCoo[1];
      }
    }
  }
  function makeLine(event) {
    if (shouldDraw) {
      var lastCoo = getMousePosition(canvas, event);
      var linea = new Line(xLine, yLine, lastCoo[0], lastCoo[1]);
      linea.size = widthLine;
      linea.color = colorLine;
      linea.draw(context);
      linee.push(linea);
      xLine = lastCoo[0];
      yLine = lastCoo[1];
    }
  }
  //funzione che aggiunge una linea
  function endLine(event) {
    if (event.button === MAIN_MOUSE_BUTTON) {
      shouldDraw = false;
    }
  }
  //funzione che ridisegna le linee
  function lineRedraw() {
    for (var i = 0; i < linee.length; i++) {
      linee[i].draw(context);
    }
  }
  function getLineSize() {
    var grandezza = document.getElementById("penSize").value;
    widthLine = grandezza;
    document.getElementById("Pen-size-value").innerHTML = grandezza;
    setLineSize();
  }
  function setLineSize() {
    if (linee != 0) {
      for (var i = 0; i < linee.length; i++) {
        linee[i].size = widthLine;
      }
      refreshCanvas(context);
    }
  }
  function getLineColor() {
    var color = document.getElementById("penColor").value;
    colorLine = color;
    setLineColor();
  }
  function setLineColor() {
    if (linee != 0) {
      for (var i = 0; i < linee.length; i++) {
        linee[i].color = colorLine;
      }
      refreshCanvas(context);
    }
  }
  function clearAllLine(context) {
    if (linee != 0) {
      linee = [];
      refreshCanvas(context);
    }
  }