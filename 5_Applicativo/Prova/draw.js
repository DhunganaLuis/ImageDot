//Disegnare puntini
let canvas = document.getElementById("canvas");
var context = canvas.getContext('2d');
var puntini = [];
var canDraw = false;
var canMakePoint = true;
var count = 1;
//Event listener  
canvas.addEventListener("mousedown", function (e) {
  if (canMakePoint) {
    var coo = getMousePosition(canvas, e);
    var colore = document.getElementById('colore').value;
    var pointSize = document.getElementById("dimensione").value;
    var fontSize = (16/5)*pointSize;
    console.log(coo);
    console.log(colore);
    drawPoint(context, coo[0], coo[1], count, colore, pointSize, fontSize);
    let puntoObj = {
      "context": context,
      "x": coo[0],
      "y": coo[1],
      "number": count,
      "color": colore,
      "pointSize": pointSize,
      "fontSize": fontSize
    };
    puntini.push(puntoObj);
    //  console.log(puntini);
    count++;
  }

});

//funzione che calcola le coordinate di dove si è cliccato
function getMousePosition(canvas, event) {
  let rect = canvas.getBoundingClientRect();
  let scaleX = canvas.width / rect.width;
  let scaleY = canvas.height / rect.height;
  let x = Math.round((event.x - rect.left) * scaleX);
  let y = Math.round((event.y - rect.top) * scaleY);
  var coordinate = [x, y];
  // console.log(event.clientX+" "+ rect.left);
  // console.log("Coordinate x: " + coordinate[0], 
  //             "Coordinate y: " + coordinate[1]);
  return coordinate;
}


//funzione che disegna un puntino nel punto in cui si è cliccato 
function drawPoint(context, x, y, label, color, size, fontSize) {
  if (color == null) {
    color = '#000';
  }
  if (size == null) {
    size = 5;
  }

  // to increase smoothing for numbers with decimal part
  var pointX = Math.round(x);
  var pointY = Math.round(y);

  context.beginPath();
  context.fillStyle = color;
  context.arc(pointX, pointY, size, 0 * Math.PI, 2 * Math.PI);
  context.fill();

  if (label) {
    var textX = pointX;
    var textY = Math.round(pointY - size - 3);
    context.font = `Italic ${fontSize}px Arial`;
    context.fillStyle = color;
    context.textAlign = 'center';
    context.fillText(label, textX, textY);
  }
}
//scriva la grandezza del puntino in  base alla posizione del input range
function scriviGrandezza() {
  var value = grandezza = document.getElementById("dimensione").value;
  document.getElementById("value").innerHTML = value;
}
//Funzione vhe pulisce in canvas da tutto ciò che è disegnato sopra
function clearCanvas(context) {
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  console.log("pulito");
}
var clr = document.getElementById("clear");
clr.addEventListener("click", event => { clearCanvas(context) });
//Funzione vhe ridisegna tutti i puntini
function redraw() {
  for (var i = 0; i < puntini.length; i++) {
    drawPoint(puntini[i]["context"], puntini[i]["x"], puntini[i]["y"], puntini[i]["number"], puntini[i]["color"], puntini[i]["pointSize"], puntini[i]["fontSize"]);
  }

}
var riscrivi = document.getElementById("redraw");
riscrivi.addEventListener("click", event => { redraw() });

//Strumento penna
const MAIN_MOUSE_BUTTON = 0;
function setLineProperties(context) {
  context.lineWidth = 4;
  context.lineJoin = "round";
  context.lineCap = "round";
  return context;
}
let shouldDraw = false;

canvas.addEventListener("mousedown", start);
canvas.addEventListener("mouseup", end);
canvas.addEventListener("mousemove", move, false);

function start(event) {
  if (canDraw) {
    if (event.button === MAIN_MOUSE_BUTTON) {
      shouldDraw = true;
      setLineProperties(context);
      var coo = getMousePosition(canvas, event);
      context.beginPath();
      context.moveTo(coo[0], coo[1]);
    }
  }
}

function end(event) {
  if (event.button === MAIN_MOUSE_BUTTON) {
    shouldDraw = false;
  }
}

function move(event) {
  if (shouldDraw) {
    var coo = getMousePosition(canvas, event);
    context.lineTo(coo[0], coo[1]);
    context.stroke()
  }
}
//controllo puntino o penna
function wichtool() {
  var isChecked = document.getElementsByClassName("tools");
  if (isChecked[0].checked) {
    canMakePoint = true;
    canDraw = false;
  } else if (isChecked[1].checked) {
    canMakePoint = false;
    canDraw = true;
  }

}
