const MAIN_MOUSE_BUTTON = 0;
let theCanvas = document.getElementById("canvas");
var canDraw=true;
// function prepareContext(canvasElement) {
//   let dpr = window.devicePixelRatio || 1;
//   let rect = canvasElement.getBoundingClientRect();
//   canvasElement.width = rect.width * dpr;
//   canvasElement.height = rect.height * dpr;

//   let context = canvasElement.getContext("2d");
//   context.scale(dpr, dpr);

//   return context;
// }

function setLineProperties(context) {
  context.lineWidth = 4;
  context.lineJoin = "round";
  context.lineCap = "round";
  return context;
}

// let clearButton = document.getElementById("clearButton");

// let theContext = prepareContext(theCanvas);
let theContext= theCanvas.getContext('2d');
let shouldDraw = false;

theCanvas.addEventListener("mousedown", start);
theCanvas.addEventListener("mouseup", end);
theCanvas.addEventListener("mousemove", move, false);

// clearButton.addEventListener("click", event => {
//   clearCanvas(theContext);
// });


// function clearCanvas(context) {
//   context.clearRect(0, 0, context.canvas.width, context.canvas.height);  
// }

function start(event) {
  if (canDraw) {
    if (event.button === MAIN_MOUSE_BUTTON) {
      shouldDraw = true;
      setLineProperties(theContext);
      var coo= getMousePosition(theCanvas,event);
      theContext.beginPath();
      theContext.moveTo(coo[0], coo[1]);
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
    var coo=getMousePosition(theCanvas,event);
    theContext.lineTo(coo[0], coo[1]);
    theContext.stroke()
  }
}

