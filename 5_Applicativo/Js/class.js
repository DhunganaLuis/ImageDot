//variabili e costanti globali
let fileInput = document.getElementById('fileinput');
let canvas = document.getElementById("canvas");
var context = canvas.getContext('2d');

//costanti
const MAIN_MOUSE_BUTTON = 0;

//variabili dot
var dotCount;
var dotColor = '#000';
var dotSize = 5;
var puntini = [];
var lastColorDot;
var pointSelected = -1;
var isConnectedPoint = false;
var isPressbtn = false;
var isSelectedPoint = false;
var shouldMove = false;
var canMakePoint = false;

//variabili linea
var xLine = 0;
var yLine = 0;
var widthLine = 4;
var colorLine = "#000";
var linee = [];
var canDraw = false;
var shouldDraw = false;

//variabili rettangoli
var lastRect=undefined;
var rectSize = 5;
var rectColor = '#000'
var canRect = false;
var shouldRect = false;
var rettangoli = [];
rectSelected = -1;
var lastColorRect;
var shouldMoveRect = false;

//variabili ellissi
var ellSize = 5;
var ellColor = '#000'
var canEll = false;
var shouldEll = false;
var lastEll;
var ellissi = [];

//variabili segment
var segmentSize = 5;
var segmentColor = '#000'
var canSegment = false;
var shouldSegment = false;
var lastSegment;
var segments = [];

//drag
var starDragX = 0;
var starDragY = 0;

//img
var ImgSrc;

//altre variabili
var isPressButton = false;
var canMove = false;

//Classe dot 
class Dot {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.number = null;
    this.color = '#000';
    // this.border ="#000";
    // this.widthLabel=0;
    // this.widthDot=0;
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
    // context.lineWidth=this.widthDot;
    context.fillStyle = this.color;
    // context.strokeStyle= this.borderSel;
    context.arc(pointX, pointY, this.size, 0 * Math.PI, 2 * Math.PI);
    // context.stroke();
    context.fill();

    if (this.number) {
      var textX = pointX;
      var textY = Math.round(pointY - this.size - 3);
      var fontSize = (16 / 5) * this.size;
      context.strokeStyle = this.borderSel;
      context.font = `Italic ${fontSize}px Arial`;
      // context.fillStyle = this.color;
      // context.lineWidth=this.widthLabel;
      context.textAlign = 'center';
      context.fillText(this.number, textX, textY);
      // context.strokeText(this.number,textX,textY);
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
  dotColor = colore;//-->Se non si uas per altro si puo semplificare richiamando solo getcolor
  setDotColor();
}

//funzione che ridisegna i puntini sul canvas
function dotRedraw() {
  for (var i = 0; i < puntini.length; i++) {
    puntini[i].draw(context);
  }

}

//funzione che inverte il numero dei puntini 
function numberInverter(ref) {
  if (puntini.length != 0 || puntini.length != 1) {
    // console.log("inverto");
    for (var i = puntini.length - 1; i >= 0; i--) {
      // console.log("contrario");
      puntini[i].number = puntini.length - (puntini[i].number - 1);
    }
    puntini.reverse();
    refreshCanvas(context);
  } else {
    alert("Inserire almeno 2 puntini per poter invertire i numeri");
  }
}
//selezionamento, rimozione e spostamento dei puntini
function controllaPuntino(event) {
  if (canMove) {
    var pos = getMousePosition(canvas, event);
    for (var i = 0; i < puntini.length; i++) {
      if (Math.abs(puntini[i].x - pos[0]) < dotSize && Math.abs(puntini[i].y - pos[1]) < dotSize) {
        // if (pointSelected > -1) {
         unselect(false);
          // puntini[pointSelected].color = lastColorDot;
          // puntini[pointSelected].borderSel=lastColorDot;
          // puntini[i].widthDot=0;
          // puntini[i].widthLabel=0;

        // }
        lastColorDot = puntini[i].color;
        puntini[i].color = "#4AA8F4";
        // puntini[i].borderSel="#ff0000";
        // puntini[i].widthDot=3;
        // puntini[i].widthLabel=1;
        pointSelected = i;
        shouldMove = true;
        break;
      } else {
        unselect(true);
        // if (pointSelected > -1) {
         
          //puntini[pointSelected].color = lastColorDot;
         // puntini[pointSelected].borderSel = lastColorDot;
          // puntini[i].widthDot=0;
          // puntini[i].widthLabel=0;

          // pointSelected = -1;
        // }
      }
    }
    refreshCanvas(context);
    // console.log("dot: "+pointSelected);

  }
}

//funzione che muove i puntini
function movePoint(event) {
  if (shouldMove && pointSelected>-1) {
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
  }else if(rectSelected>-1){
    rettangoli.splice(rectSelected,1);
    rectSelected=-1;
    refreshCanvas(context);
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
  if (puntini.length > 1) {
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
}
function pressButton() {
  if (puntini.length > 1) {
    isPressButton = !isPressButton;
    connectDots();
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
    var numero = prompt("Inserire il numero che si vuole dare al puntino");
    if (isNaN(numero)) {
      alert("ATTENZIONE: Inserire solo numeri interi");
    } else {
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
    }
    refreshCanvas(context);
    // console.log(puntini);
  }
}
function unselect(reset){
  if(pointSelected >-1){
    puntini[pointSelected].color=lastColorDot;
    if(reset){
      pointSelected = -1;
    }
    refreshCanvas(context);
  }else if(rectSelected>-1){
    rettangoli[rectSelected].color=lastColorRect;
    if(reset){
      rectSelected=-1;
    }
    refreshCanvas(context);
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
function clearAllLine(context){
  if(linee!=0){
    linee=[];
  refreshCanvas(context);
  }
}
//---------------------------------------------------------------------
//calsse Ellipse
class Ellipse {
  constructor(startX, startY,w,h) {
    // this.x = posX;
    // this.y = posY;
    this.startX = startX;
    this.startY = startY;
    this.color = '#000000';
    this.size = 5;
    this.w=w;
    this.h=h;
  }
  draw(context) {
    // var w = this.x - this.startX;
    // var h = this.y - this.starY;
    // var radius = Math.sqrt(Math.pow((this.startX - this.x), 2) + Math.pow((this.starY - this.y), 2));
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
    // console.log("drag");
    clearCanvas(context);
    refreshCanvas(context);
    var lastCoo = getMousePosition(canvas, event);
    var w= lastCoo[0]- starDragX;
    var h= lastCoo[1]- starDragY;
    var ell = new Ellipse(starDragX, starDragY,w,h);
    ell.size = ellSize;
    ell.color = ellColor;
    lastEll = ell;
    // console.log(lastEll);
    ell.draw(context);
  }

}
function ellStop() {
  if (lastEll != undefined) {
    shouldEll = false;
    ellissi.push(lastEll);
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
//--------------------------------------------------------------------------
//class Rect
class Rect {
  constructor(w, h, startX, startY) {
    this.startX = startX;
    this.startY = startY;
    // this.x = posX;
    // this.y = posY;
    this.color = '#000';
    this.size = 5;
    this.w=w;
    this.h=h;
  }
  draw(context) {
    //  this.w = this.x - this.startX;
    //  this.h = this.y - this.starY;
    context.beginPath();
    context.lineWidth = this.size;
    context.strokeStyle = this.color;
    context.rect(this.startX, this.startY, this.w, this.h);
    context.stroke();
    // console.log("draw");
  }

}
function rectStart(event) {
  // console.log(canRect);
  if (canRect) {
    // console.log("start");
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
    // console.log(lastRect);
    lastRect = undefined;
  }
  // console.log(rettangoli);
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
    // console.log(rettangoli);
    for (var i = 0; i < rettangoli.length; i++) {
      if (
        coo[0] > rettangoli[i].startX &&
        coo[0] < rettangoli[i].startX + rettangoli[i].w &&
        coo[1] > rettangoli[i].startY &&
        coo[1] < rettangoli[i].startY + rettangoli[i].h
      ) {
        // unselect(false);
        lastColorRect=rettangoli[i].color;
        rettangoli[i].color="#4AA8F4"; 
        rectSelected = i;
        // console.log(rectSelected);
        shouldMoveRect=true;
        break;
      }else{
        // unselect(true);
      }
    }
    refreshCanvas(context);
    // console.log("rect: "+rectSelected);

  }
}
function moveRect(event){
  if(shouldMoveRect){
    var coo=getMousePosition(canvas,event);
    // var deltaX = rettangoli[rectSelected].starX - coo[0];
    // var deltaY = rettangoli[rectSelected].starY - coo[1];
    // console.log(  coo + " "+ deltaX+ " "+ deltaY);
    // rettangoli[rectSelected].starX = coo[0];
    // rettangoli[rectSelected].starY = coo[1];
    rettangoli[rectSelected].startX= coo[0];
    rettangoli[rectSelected].startY= coo[1];
    refreshCanvas(context);
  }
}
function endRectMove(event){
  if(event.button === MAIN_MOUSE_BUTTON){
    shouldMoveRect=false;
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
    // console.log("start");
    shouldSegment = true;
    var startDragCoo = getMousePosition(canvas, event);
    starDragX = startDragCoo[0];
    starDragY = startDragCoo[1];
  }

}
function makeSegment(event) {
  if (shouldSegment) {
    // console.log("drag");
    clearCanvas(context);
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
  // console.log(scaleX+" "+ scaleY);
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
    // console.log(rectSelected);
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
    // context.drawImage(ImgSrc,0,0)
  } else {
    canvas.style.background = "#fff";
  }


}
// var f = false;
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//Loafd Image
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
  // console.log(pointSelected);
  var isChecked = document.getElementsByClassName("btn-check");
  var pointProperty = document.getElementById("Property-dot").style;
  var lineProperty = document.getElementById("Property-line").style;
  var ellipseProperty = document.getElementById("Property-ellipse").style;
  var rectangleProperty = document.getElementById("Property-rectangle").style;
  var segmentProperty = document.getElementById("Property-segment").style;
  var mouseProperty = document.getElementById("Property-mouse").style;

  // var numDisp=document.getElementById("selectNum");
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
    // numDisp.style.display='none';
    // if(puntini.length>1){
    //   numDisp.style.display='block';
    //   document.getElementById("dotNumber").setAttribute("max",puntini.length);
    // }

  } else if (isChecked[1].checked) {
    //Puntino
    unselect(true)
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
    // numDisp.style.display='none';
  } else if (isChecked[2].checked) {
    //Penna
    unselect(true)
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
    // numDisp.style.display='none';

  } else if (isChecked[3].checked) {
    //ellipse
    unselect(true)
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
    // numDisp='none';
  } else if (isChecked[4].checked) {
    //rect
    unselect(true)
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
    // numDisp='none';

  } else if (isChecked[5].checked) {
    unselect(true)
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
    // numDisp='none';

  }
  console.log("dot: "+pointSelected);
  console.log("rect: "+rectSelected);

  // console.log(canMovePoint);
}
function resetCanvas(context) {
  clearCanvas(context);
  dotCount = 1;
  puntini = [];
  linee = [];
  ellissi = [];
  rettangoli = [];
  segments = [];
  lastEll = null;
  lastRect = null;
  lastSegment = null;
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
//--------------------------------------------------------------------------------
//EventListener
var clear = document.getElementById('clear');
var deleteAllLine= document.getElementById("Delete-All-Line");
canvas.addEventListener("mousedown", controllaPuntino);
canvas.addEventListener("mousemove", movePoint);
canvas.addEventListener("mouseup", endPointMove);
canvas.addEventListener("mousedown", makeDot);
canvas.addEventListener("mousedown", startLine);
canvas.addEventListener("mouseup", endLine);
canvas.addEventListener("mousemove", makeLine, false);
canvas.addEventListener("mousemove", moveRect);
canvas.addEventListener("mouseup", endRectMove);
canvas.addEventListener("mousedown", thereIsRect);
canvas.addEventListener("mousedown", rectStart);
canvas.addEventListener("mouseup", rectStop);
canvas.addEventListener("mousemove", makeRect);
canvas.addEventListener("mousedown", ellStart);
canvas.addEventListener("mouseup", ellStop);
canvas.addEventListener("mousemove", makeell);
canvas.addEventListener("mousedown", segmentStart);
canvas.addEventListener("mouseup", segmentStop);
canvas.addEventListener("mousemove", makeSegment);
fileInput.addEventListener("change", loadImage);
clear.addEventListener("click", function () {
  resetCanvas(context);
});
deleteAllLine.addEventListener("click", function(){
  clearAllLine(context);
});
document.querySelector('#container').oninput = function (ev) {
  if (ev.target.value) {
    refreshCanvas(context);
  }
}
