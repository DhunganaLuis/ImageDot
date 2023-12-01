// Variabili e costanti globali
let fileInput = document.getElementById('fileinput');
let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');

// Costanti
const MAIN_MOUSE_BUTTON = 0;

// Variabili punti
let dotCount = 1;
let dotColor = '#000';
let dotSize = 5;
let puntini = [];
let lastColorDot;
let pointSelected = -1;
let isConnectedPoint = false;
let isPressbtn = false;
let isSelectedPoint = false;
let shouldMoveDot = false;
let canMakePoint = false;

// Variabili linee
let xLine = 0;
let yLine = 0;
let widthLine = 4;
let colorLine = "#000";
let linee = [];
let canDraw = false;
let shouldDraw = false;

// Variabili rettangoli
let lastRect;
let rectSize = 5;
let rectColor = '#000';
let canRect = false;
let shouldRect = false;
let rettangoli = [];
let rectSelected = -1;
let lastColorRect;
let shouldMoveRect = false;

// Variabili ellissi
let ellSize = 5;
let ellColor = '#000';
let canEll = false;
let shouldEll = false;
let lastEll;
let ellissi = [];
var ellSelected = -1;
var shouldMoveEll = false;
var lastColorEll = '#000';

// Variabili segmenti
let segmentSize = 5;
let segmentColor = '#000';
let canSegment = false;
let shouldSegment = false;
let lastSegment;
let segments = [];

// Drag
let starDragX = 0;
let starDragY = 0;

// Immagine
let ImgSrc;

// Altre variabili
let isPressButton = false;
let canMove = false;
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
      context.strokeStyle = this.borderSel;
      context.font = `Italic ${fontSize}px Arial`;
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
  var grandezza = document.getElementById("dimensione").value;
  dotSize = grandezza;
  document.getElementById("value").innerHTML = grandezza;
  setDotSize();
}

//Funzione che prende il colore del puntino 
function getDotColor() {
  var colore = document.getElementById('colore').value;
  dotColor = colore;
  setDotColor();
}

//funzione che ridisegna i puntini sul canvas
function dotRedraw() {
  for (var i = 0; i < puntini.length; i++) {
    puntini[i].draw(context);
  }

}

//funzione che inverte il numero dei puntini 
function numberInverter() {
  if (puntini.length > 1) {
    for (var i = puntini.length - 1; i >= 0; i--) {
      puntini[i].number = puntini.length - (puntini[i].number - 1);
    }
    puntini.reverse();
    refreshCanvas(context);
  } else {
    alert("Inserire almeno 2 puntini per poter invertire i numeri");
  }
}
//selezionamento, rimozione e spostamento dei puntini
function thereIsDot(event) {
  if (canMove) {
    var pos = getMousePosition(canvas, event);
    for (var i = 0; i < puntini.length; i++) {
      if (Math.abs(puntini[i].x - pos[0]) < dotSize && Math.abs(puntini[i].y - pos[1]) < dotSize) {
        unselect();
        lastColorDot = puntini[i].color;
        puntini[i].color = "#4AA8F4";
        pointSelected = i;
        shouldMoveDot = true;
        break;
      } else {
        unselect();
      }
    }
    refreshCanvas(context);
  }
}

//funzione che muove i puntini
function movePoint(event) {
  if (shouldMoveDot && pointSelected > -1) {
    var coo = getMousePosition(canvas, event);
    puntini[pointSelected].x = coo[0];
    puntini[pointSelected].y = coo[1];
    refreshCanvas(context);
  }
}
//funzione che termina la selezione
function endPointMove(event) {
  if (event.button === MAIN_MOUSE_BUTTON) {
    shouldMoveDot = false;
  }
}

//funzione che riordina i numeri dei puntini 
function reorderNumber() {
  for (var i = 0; i < puntini.length; i++) {
    puntini[i].number = i + 1;
  }

}

//funzione che connette automaticamente i puntini
function connectDots() {
  if (isPressButton) {
    isConnectedPoint = true;
    for (var i = 0; i < puntini.length; i++) {
      var secondPos = (i + 1) % puntini.length;
      context.beginPath();
      context.strokeStyle = dotColor;
      context.lineWidth = 1;
      context.moveTo(puntini[i].x, puntini[i].y);
      context.lineTo(puntini[secondPos].x, puntini[secondPos].y);
      context.stroke();
    }
  } else {
    isConnectedPoint = false;
    refreshCanvas(context);
  }
}
function pressButton() {
  if (puntini.length > 1) {
    isPressButton = !isPressButton;
    connectDots();
  } else {
    alert("bisogna creare almeno 2 puntini per poterli collegare");
  }
}

function setDotSize() {
  if (puntini != 0) {
    for (var i = 0; i < puntini.length; i++) {
      puntini[i].size = dotSize;
    }
    refreshCanvas(context);
  }
}
function setDotColor() {
  if (puntini != 0) {
    for (var i = 0; i < puntini.length; i++) {
      puntini[i].color = dotColor;
    }
    refreshCanvas(context);
  }
}
function changeDotNumber() {
  if (pointSelected > -1) {
    var numero = document.getElementById("chnum").value;
    if (isNaN(numero) || numero == null) {
      alert("ATTENZIONE: Inserire solo numeri interi");
    } else {
      if (numero > 0 && numero <= puntini.length) {
        var dot = new Dot();
        dot.x = puntini[pointSelected].x;
        dot.y = puntini[pointSelected].y;
        dot.size = puntini[pointSelected].size;
        dot.color = puntini[pointSelected].color;
        dot.number = numero;
        puntini.splice(pointSelected, 1);
        puntini.splice(numero - 1, 0, dot);
        for (var i = 0; i < puntini.length; i++) {
          puntini[i].number = i + 1;
        }
        pointSelected = numero - 1;
      } else {
        alert(`Inserire un numero tra 1 e ${puntini.length}`);
      }
    }
    refreshCanvas(context);
  } else {
    alert("seleziona un puntino");
  }
}

//------------------------------------------------------------------------------
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
//---------------------------------------------------------------------
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

//--------------------------------------------------------------------------
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

//-------------------------------------------------------------------------
//classe segment
class Segment {
  constructor(posX, posY, startX, startY) {
    this.x = posX;
    this.y = posY;
    this.startX = startX;
    this.startY = startY;
    this.color = '#000';
    this.size = 5;
  }
  draw(context) {
    context.beginPath();
    context.lineWidth = this.size;
    context.strokeStyle = this.color;
    context.moveTo(this.startX, this.startY);
    context.lineTo(this.x, this.y);
    context.stroke();
  }
}
function segmentStart(event) {
  if (canSegment) {
    shouldSegment = true;
    var startDragCoo = getMousePosition(canvas, event);
    starDragX = startDragCoo[0];
    starDragY = startDragCoo[1];
  }
}
function makeSegment(event) {
  if (shouldSegment) {
    refreshCanvas(context);
    var lastCoo = getMousePosition(canvas, event);
    var segment = new Segment(lastCoo[0], lastCoo[1], starDragX, starDragY);
    segment.size = segmentSize;
    segment.color = segmentColor;
    segment.draw(context);
    lastSegment = segment;
  }
}
function segmentStop() {
  if (lastSegment != undefined) {
    shouldSegment = false;
    segments.push(lastSegment);
    lastSegment = undefined;
  }
}
function segmentRedraw() {
  for (var i = 0; i < segments.length; i++) {
    segments[i].draw(context);
  }
}
function getSegmentSize() {
  var grandezza = document.getElementById("segmSize").value;
  segmentSize = grandezza;
  document.getElementById("Seg-size-value").innerHTML = grandezza;
  setSegmentSize();
}
function setSegmentSize() {
  if (segments != 0) {
    for (var i = 0; i < segments.length; i++) {
      segments[i].size = segmentSize;
    }
    refreshCanvas(context);
  }
}
function getSegmentColor() {
  var color = document.getElementById("segmColor").value;
  segmentColor = color;
  setSegmentColor();
}
function setSegmentColor() {
  if (segments != 0) {
    for (var i = 0; i < segments.length; i++) {
      segments[i].color = segmentColor;
    }
    refreshCanvas(context);
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
//------------------------------------------------
//funzione che pilisce e ridisegna sul canvas
function refreshCanvas(context) {
  var checkboxes = document.getElementsByClassName("layer");
  clearCanvas(context);
  wichtool();
  if (checkboxes[0].checked) {
    dotRedraw();
    if (isConnectedPoint) {
      connectDots();
    }
  } else {
    canMakePoint = false;
  }
  if (checkboxes[1].checked) {
    lineVisibili();
  } else {
    canDraw = false;
  }
  if (checkboxes[2].checked) {

    canvas.style.backgroundImage = ImgSrc;
    canvas.style.backgroundSize = 'contain';
  } else {
    canvas.style.background = "#fff";
  }
}
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//Load Image
//Mostra l'immagine scelta dall'utente
function loadImage(ev) {
  if (ev.target.files) {
    resetCanvas(context);
    let file = ev.target.files[0];
    var reader = new FileReader();
    reader.onloadend = function (e) {
      var image = new Image();
      image.src = e.target.result;
      image.onload = function () {
        var canvas = document.getElementById('canvas');
        canvas.style.display = 'block';
        canvas.style.backgroundImage = 'url("' + this.src + '") ';
        ImgSrc = canvas.style.backgroundImage;
        canvas.style.backgroundSize = 'contain';
        canvas.width = this.width;
        canvas.height = this.height;
        canvas.style.border = "2px solid #343a40";
        document.getElementById("container").style.display = 'block';

      }
    }
    reader.readAsDataURL(file);
  }
}

//------------------------------------------------------------------------------
//controllo scelta dell'utente
function wichtool() {
  var isChecked = document.getElementsByClassName("btn-check");
  var pointProperty = document.getElementById("Property-dot").style;
  var lineProperty = document.getElementById("Property-line").style;
  var ellipseProperty = document.getElementById("Property-ellipse").style;
  var rectangleProperty = document.getElementById("Property-rectangle").style;
  var segmentProperty = document.getElementById("Property-segment").style;
  var mouseProperty = document.getElementById("Property-mouse").style;
  if (isChecked[0].checked) {
    //mouse
    pointProperty.display = 'none';
    lineProperty.display = 'none';
    ellipseProperty.display = 'none';
    rectangleProperty.display = 'none';
    segmentProperty.display = 'none';
    mouseProperty.display = 'block';
    canMakePoint = false;
    canDraw = false;
    canMove = true;
    canEll = false;
    canRect = false;
    canSegment = false;
  } else if (isChecked[1].checked) {
    //Puntino
    unselect();
    pointProperty.display = 'block';
    lineProperty.display = 'none';
    ellipseProperty.display = 'none';
    rectangleProperty.display = 'none';
    segmentProperty.display = 'none';
    mouseProperty.display = 'none';
    canMakePoint = true;
    canDraw = false;
    canMove = false;
    canEll = false;
    canRect = false;
    canSegment = false;
  } else if (isChecked[2].checked) {
    //Penna
    unselect();
    pointProperty.display = 'none';
    lineProperty.display = 'block';
    ellipseProperty.display = 'none';
    rectangleProperty.display = 'none';
    segmentProperty.display = 'none';
    mouseProperty.display = 'none';
    canMakePoint = false;
    canDraw = true;
    canMove = false;
    canRect = false;
    canEll = false;
    canSegment = false;
  } else if (isChecked[3].checked) {
    //ellipse
    unselect();
    pointProperty.display = 'none';
    lineProperty.display = 'none';
    ellipseProperty.display = 'block';
    rectangleProperty.display = 'none';
    segmentProperty.display = 'none';
    mouseProperty.display = 'none';
    canMakePoint = false;
    canDraw = false;
    canMove = false;
    canRect = false;
    canEll = true;
    canSegment = false;
  } else if (isChecked[4].checked) {
    //rect
    unselect();
    pointProperty.display = 'none';
    lineProperty.display = 'none';
    ellipseProperty.display = 'none';
    rectangleProperty.display = 'block';
    segmentProperty.display = 'none';
    mouseProperty.display = 'none';
    canMakePoint = false;
    canDraw = false;
    canMove = false;
    canRect = true;
    canEll = false;
    canSegment = false;

  } else if (isChecked[5].checked) {
    unselect();
    pointProperty.display = 'none';
    lineProperty.display = 'none';
    ellipseProperty.display = 'none';
    rectangleProperty.display = 'none';
    segmentProperty.display = 'block';
    mouseProperty.display = 'none';
    canSegment = true;
    canMakePoint = false;
    canDraw = false;
    canMove = false;
    canRect = false;
    canEll = false;
  }
}

//-------------------------------------------------------------------------------------------
function unselect() {
  if (pointSelected > -1) {
    puntini[pointSelected].color = lastColorDot;
    pointSelected = -1;
    refreshCanvas(context);
  } else if (rectSelected > -1) {
    rettangoli[rectSelected].color = lastColorRect;
    rectSelected = -1;
    refreshCanvas(context);
  } else if (ellSelected > -1) {
    ellissi[ellSelected].color = lastColorEll;
    ellSelected = -1;
    refreshCanvas(context);
  }
}
//----------------------------------------------------------------------------------------------
//Funzione che rimuove la figura selezionata
function deleteDraw() {
  if (pointSelected > -1) {
    puntini.splice(pointSelected, 1);
    dotCount--;
    pointSelected = -1;
    reorderNumber();
    refreshCanvas(context);
  } else if (rectSelected > -1) {
    rettangoli.splice(rectSelected, 1);
    rectSelected = -1;
    refreshCanvas(context);
    }else if(ellSelected>-1){
    ellissi.splice(ellSelected, 1);
    ellSelected = -1;
    refreshCanvas(context);
  }
}
//------------------------------------------------------------------------------------------------
function resetCanvas(context) {
  clearCanvas(context);
  dotCount = 1;
  puntini = [];
  linee = [];
  ellissi = [];
  rettangoli = [];
  segments = [];
  lastEll = undefined;
  lastRect = undefined;
  lastSegment = undefined;
}
//-------------------------------------------------------------------------------
function lineVisibili() {
  if (linee.length != 0) {
    lineRedraw();
  }
  if (rettangoli.length != 0) {
    rectRedraw();
  }
  if (ellissi.length != 0) {
    ellRedraw();
  }
  if (segments.length != 0) {
    segmentRedraw();
  }
}
//--------------------------------------------------------------------------------
//EventListener
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
