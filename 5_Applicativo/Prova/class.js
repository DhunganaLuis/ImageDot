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
var isConnectedPoint=false;
var isPressbtn= false;
var isSelectedPoint = false;
var shouldMove = false;
var canMakePoint = true;
var canMovePoint = false;

//variabili linea
var xLine = 0;
var yLine = 0;
var widthLine = 4;
var colorLine = "#000";
var linee = [];
var canDraw = false;
var shouldDraw = false;

//variabili rettangoli
var lastRect;
var rectSize=5;
var rectColor='#000'
var canRect = false;
var shouldRect = false;
var rettangoli = [];

//variabili ellissi
var elltSize=5;
var ellColor='#000'
var canEll = false;
var shouldEll = false;
var lastEll;
var ellissi = [];

//variabili segment
var segmentSize=5;
var segmentColor='#000'
var canSegment=false;
var shouldSegment=false;
var lastSegment;
var segments=[];

//drag
var starDragX = 0;
var starDragY = 0;

//img
var ImgSrc;

//altre variabili
var isPressButton=false;

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
    // console.log("inverto");
    for (var i = puntini.length - 1; i >= 0; i--) {
      // console.log("contrario");
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

//funzione che connette automaticamente i puntini
function connectDots(){
  if(puntini.length>1){
    if(isPressButton){
      isConnectedPoint=true;
      for(var i=0;i<puntini.length;i++){
        var secondPos=(i+1)%puntini.length;
        context.beginPath();
        context.strokeStyle=dotColor;
        context.moveTo(puntini[i].x,puntini[i].y);
        context.lineTo(puntini[secondPos].x,puntini[secondPos].y);
        context.stroke();      
      }
      console.log("con "+isConnectedPoint);
      console.log("press "+ isPressbtn);

    }else{
      isConnectedPoint=false;
      console.log("con "+isConnectedPoint);
      console.log("press "+ isPressbtn);
      refreshCanvas(context);
    }

  }
}
function pressButton(){
  isPressButton=!isPressButton;
  connectDots();
}
// function changeNumber(){
//   console.log("entra");
//   if(pointSelected>-1){
//   console.log("if");
//     var num= document.getElementById("dotNumber").value;
//     if(num!=puntini[pointSelected].number){
//       for(var i=0;i<puntini.length;i++){
//         if(puntini[i].number>=num){
//           puntini[i].number=puntini[i].number+1;
//         }
        
//       }
//       puntini[pointSelected].number=num;
//       refreshCanvas(context);
//     }
//   }

// }
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
//---------------------------------------------------------------------
//calsse Ellipse
class Ellipse {
  constructor(posX, posY, starX, startY) {
    this.x = posX;
    this.y = posY;
    this.startX = starX;
    this.starY = startY;
    this.color = '#000';
    this.size = 5;
  }
  draw(context) {
    var w = this.x - this.startX;
    var h = this.y - this.starY;
    var radius = Math.sqrt(Math.pow((this.startX - this.x), 2) + Math.pow((this.starY - this.y), 2));
    context.beginPath();
    context.lineWidth=this.size;
    context.strokeStyle= this.color;
    context.ellipse(this.startX, this.starY, Math.abs(w), Math.abs(h), 0, 2 * Math.PI, false);
    context.stroke();
  }

}
function ellStart(event) {
  if (canEll) {
    // console.log("start");
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
    var ell = new Ellipse(lastCoo[0], lastCoo[1], starDragX, starDragY,);
    lastEll = ell;
    console.log(lastEll);
    ell.draw(context);
  }

}
function ellStop() {
  if(lastEll!=undefined){
    shouldEll = false;
    ellissi.push(lastEll);
  }
    

}
function ellRedraw() {
  for (var i = 0; i < ellissi.length; i++) {
    ellissi[i].draw(context);
  }
}
//--------------------------------------------------------------------------
//class Rect
class Rect {
  constructor(posX, posY, startX, starY) {
    this.startX = startX;
    this.starY = starY;
    this.x = posX;
    this.y = posY;
    this.color = '#000';
    this.size = 5;
  }
  draw(context) {
    var w = this.x - this.startX;
    var h = this.y - this.starY;
    context.beginPath();
    context.lineWidth=this.size;
    context.strokeStyle=this.color;
    context.rect(this.startX, this.starY, w, h);
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
    // console.log("drag");
    clearCanvas(context);
    refreshCanvas(context);
    var lastCoo = getMousePosition(canvas, event);
    var rettangolo = new Rect(lastCoo[0], lastCoo[1], starDragX, starDragY);
    rettangolo.draw(context);
    lastRect = rettangolo;
  }

}
function rectStop() {
  if(lastRect!=undefined){
    shouldRect = false;
    rettangoli.push(lastRect);
  }

}
function rectRedraw(){
  for(var i=0;i<rettangoli.length;i++){
    rettangoli[i].draw(context);
  }
}

//-------------------------------------------------------------------------
//classe segment
class Segment{
  constructor(posX,posY,starX,starY){
    this.x=posX;
    this.y=posY;
    this.startX=starX;
    this.starY=starY;
    this.color = '#000';
    this.size = 5;
  }
  draw(context){
    context.beginPath();
    context.lineWidth=this.size;
    context.strokeStyle=this.color;
    context.moveTo(this.startX,this.starY);
    context.lineTo(this.x,this.y);
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
      var segment= new Segment(lastCoo[0],lastCoo[1],starDragX,starDragY);
      segment.draw(context);
      lastSegment=segment;
  }
}
function segmentStop() {
  if(lastSegment!=undefined){
    shouldSegment = false;
    segments.push(lastSegment);
  }
}
function segmentRedraw(){
  for(var i=0;i<segments.length;i++){
    segments[i].draw(context);
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
  wichtool();
  if (checkboxes[0].checked) {
    dotRedraw();
    if(isConnectedPoint){
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
var f= false;
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
        canvas.style.backgroundImage = 'url("' + this.src + '") ';
        ImgSrc = canvas.style.backgroundImage;
        // console.log(ImgSrc);
        canvas.style.backgroundSize = 'contain';
        canvas.width = this.width;
        canvas.height = this.height;
        document.getElementById("container").style.display='block';
        
      }
    }
    reader.readAsDataURL(file);

  }
}

//-------------------------------------------------------------------------------
//funzione che inverte il numero dei puntini 
function numberInverter() {
  if (puntini.length != 0 || puntini.length != 1) {
    // console.log("inverto");
    for (var i = puntini.length - 1; i >= 0; i--) {
      // console.log("contrario");
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
  var isChecked = document.getElementsByClassName("tools");
  var numDisp=document.getElementById("selectNum");
  // console.log(isChecked);
  if (isChecked[0].checked) {
    canMakePoint = true;
    canDraw = false;
    canMovePoint = false;
    canEll = false;
    canRect = false;
    canSegment=false;
    numDisp.style.display='none';
  } else if (isChecked[1].checked) {
    canMakePoint = false;
    canDraw = true;
    canMovePoint = false;
    canRect = false;
    canEll = false;
    canSegment=false;
    numDisp.style.display='none';

  } else if (isChecked[2].checked) {
    canMakePoint = false;
    canDraw = false;
    canMovePoint = true;
    canEll = false;
    canRect = false;
    canSegment=false;
    numDisp.style.display='none';
    if(puntini.length>1){
      numDisp.style.display='block';
      document.getElementById("dotNumber").setAttribute("max",puntini.length);
    }

  } else if (isChecked[3].checked) {
    canMakePoint = false;
    canDraw = false;
    canMovePoint = false;
    canRect = true;
    canEll = false;
    canSegment=false;
    numDisp='none';

  } else if (isChecked[4].checked) {
    canMakePoint = false;
    canDraw = false;
    canMovePoint = false;
    canRect = false;
    canEll = true;
    canSegment=false;
    numDisp='none';

  }else if(isChecked[5].checked){
    canSegment=true;
    canMakePoint = false;
    canDraw = false;
    canMovePoint = false;
    canRect = false;
    canEll = false;
    numDisp='none';

  }
  // console.log(canMovePoint);
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
  if(segments.length!=0){
    segmentRedraw();
  }
}
//--------------------------------------------------------------------------------
//EventListener
canvas.addEventListener("mousedown", controllaPuntino);
canvas.addEventListener("mousemove", movePoint, false);
canvas.addEventListener("mouseup", endPointMove);
canvas.addEventListener("mousedown", makeDot);
canvas.addEventListener("mousedown", startLine);
canvas.addEventListener("mouseup", endLine);
canvas.addEventListener("mousemove", makeLine, false);
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
document.querySelector('#container').oninput = function (ev) {
  if (ev.target.value) {
    refreshCanvas(context);
  }
}