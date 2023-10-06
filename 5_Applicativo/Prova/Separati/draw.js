//variabili e costanti globali
// let canvas = document.getElementById("canvas");
// var context = canvas.getContext('2d');
// var puntini;
var Linee = [];
// var canDraw = false;
// var canMakePoint = true;
// var isSelectedPoi = false;
// var count;
// var shouldMove = false;
// var canMovePoint=false;
// const MAIN_MOUSE_BUTTON = 0;
// var pointSelected = -1;
//--------------------------------------------------------------------------------
//Puntini 
//Event listener per i puntini
// canvas.addEventListener("mousedown", function (e) {
//   if (canMakePoint) {
//     var coo = getMousePosition(canvas, e);
//     var colore = document.getElementById('colore').value;
//     var pointSize = document.getElementById("dimensione").value;
//     var fontSize = (16 / 5) * pointSize;
//     // console.log(coo);
//     // console.log(colore);
//     drawPoint(context, coo[0], coo[1], count, colore, pointSize, fontSize);
//     let puntoObj = {
//       "context": context,
//       "x": coo[0],
//       "y": coo[1],
//       "number": count,
//       "color": colore,
//       "pointSize": pointSize,
//       "fontSize": fontSize
//     };
//     puntini.push(puntoObj);
//     //  console.log(puntini);
//     count++;
//   }

// });

//funzione che disegna un puntino nel punto in cui si è cliccato 
// function drawPoint(context, x, y, label, color, size, fontSize) {
//   if (color == null) {
//     color = '#000';
//   }
//   if (size == null) {
//     size = 5;
//   }

//   // to increase smoothing for numbers with decimal part
//   var pointX = Math.round(x);
//   var pointY = Math.round(y);

//   context.beginPath();
//   context.fillStyle = color;
//   context.arc(pointX, pointY, size, 0 * Math.PI, 2 * Math.PI);
//   context.fill();

//   if (label) {
//     var textX = pointX;
//     var textY = Math.round(pointY - size - 3);
//     context.font = `Italic ${fontSize}px Arial`;
//     context.fillStyle = color;
//     context.textAlign = 'center';
//     context.fillText(label, textX, textY);
//   }
// }
//selezionamento, rimozione e spostamento dei puntini
// canvas.addEventListener("mousedown", controllaPuntino);
// canvas.addEventListener("mousemove", movePoint, false);
// canvas.addEventListener("mouseup", endPointMove);
// var pointSelected = -1;
// var lastColor;
// function controllaPuntino(event) {
//   if (canMovePoint) {
//     var pointDim = document.getElementById("dimensione").value;
//     var pos = getMousePosition(canvas, event);
//     for (var i = 0; i < puntini.length; i++) {
//       if (Math.abs(puntini[i]["x"] - pos[0]) < pointDim && Math.abs(puntini[i]["y"] - pos[1]) < pointDim) {
//         if (pointSelected > -1) {
//           puntini[pointSelected]["color"] = lastColor;
//         }
//         lastColor = puntini[i]["color"];
//         puntini[i]["color"] = "#4AA8F4";
//         pointSelected = i;
//         shouldMove = true;
//         break;
//       } else {
//         if (pointSelected > -1) {
//           puntini[pointSelected]["color"] = lastColor;
//           pointSelected = -1;
//         }
//       }
//     }
//     refreshCanvas(context);
//   }
// }
// //funzione che muove i puntini
// function movePoint(event) {
//   if (shouldMove) {
//     var coo = getMousePosition(canvas, event);
//     puntini[pointSelected]["x"] = coo[0];
//     puntini[pointSelected]["y"] = coo[1];
//     refreshCanvas(context);
//   }
// }
// //funzione che termina la selezione
// function endPointMove(event) {
//   if (event.button === MAIN_MOUSE_BUTTON) {
//     shouldMove = false;
//   }
// }
//Funzione che rimuove il puntino selezionato
// function deletePoint() {
//   if (pointSelected > -1) {
//     // console.log("rimozione in corso");
//     // console.log(pointSelected);
//     puntini.splice(pointSelected,1);
//     count--;
//     pointSelected=-1;
//     // console.log(puntini);
//     reorderNumber();
//     refreshCanvas(context);
//   }
// }
// function reorderNumber(){
//   for (var i=0;i<puntini.length;i++){
//     puntini[i]["number"]= i+1;
//   }

// }
// //funzione che inverte il numero dei puntini 
// function numberInverter(){
//   if(puntini.length!=0 || puntini.length!=1){
//     console.log("inverto");
//     for(var i= puntini.length-1;i>=0;i--){
//       console.log("contrario");
//       puntini[i]["number"]=puntini.length- (puntini[i]["number"]-1);
//     }
//     refreshCanvas(context);
//   }else{
//     alert("Inserire almeno 2 puntini per poter invertire i numeri");
//   }
// }
//-----------------------------------------------------------------------------------
//funzione che calcola le coordinate di dove si è cliccato
// function getMousePosition(canvas, event) {
//   let rect = canvas.getBoundingClientRect();
//   let scaleX = canvas.width / rect.width;
//   let scaleY = canvas.height / rect.height;
//   let x = Math.round((event.x - rect.left) * scaleX);
//   let y = Math.round((event.y - rect.top) * scaleY);
//   var coordinate = [x, y];
//   return coordinate;
// }
//--------------------------------------------------------------------------
//scriva la grandezza del puntino in  base alla posizione del input range
function scriviGrandezza() {
  var grandezza = document.getElementById("dimensione").value;
  var lineSize = document.getElementById("lineSize").value;
  document.getElementById("value").innerHTML = grandezza;
  document.getElementById("line").innerHTML = lineSize;
  refreshCanvas(context);
  

}
//------------------------------------------------------------------------------------
//Strumento penna
function setLineProperties(context) {
  var width = document.getElementById("lineSize").value;
  context.lineWidth = width;
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
    context.stroke();
  }
}
//------------------------------------------------------------------------------
//controllo scelta dell'utente
// function wichtool() {
//   var isChecked = document.getElementsByClassName("tools");
//   if (isChecked[0].checked) {
//     canMakePoint = true;
//     canDraw = false;
//     canMovePoint = false;
//   } else if (isChecked[1].checked) {
//     canMakePoint = false;
//     canDraw = true;
//     canMovePoint = false;
//   } else if (isChecked[2]) {
//     canMakePoint = false;
//     canDraw = false;
//     canMovePoint = true;
//   }
//   // console.log(canMovePoint);
// }
//---------------------------------------------------------------------
// funzione che ricarica il canvas
// function refreshCanvas(context) {
//   context.clearRect(0, 0, context.canvas.width, context.canvas.height);
//   // console.log("pulito");
//   for (var i = 0; i < puntini.length; i++) {
//     drawPoint(puntini[i]["context"], puntini[i]["x"], puntini[i]["y"], puntini[i]["number"], puntini[i]["color"], puntini[i]["pointSize"], puntini[i]["fontSize"]);
//   }
//   // console.log("ridisegnato");
// }
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//Loaf Image
//Mostra l'immagine scelta dall'utente
// let fileInput = document.getElementById('fileinput');
// fileInput.addEventListener('change',
//   function (ev) {
//     // console.log("hi");
//     // console.log(ev.target.files);
//     if (ev.target.files) 
//     {
//       count= 1;
//       puntini=[];
//       refreshCanvas(context);
//       let file = ev.target.files[0];
//       var reader = new FileReader();
//       reader.onloadend = function (e) {
//         var image = new Image();
//         image.src = e.target.result;
//         image.onload = function () {
//           // console.log("loading");
//           var canvas = document.getElementById('canvas');
//           canvas.style.backgroundImage = 'url("' + this.src + '") ';
//           canvas.style.backgroundSize = 'contain';
//           canvas.width = this.width;
//           canvas.height = this.height;
//         }
//       }
//       reader.readAsDataURL(file);

//     }
//   });