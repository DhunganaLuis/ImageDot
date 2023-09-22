
function tan() {

    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        let allcheckbox = document.getElementsByClassName("scelta");
        const xmlDoc = this.responseXML;
        const a = xmlDoc.getElementsByTagName("CD");
        let ordina = document.getElementById("ordina").value;
        var alfabetico = document.getElementById("modo").value;
        var ricerca = document.getElementById("ricerca").value;
        var ricercaTipo = document.getElementById("objsch").value;
        var somma = 0;
        var media = 0;
        let tabella = "<table><tr>";
        if (allcheckbox[0].checked) {
            tabella += "<th>Title</th>";
        }
        if (allcheckbox[1].checked) {
            tabella += "<th>Artist</th>";
        }
        if (allcheckbox[2].checked) {
            tabella += "<th>Country</th>";
        }
        if (allcheckbox[3].checked) {
            tabella += "<th>Company</th>";
        }
        if (allcheckbox[4].checked) {
            tabella += "<th>Price</th>";
        }
        if (allcheckbox[5].checked) {
            tabella += "<th>Year</th>";
        }
        tabella += "</tr>";

        var sort = [];
        for (let i = 0; i < a.length; i++) {
            //Creo un oggetto che contiene il title,artist,country,company,price,year
            let cdObj = {
                "title": a[i].getElementsByTagName("TITLE")[0].childNodes[0].nodeValue,
                "artist": a[i].getElementsByTagName("ARTIST")[0].childNodes[0].nodeValue,
                "country": a[i].getElementsByTagName("COUNTRY")[0].childNodes[0].nodeValue,
                "company": a[i].getElementsByTagName("COMPANY")[0].childNodes[0].nodeValue,
                "price": String(a[i].getElementsByTagName("PRICE")[0].childNodes[0].nodeValue),
                "year": String(a[i].getElementsByTagName("YEAR")[0].childNodes[0].nodeValue),

            };
            if (!ricerca) {
                //aggiungo l'oggetto creato in precedenza ad un array
                sort.push(cdObj);
                //controlla se le lettre scritte sono contenute se si aggiunge l'oggetto all'array
            } else {
                if (ricercaTipo == "title" && cdObj.title.toLocaleLowerCase().includes(ricerca.toLocaleLowerCase())) {
                    sort.push(cdObj);
                } else if (ricercaTipo == "artist" && cdObj.artist.toLocaleLowerCase().includes(ricerca.toLocaleLowerCase())) {
                    sort.push(cdObj);
                } else if (ricercaTipo == "country" && cdObj.country.toLocaleLowerCase().includes(ricerca.toLocaleLowerCase())) {
                    sort.push(cdObj);
                } else if (ricercaTipo == "company" && cdObj.company.toLocaleLowerCase().includes(ricerca.toLocaleLowerCase())) {
                    sort.push(cdObj);
                } else if (ricercaTipo == "price" && cdObj.price.toLocaleLowerCase().includes(ricerca.toLocaleLowerCase())) {
                    sort.push(cdObj);
                } else if (ricercaTipo == "year" && cdObj.year.toLocaleLowerCase().includes(ricerca.toLocaleLowerCase())) {
                    sort.push(cdObj);
                }
            }

        }
        if (alfabetico == "az") {
            if (ordina == "title") {
                sort.sort((a, b) => (a.title > b.title) ? 1 : -1)
            } else if (ordina == "artist") {
                sort.sort((a, b) => (a.artist > b.artist) ? 1 : -1)
            } else if (ordina == "country") {
                sort.sort((a, b) => (a.country > b.country) ? 1 : -1)
            } else if (ordina == "company") {
                sort.sort((a, b) => (a.company > b.company) ? 1 : -1)
            } else if (ordina == "price") {
                sort.sort((a, b) => (a.price > b.price) ? 1 : -1)
            } else if (ordina == "year") {
                sort.sort((a, b) => (a.year > b.year) ? 1 : -1)
            }
        } else if (alfabetico == "za") {
            if (ordina == "title") {
                sort.sort((a, b) => b.title.localeCompare(a.title));
            } else if (ordina == "artist") {
                sort.sort((a, b) => b.artist.localeCompare(a.artist));
            } else if (ordina == "country") {
                sort.sort((a, b) => b.country.localeCompare(a.country));
            } else if (ordina == "company") {
                sort.sort((a, b) => b.company.localeCompare(a.company));
            } else if (ordina == "price") {
                sort.sort((a, b) => b.price.localeCompare(a.price));
            } else if (ordina == "year") {
                sort.sort((a, b) => b.price.localeCompare(a.price));
            }
        }

        for (var i = 0; i < sort.length; i++) {
            tabella += "<tr>";
            if (allcheckbox[0].checked) {
                tabella += "<td>" + sort[i].title + "</td>";
            }
            if (allcheckbox[1].checked) {
                tabella += "<td>" + sort[i]["artist"] + "</td>";
            }
            if (allcheckbox[2].checked) {
                tabella += "<td>" + sort[i]["country"] + "</td>";
            }
            if (allcheckbox[3].checked) {
                tabella += "<td>" + sort[i]["company"] + "</td>";
            }
            if (allcheckbox[4].checked) {
                tabella += "<td>" + sort[i]["price"] + "</td>"
            }
            if (allcheckbox[5].checked) {
                tabella += "<td>" + sort[i]["year"] + "</td>";
            }
            tabella += "</tr>";
        }
        tabella += "</table>";
        if (sort.length != 0) {
            for (var i = 0; i < sort.length; i++) {
                somma += Number(sort[i]["price"]);
            }
            media = somma / sort.length;
        }
       
        document.getElementById("Media").innerHTML = media.toFixed(2);

        document.getElementById("tabella").innerHTML = tabella;
    }



    xhttp.open("GET", "cd_catalog.xml");
    xhttp.send();
}

var check = true;
function checkChange() {
    var checkboxes = document.getElementsByClassName("scelta");
    console.log(checkboxes);
    if (!check) {
        for (var checkbox of checkboxes) {
            checkbox.checked = true;
        }
        document.getElementById("sa").value = "Deselezionare tutto";
        check = true;
    } else {
        for (var checkbox of checkboxes) {
            checkbox.checked = false;
        }
        document.getElementById("sa").value = "Seleziona tutto";
        check = false;
    }
}


