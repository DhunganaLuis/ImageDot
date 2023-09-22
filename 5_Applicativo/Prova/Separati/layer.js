
function layerVisibility(){
let checkboxes= document.getElementsByClassName("scelta");
    if(checkboxes[0].checked){
        document.getElementById("canvas3").style.visibility="visible";
        console.log("puntini");
    }else{
        document.getElementById("canvas3").style.visibility="hidden";
    }
    if(checkboxes[1].checked){
        document.getElementById("canvas2").style.visibility="visible";
        console.log("Linee");
    }else{
        document.getElementById("canvas2").style.visibility="hidden";
    }
    if(checkboxes[2].checked){
        document.getElementById("canvas").style.visibility="visible";
        console.log("Immagine");
    }else{
        document.getElementById("canvas").style.visibility="hidden";
    }

}
