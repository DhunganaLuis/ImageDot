let canvas = document.getElementById("canvas");
var context = canvas.getContext('2d');
var puntini = [];
var Linee = [];
var canDraw = false;
var canMakePoint = true;
var canMovePoint = false;
var count = 1;
//Event listener  
canvas.addEventListener("mousedown", function (e) {
    if (canMakePoint) {
        var coo = getMousePosition(canvas, e);
        var colore = document.getElementById('colore').value;
        var pointSize = document.getElementById("dimensione").value;
        var fontSize = (16 / 5) * pointSize;
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
//controllo puntino o penna
function wichtool() {
    var isChecked = document.getElementsByClassName("tools");
    if (isChecked[0].checked) {
        canMakePoint = true;
        canMovePoint = false;
    } else if (isChecked[1].checked) {
        canMakePoint = false;
        canMovePoint = true;
    }
}
function scriviGrandezza() {
    var grandezza = document.getElementById("dimensione").value;
    var lineSize = document.getElementById("lineSize").value;
    document.getElementById("value").innerHTML = grandezza;
    document.getElementById("line").innerHTML = lineSize;

}
// refresh del canvas
function refreshCanvas(context) {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    console.log("pulito");
    for (var i = 0; i < puntini.length; i++) {
        drawPoint(puntini[i]["context"], puntini[i]["x"], puntini[i]["y"], puntini[i]["number"], puntini[i]["color"], puntini[i]["pointSize"], puntini[i]["fontSize"]);
    }
    console.log("ridisegnato");
}
// Spostamento puntini
//controllo che ne punto schiacciato ci sia un puntino
const MAIN_MOUSE_BUTTON = 0;
var shouldMove=false;
canvas.addEventListener("mousedown", controllaPuntino);
canvas.addEventListener("mousemove",movePoint,false);
canvas.addEventListener("mouseup",endPointMove);
var pointSelected= -1;
function controllaPuntino(event) {
    if (canMovePoint) {
        console.log("sto per controllare");
        var pos = getMousePosition(canvas, event);
        for (var i = 0; i < puntini.length; i++) {
            if (Math.abs(puntini[i]["x"] - pos[0]) < 10 && Math.abs(puntini[i]["y"] - pos[1]) < 10) {
                puntini[i]["color"] = "#4AA8F4";
                pointSelected=i;
                shouldMove=true;
            }else{
                if(pointSelected>-1){
                    puntini[pointSelected]["color"]="#000";
                    pointSelected=-1;
                }
            }
        }
        refreshCanvas(context);
    }
}

function movePoint(event){
    if(shouldMove){
    var coo=getMousePosition(canvas,event);
    puntini[pointSelected]["x"]=coo[0];
    puntini[pointSelected]["y"]=coo[1];
    refreshCanvas(context);
    }
}

function endPointMove(event){
    if (event.button === MAIN_MOUSE_BUTTON) {
        shouldMove = false;
      }
}

function deletePoint(){
    if(pointSelected>-1){
        puntini.pop(pointSelected);
        refreshCanvas(context);
    }
}
