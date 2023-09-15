//Mostra l'immagine scelta dall'utente
let fileInput = document.getElementById('fileinput');

fileInput.addEventListener('change', 
                           function(ev) {
  console.log("hi");
    console.log(ev.target.files);
  if(ev.target.files) {
    let file = ev.target.files[0];
    var reader  = new FileReader();

    reader.onloadend = function (e) {
      var image = new Image();
      image.src = e.target.result;
      image.onload = function(ev) {
        console.log("loading");
        var canvas = document.getElementById('canvas');
        var canvas2 = document.getElementById('canvas2');
        canvas.width = image.width;
        canvas.height = image.height;
        canvas2.width = image.width;
        canvas2.height = image.height;
        canvas3.width = image.width;
        canvas3.height = image.height;
         var ctx = canvas.getContext('2d');
        ctx.drawImage(image,0,0);
      }
    }
    reader.readAsDataURL(file);

  }
});


