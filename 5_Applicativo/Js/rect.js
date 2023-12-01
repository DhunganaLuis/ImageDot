//class Rect
class Rect {
    constructor(w, h, startX, startY) {
      this.startX = startX;
      this.startY = startY;
      this.color = '#000';
      this.size = 5;
      this.w = w;
      this.h = h;
    }
    draw(context) {
      context.beginPath();
      context.lineWidth = this.size;
      context.strokeStyle = this.color;
      context.rect(this.startX, this.startY, this.w, this.h);
      context.stroke();
    }
  
  }
  function rectStart(event) {
    if (canRect) {
      shouldRect = true;
      var startDragCoo = getMousePosition(canvas, event);
      starDragX = startDragCoo[0];
      starDragY = startDragCoo[1];
    }
  
  }
  
  function makeRect(event) {
    if (shouldRect) {
      refreshCanvas(context);
      var lastCoo = getMousePosition(canvas, event);
      var rectW = lastCoo[0] - starDragX;
      var rectH = lastCoo[1] - starDragY;
      var rettangolo = new Rect(rectW, rectH, starDragX, starDragY);
      rettangolo.size = rectSize;
      rettangolo.color = rectColor;
      rettangolo.draw(context);
      lastRect = rettangolo;
    }
  }
  
  
  function rectStop() {
    if (lastRect != undefined) {
      shouldRect = false;
      rettangoli.push(lastRect);
      lastRect = undefined;
    }
  }
  function rectRedraw() {
    for (var i = 0; i < rettangoli.length; i++) {
      rettangoli[i].draw(context);
    }
  }
  
  function getRectSize() {
    var grandezza = document.getElementById("rectSize").value;
    rectSize = grandezza;
    document.getElementById("Rect-size-value").innerHTML = grandezza;
    setRectSize();
  }
  
  function setRectSize() {
    if (rettangoli != 0) {
      for (var i = 0; i < rettangoli.length; i++) {
        rettangoli[i].size = rectSize;
      }
      refreshCanvas(context);
    }
  }
  
  function getRectColor() {
    var color = document.getElementById("rectColor").value;
    rectColor = color;
    setRectColor();
  }
  function setRectColor() {
    if (rettangoli != 0) {
      for (var i = 0; i < rettangoli.length; i++) {
        rettangoli[i].color = rectColor;
      }
      refreshCanvas(context);
    }
  }
  
  function thereIsRect(event) {
    if (rettangoli.length != 0 && canMove) {
      var coo = getMousePosition(canvas, event);
      for (var i = 0; i < rettangoli.length; i++) {
        if (
          coo[0] > rettangoli[i].startX &&
          coo[0] < rettangoli[i].startX + rettangoli[i].w &&
          coo[1] > rettangoli[i].startY &&
          coo[1] < rettangoli[i].startY + rettangoli[i].h
        ) {
          lastColorRect = rettangoli[i].color;
          rettangoli[i].color = "#4AA8F4";
          rectSelected = i;
          shouldMoveRect = true;
          break;
        } else if (rectSelected > -1) {
          rettangoli[i].color = lastColorRect;
          rectSelected = -1;
        }
      }
      refreshCanvas(context);
    }
  }
  function moveRect(event) {
    if (shouldMoveRect) {
      var coo = getMousePosition(canvas, event);
      rettangoli[rectSelected].startX = coo[0];
      rettangoli[rectSelected].startY = coo[1];
      refreshCanvas(context);
    }
  }
  function endRectMove(event) {
    if (event.button === MAIN_MOUSE_BUTTON) {
      shouldMoveRect = false;
    }
  
  }