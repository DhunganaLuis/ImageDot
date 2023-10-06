//Mostra l'immagine scelta dall'utente
let fileInput = document.getElementById('fileinput');
let checkboxes = document.getElementsByClassName("scelta");

fileInput.addEventListener('change',
  function (ev) {
    // console.log("hi");
    // console.log(ev.target.files);
    if (ev.target.files) {
      let file = ev.target.files[0];
      var reader = new FileReader();

      reader.onloadend = function (e) {
        var image = new Image();
        image.src = e.target.result;
        image.onload = function () {
          // console.log("loading");
          var canvas = document.getElementById('canvas');
          canvas.style.backgroundImage = 'url("' + this.src + '") ';
          canvas.style.backgroundSize = 'contain';
          canvas.width = this.width;
          canvas.height = this.height;
          var canvas2 = document.getElementById('canvas2');
          // canvas.width = image.width;
          // canvas.height = image.height;
          // canvas2.width = image.width;
          // canvas2.height = image.height;
          // canvas3.width = image.width;
          // canvas3.height = image.height;
          // allChecked();
        }
      }
      reader.readAsDataURL(file);

    }
  });

// function allChecked() {
//   for (var checkbox of checkboxes) {
//     checkbox.checked = true;
//   }
//   layerVisibility();
// }
// function layerVisibility() {
//   if (checkboxes[0].checked) {
//     document.getElementById("canvas3").style.visibility = "visible";
//     console.log("puntini");
//   } else {
//     document.getElementById("canvas3").style.visibility = "hidden";
//   }
//   if (checkboxes[1].checked) {
//     document.getElementById("canvas2").style.visibility = "visible";
//     console.log("Linee");
//   } else {
//     document.getElementById("canvas2").style.visibility = "hidden";
//   }
//   if (checkboxes[2].checked) {
//     document.getElementById("canvas").style.visibility = "visible";
//     console.log("Immagine");
//   } else {
//     document.getElementById("canvas").style.background="red";
//   }

// }


