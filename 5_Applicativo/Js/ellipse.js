//calsse Ellipse
class Ellipse {
    constructor(startX, startY, w, h) {
      this.startX = startX;
      this.startY = startY;
      this.color = '#000000';
      this.size = 5;
      this.w = w;
      this.h = h;
    }
    draw(context) {
      context.beginPath();
      context.lineWidth = this.size;
      context.strokeStyle = this.color;
      context.ellipse(this.startX, this.startY, Math.abs(this.w), Math.abs(this.h), 0, 2 * Math.PI, false);
      context.stroke();
    }
  
  }
  function ellStart(event) {
    if (canEll) {
      shouldEll = true;
      var startDragCoo = getMousePosition(canvas, event);
      starDragX = startDragCoo[0];
      starDragY = startDragCoo[1];
    }
  
  }
  function makeell(event) {
    if (shouldEll) {
      refreshCanvas(context);
      var lastCoo = getMousePosition(canvas, event);
      var w = lastCoo[0] - starDragX;
      var h = lastCoo[1] - starDragY;
      var ell = new Ellipse(starDragX, starDragY, w, h);
      ell.size = ellSize;
      ell.color = ellColor;
      ell.draw(context);
      lastEll = ell;
    }
  }
  function ellStop() {
    if (lastEll != undefined) {
      shouldEll = false;
      ellissi.push(lastEll);
      lastEll = undefined;
    }
  }
  function ellRedraw() {
    for (var i = 0; i < ellissi.length; i++) {
      ellissi[i].draw(context);
    }
  }
  function getEllSize() {
    var grandezza = document.getElementById("ellSize").value;
    ellSize = grandezza;
    document.getElementById("Ell-size-value").innerHTML = grandezza;
    setEllSize();
  
  }
  function setEllSize() {
    if (ellissi != 0) {
      for (var i = 0; i < ellissi.length; i++) {
        ellissi[i].size = ellSize;
      }
      refreshCanvas(context);
    }
  }
  function getEllColor() {
    var color = document.getElementById("ellColor").value;
    ellColor = color;
    setEllColor();
  }
  function setEllColor() {
    if (ellissi != 0) {
      for (var i = 0; i < ellissi.length; i++) {
        ellissi[i].color = ellColor;
      }
      refreshCanvas(context);
    }
  }
  
  function thereisEll(event) {
    if (ellissi.length != 0 && canMove) {
      var coo = getMousePosition(canvas, event);
      for (var i = 0; i < ellissi.length; i++) {
        var relativeX = (coo[0] - ellissi[i].startX) / ellissi[i].w;
        var reloativeY = (coo[1] - ellissi[i].startY) / ellissi[i].h;
        var distanzaEuclidea = Math.pow(relativeX, 2) + Math.pow(reloativeY, 2);
        if (distanzaEuclidea <= 1) {
          lastColorEll = ellissi[i].color;
          ellissi[i].color = "#4AA8F4";
          ellSelected = i;
          shouldMoveEll = true;
          break;
        } else {
          if (ellSelected > -1) {
            ellissi[i].color = lastColorEll;
            ellSelected = -1;
          }
        }
      }
      refreshCanvas(context);
    }
  }
  function moveEll(event) {
    if (shouldMoveEll) {
      var coo = getMousePosition(canvas, event);
      ellissi[ellSelected].startX = coo[0];
      ellissi[ellSelected].startY = coo[1];
      refreshCanvas(context);
    }
  }
  function endEllMove(event) {
    if (event.button === MAIN_MOUSE_BUTTON) {
      shouldMoveEll = false;
    }
  }