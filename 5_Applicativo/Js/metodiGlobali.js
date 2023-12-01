/**
 * Metodo che cancella tutto ciò che è disegnato sul canvas.
 * 
 * @param {*} context 
 */
function clearCanvas(context) {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  }
 
  /**
   * Metdo che calcola la posizione del mouse rispetto al canvas
   * 
   * @param canvas il canvas di riferimento
   * @param event l'evento di riferimento 
   */
  function getMousePosition(canvas, event) {
    let rect = canvas.getBoundingClientRect();
    let scaleX = canvas.width / rect.width;
    let scaleY = canvas.height / rect.height;
    let x = Math.round((event.x - rect.left) * scaleX);
    let y = Math.round((event.y - rect.top) * scaleY);
    var coordinate = [x, y];
    return coordinate;
  }

  /**
   * Funzione che pulisce completamente il canvas e in base ai layer selezionati dall'utente ri disega le figure
   * 
   * @param {*} context 
   */
  function refreshCanvas(context) {
    var checkboxes = document.getElementsByClassName("layer");
    clearCanvas(context);
    wichtool();
    if (checkboxes[0].checked) {
      dotRedraw();
      if (isConnectedPoint) {//se i punti erano connesi allora li ridisegna e li connette
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

  /**
   * Metodo che controlla quale strumento ha scelto l'utentze. I base allo strumento scelto attiva le variabili che necessitza il tool
   * e dsisattiva tutte le altre. In più fa apparire tutte le propieà legate a quello strumento
   */
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
  
/**
 * Metodo che deseleziona un disegno selezionatato ridandogli il suo colore e assegando alla sua 
 * variabile di selezione il valore -1
 * 
 */
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
  
  /**
   * Funzionw che elimina il disegno selezionato dal proprio array. 
   *  In caso fodde un puntino decremeta il numero totale diu puntini e riordina i loro numeri
   */
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

  /**
   * Funzione che pulidcer completamente il canvas e fa tornare tutte le variabili allo stato iniziale.
   * @param {*} context 
   */
 
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
  /**
   * Mretodo chew riodisega le ellissi, i rettangoli, i  segmenti e le linee fatta a mano 
   */
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