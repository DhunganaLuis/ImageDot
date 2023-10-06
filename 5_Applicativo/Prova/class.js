//variabili e costanti globali
let fileInput = document.getElementById('fileinput');
var dotCount;
var canDraw = false;
var canMakePoint = true;
var canMovePoint = false;
let canvas = document.getElementById("canvas");
var context = canvas.getContext('2d');
var dotSize = 5;
var puntini;
var dotColor = '#000';
var pointSelected = -1;
const MAIN_MOUSE_BUTTON = 0;
var shouldMove = false;
var isSelectedPoi = false;
var lastColorDot;
var widthLine = 4;
var linee;
var colorLine = "#000";
var shouldDraw = false;
var xLine = 0;
var yLine = 0;
var ImgSrc;
//Classe dot 
class Dot {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.number = null;
    this.color = '#000';
    this.size = 5;
  }
  draw(context) {
    if (this.color == null) {
      this.color = '#000';
    }
    if (this.size == null) {
      this.size = 5;
    }

    // to increase smoothing for numbers with decimal part
    var pointX = Math.round(this.x);
    var pointY = Math.round(this.y);

    context.beginPath();
    context.fillStyle = this.color;
    context.arc(pointX, pointY, this.size, 0 * Math.PI, 2 * Math.PI);
    context.fill();

    if (this.number) {
      var textX = pointX;
      var textY = Math.round(pointY - this.size - 3);
      var fontSize = (16 / 5) * this.size;
      context.font = `Italic ${fontSize}px Arial`;
      context.fillStyle = this.color;
      context.textAlign = 'center';
      context.fillText(this.number, textX, textY);
    }
  }
}

//funzione che disegna il puntino sul canvas
function makeDot(event) {
  if (canMakePoint) {
    var coo = getMousePosition(canvas, event);
    var dot = new Dot();
    dot.x = coo[0];
    dot.y = coo[1];
    dot.size = dotSize;
    dot.number = dotCount;
    dot.color = dotColor;
    puntini.push(dot);
    refreshCanvas(context);
    dotCount++;
  }
}

//Funzione che prende la grandezza del puntino 
function getDotSize() {
  dotSize = document.getElementById("dimensione").value;
  var grandezza = document.getElementById("dimensione").value;
  document.getElementById("value").innerHTML = grandezza;
}

//Funzione che prende il colore del puntino 
function getDotColor() {
  var colore = document.getElementById('colore').value;
  dotColor = colore;//-->Se non si uas per altro si puo semplificare richiamando solo getcolor
}

//funzione che ridisegna i puntini sul canvas
function dotRedraw() {
  for (var i = 0; i < puntini.length; i++) {
    puntini[i].draw(context);
  }

}

//funzione che inverte il numero dei puntini 
function numberInverter() {
  if (puntini.length != 0 || puntini.length != 1) {
    console.log("inverto");
    for (var i = puntini.length - 1; i >= 0; i--) {
      console.log("contrario");
      puntini[i].number = puntini.length - (puntini[i].number - 1);
    }
    refreshCanvas(context);
  } else {
    alert("Inserire almeno 2 puntini per poter invertire i numeri");
  }
}
//selezionamento, rimozione e spostamento dei puntini
function controllaPuntino(event) {
  if (canMovePoint) {
    var pos = getMousePosition(canvas, event);
    for (var i = 0; i < puntini.length; i++) {
      if (Math.abs(puntini[i].x - pos[0]) < dotSize && Math.abs(puntini[i].y - pos[1]) < dotSize) {
        if (pointSelected > -1) {
          puntini[pointSelected].color = lastColorDot;
        }
        lastColorDot = puntini[i].color;
        puntini[i].color = "#4AA8F4";
        pointSelected = i;
        shouldMove = true;
        break;
      } else {
        if (pointSelected > -1) {
          puntini[pointSelected].color = lastColorDot;
          pointSelected = -1;
        }
      }
    }
    refreshCanvas(context);
  }
}

//funzione che muove i puntini
function movePoint(event) {
  if (shouldMove) {
    var coo = getMousePosition(canvas, event);
    puntini[pointSelected].x = coo[0];
    puntini[pointSelected].y = coo[1];
    refreshCanvas(context);
  }
}
//funzione che termina la selezione
function endPointMove(event) {
  if (event.button === MAIN_MOUSE_BUTTON) {
    shouldMove = false;
  }
}
//Funzione che rimuove il puntino selezionato
function deletePoint() {
  if (pointSelected > -1) {
    puntini.splice(pointSelected, 1);
    dotCount--;
    pointSelected = -1;
    reorderNumber();
    refreshCanvas(context);
  }
}
//funzione che riordina i numeri dei puntini 
function reorderNumber() {
  for (var i = 0; i < puntini.length; i++) {
    puntini[i].number = i + 1;
  }

}
//------------------------------------------------------------------------------
//classe linea
class Line {
  constructor(startX, starY, endX, endY) {
    this.startX = startX;
    this.starY = starY;
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
    context.moveTo(this.startX, this.starY);
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
    line.color = colorLine;
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
//--------------------------------------------------------------------------------
// funzione che pulisce il canvas
function clearCanvas(context) {
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);
}
//-----------------------------------------------------------------------------------
//funzione che calcola le coordinate di dove si è cliccato
function getMousePosition(canvas, event) {
  let rect = canvas.getBoundingClientRect();
  let scaleX = canvas.width / rect.width;
  let scaleY = canvas.height / rect.height;
  let x = Math.round((event.x - rect.left) * scaleX);
  let y = Math.round((event.y - rect.top) * scaleY);
  var coordinate = [x, y];
  return coordinate;
}
//------------------------------------------------------------------
//scriva la grandezza del puntino in  base alla posizione del input range
function scriviGrandezza() {
  var grandezza = document.getElementById("dimensione").value;
  var lineSize = document.getElementById("lineSize").value;
  document.getElementById("value").innerHTML = grandezza;
  document.getElementById("line").innerHTML = lineSize;
  refreshCanvas(context);
}
//------------------------------------------------
//funzione che pilisce e ridisegna sul canvas
function refreshCanvas(context) {
  var checkboxes = document.getElementsByClassName("layer");
  clearCanvas(context);
  if (checkboxes[0].checked) {
    dotRedraw();
    // wichtool();
  }else{
    canMakePoint=false;
  }
  if (checkboxes[1].checked) {
    lineRedraw();
    // wichtool();
  }else{
    canDraw= false;
  }
  if (checkboxes[2].checked) {
    canvas.style.backgroundImage = ImgSrc;
    canvas.style.backgroundSize = 'contain';
  } else {
    canvas.style.background = "#fff";
  }


}
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//Loafd Image
//Mostra l'immagine scelta dall'utente
function loadImage(ev) {
  if (ev.target.files) {
    dotCount = 1;
    puntini = [];
    linee = [];
    refreshCanvas(context);
    let file = ev.target.files[0];
    var reader = new FileReader();
    reader.onloadend = function (e) {
      var image = new Image();
      image.src = e.target.result;
      image.onload = function () {
        var canvas = document.getElementById('canvas');
        ImgSrc = 'url("' + this.src + '") ';
        canvas.style.backgroundImage = 'url("' + this.src + '") ';
        canvas.style.backgroundSize = 'contain';
        canvas.width = this.width;
        canvas.height = this.height;
      }
    }
    reader.readAsDataURL(file);

  }
}

//-------------------------------------------------------------------------------
//funzione che inverte il numero dei puntini 
function numberInverter() {
  if (puntini.length != 0 || puntini.length != 1) {
    console.log("inverto");
    for (var i = puntini.length - 1; i >= 0; i--) {
      console.log("contrario");
      puntini[i].number = puntini.length - (puntini[i].number - 1);
    }
    refreshCanvas(context);
  } else {
    alert("Inserire almeno 2 puntini per poter invertire i numeri");
  }
}
//------------------------------------------------------------------------------
//controllo scelta dell'utente
function wichtool() {
  console.log("tools");
  var isChecked = document.getElementsByClassName("tools");
  if (isChecked[0].checked) {
    canMakePoint = true;
    canDraw = false;
    canMovePoint = false;
    console.log("puntino " + canMakePoint);
  } else if (isChecked[1].checked) {
    canMakePoint = false;
    canDraw = true;
    canMovePoint = false;
    console.log("penna " + canMakePoint);
  } else if (isChecked[2]) {
    canMakePoint = false;
    canDraw = false;
    canMovePoint = true;
    console.log("Mouse " + canMakePoint);
  }
  // console.log(canMovePoint);
}
//-------------------------------------------------------------------------------
//--------------------------------------------------------------------------------
//EventListener
canvas.addEventListener("mousedown", controllaPuntino);
canvas.addEventListener("mousemove", movePoint, false);
canvas.addEventListener("mouseup", endPointMove);
canvas.addEventListener("mousedown", makeDot);
canvas.addEventListener("mousedown", startLine);
canvas.addEventListener("mouseup", endLine);
canvas.addEventListener("mousemove", makeLine, false);
fileInput.addEventListener("change", loadImage);
document.querySelector('#container').oninput = function (ev) {
  if (ev.target.value) {
    refreshCanvas(context);
  }
}