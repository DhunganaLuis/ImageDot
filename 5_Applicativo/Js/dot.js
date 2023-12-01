/**
 * Classe Dot con le propietà x e y che rappresentano le coordinate del puntino,
 * numbe che rappresenta il numero del puntino e size per la grandezza
 * 
 */
class Dot {
    constructor() {
      this.x = 0;
      this.y = 0;
      this.number = null;
      this.color = '#000';
      this.size = 5;
    }

    /**
     * metodo che crea dei puntini e gli assegna la lable con il numero
     * 
     * @param {*} context 
     */
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
      var coo = getMousePosition(canvas, event);//prende le coordinate del cursore
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