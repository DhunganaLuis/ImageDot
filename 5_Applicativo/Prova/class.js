//variabili e costanti globali
let fileInput = document.getElementById('fileinput');
var dotCount;
var canMakePoint = true;
let canvas = document.getElementById("canvas");
var context = canvas.getContext('2d');
var dotSize=5;
var puntini;
var dotColor='#000';

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
  //----------------------------------------------------------------
  //funzione che disegna il puntino sul canvas
canvas.addEventListener("mousedown", function(e){
    var coo = getMousePosition(canvas, e);
    var dot= new Dot();
    dot.x= coo[0];
    dot.y=coo[1];
    dot.size= dotSize;
    dot.number= dotCount;
    dot.color=dotColor;
    puntini.push(dot);
    refreshCanvas(context);
    dotCount++;
});
//------------------------------------------------------------------
//scriva la grandezza del puntino in  base alla posizione del input range
function scriviGrandezza() {
    var grandezza = document.getElementById("dimensione").value;
    var lineSize = document.getElementById("lineSize").value;
    document.getElementById("value").innerHTML = grandezza;
    document.getElementById("line").innerHTML = lineSize;
    refreshCanvas(context);
  }
  //-----------------------------------------------------------
  //Funzione che prende la grandezza del puntino 
  function getDotSize(){
    dotSize= document.getElementById("dimensione").value;
    var grandezza = document.getElementById("dimensione").value;
    document.getElementById("value").innerHTML = grandezza;
  }
    //-----------------------------------------------------------
  //Funzione che prende il colore del puntino 
  function getDotColor(){
    var colore = document.getElementById('colore').value;
    dotColor=colore;//-->Se non si uas per altro si puo semplificare richiamando solo getcolor
  }
  //--------------------------------------------------------------
  //funzione che pilisce e ridisegna sul canvas
  function refreshCanvas(context){
    clearCanvas(context);
    dotRedraw();
  }
  //----------------------------------------------------------------
  //funzione che ridisegna i puntini sul canvas
  function dotRedraw(){
    for(var i=0;i<puntini.length;i++){
        puntini[i].draw(context);
    }

  }
  //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//Loafd Image
//Mostra l'immagine scelta dall'utente
fileInput.addEventListener('change',
  function (ev) {
    if (ev.target.files) 
    {
        dotCount=1;
        puntini=[];
      refreshCanvas(context);
      let file = ev.target.files[0];
      var reader = new FileReader();
      reader.onloadend = function (e) {
        var image = new Image();
        image.src = e.target.result;
        image.onload = function () {
          var canvas = document.getElementById('canvas');
          canvas.style.backgroundImage = 'url("' + this.src + '") ';
          canvas.style.backgroundSize = 'contain';
          canvas.width = this.width;
          canvas.height = this.height;
        }
      }
      reader.readAsDataURL(file);

    }
  });
//-------------------------------------------------------------------------------
//funzione che inverte il numero dei puntini 
function numberInverter(){
    if(puntini.length!=0 || puntini.length!=1){
      console.log("inverto");
      for(var i= puntini.length-1;i>=0;i--){
        console.log("contrario");
        puntini[i].number=puntini.length- (puntini[i].number-1);
      }
      refreshCanvas(context);
    }else{
      alert("Inserire almeno 2 puntini per poter invertire i numeri");
    }
  }