/**
 * Metodo che esporta ciò che è stato disegnato nel canvas.
 * Se l'utente vuole esporta anche la soluzione del giocoi Unisci i puntini
 */
function saveDotImage() {
    var soluzione = document.getElementById("sol");
    var name = document.getElementById("nameImg").value;
    var ext = document.getElementById("formatImg").value;
    var connectDot = document.getElementById("connectDot");
    var link = document.createElement('a');
    
    if (!soluzione.checked) {
        if (isConnectedPoint) {
            //simula il click per riachioamare la funzione connectedDot()
            connectDot.click();
        }
    }
    
    link.download = name + "." + ext;

    // Salva l'immagine come dati URL
    link.href = canvas.toDataURL('image/' + ext);

    // Simula un clic sull'elemento link per avviare il download
    link.click();

    if (soluzione.checked) {
        connectDot.click();
        
        link.download = name + "Sol." + ext;
        // Salva l'immagine aggiornata come dati URL
        link.href = canvas.toDataURL('image/' + ext);

        // Simula un clic sull'elemento link per avviare il download
        link.click();
    }
}
