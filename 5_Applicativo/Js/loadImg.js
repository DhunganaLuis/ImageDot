 /**
  * Metodo che dato un fgile image lo iposta come sfondo del canvas e riinizializza tutte le variabili
  * di disegno.
  * 
  * @param {*} ev 
  */
  function loadImage(ev) {
    if (ev.target.files) {
      resetCanvas(context);
      let file = ev.target.files[0];
      var reader = new FileReader();
      reader.onloadend = function (e) {
        var image = new Image();
        image.src = e.target.result;
        image.onload = function () {
          var canvas = document.getElementById('canvas');
          canvas.style.display = 'block';
          canvas.style.backgroundImage = 'url("' + this.src + '") ';
          ImgSrc = canvas.style.backgroundImage;
          canvas.style.backgroundSize = 'contain';
          canvas.width = this.width;
          canvas.height = this.height;
          canvas.style.border = "2px solid #343a40";
          document.getElementById("container").style.display = 'block';
  
        }
      }
      reader.readAsDataURL(file);
    }
  }