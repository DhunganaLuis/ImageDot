
    let canvas = document.querySelector("canvas");
    var context = canvas.getContext('2d');
    var count= 1; 
    //Event listener  
    canvas.addEventListener("mousedown", function(e)
    {
       var coo= getMousePosition(canvas, e);
       console.log(coo);
       drawPoint(context, coo[0], coo[1], count, 'black', 3);
       count++;

    });

//funzione che calcola le coordinate di dove si è cliccato
function getMousePosition(canvas, event) {
        let rect = canvas.getBoundingClientRect();
        let x = event.clientX - rect.left;
        let y = event.clientY - rect.top;
        var coordinate=[x,y];
        console.log(event.clientX+" "+ rect.left);
        console.log("Coordinate x: " + coordinate[0], 
                    "Coordinate y: " + coordinate[1]);
        return coordinate;
    }
  
    
//funzione che disegna un puntino nel punto in cui si è cliccato 
function drawPoint(context, x, y, label, color, size) {
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
      
        context.font = 'Italic 14px Arial';
        context.fillStyle = color;
        context.textAlign = 'center';
        context.fillText(label, textX, textY);
    }
}


// Usage example:

// var canvas = document.querySelector('#my-canvas');
// var context = canvas.getContext('2d');

// drawPoint(context, 20, 30, 'A', 'red', 1);
// drawPoint(context, 50, 120, 'B', 'blue', 1.7);
// drawPoint(context, 140, 70, 'C', 'orange', 5);