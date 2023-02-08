var info = document.getElementById("evento");

$.ajax({
    async: true,
    type: "GET",
    url: "/api/seeEvent",
    data: {
        "id": sessionStorage.getItem("id")
    },
    success: function(data){
        console.log(data);
        var contenuto = parsaResponse(data);

        info.appendChild(contenuto);

    },
    error: function(data){
        console.error(data);
    }
});

function parsaResponse(jsonObject) {
    
    var contenuto = document.createElement("div");
    contenuto.setAttribute("id","evento-contenuto");
    var header = document.createElement("h1");
    header.setAttribute("id","evento-titolo");
    header.innerHTML = jsonObject.nome
    contenuto.appendChild(header);
    var container = document.createElement("div");
    container.setAttribute("id", "container-immagine")
    if(jsonObject.immagine){
        var img = document.createElement("img");
        img.setAttribute("class", "center");
        img.setAttribute("alt","immagine");
        img.setAttribute("src", "/uploads/" + jsonObject.immagine);
        container.appendChild(img);
    }
    contenuto.appendChild(container);
    var p = document.createElement("p");
    p.setAttribute("id","evento-descrizione");
    p.innerHTML = jsonObject.descrizione;
    contenuto.appendChild(p);

    tipologia = document.createElement("h2");
    tipologia.setAttribute("id","evento-info-titolo");
    tipologia.innerHTML = "Tipologia: " + jsonObject.tipologia;
    contenuto.appendChild(tipologia);

    titoletto = document.createElement("h2");
    titoletto.setAttribute("id","evento-info-titolo");
    titoletto.innerHTML = "Informazioni";
    contenuto.appendChild(titoletto);

    p = document.createElement("p");
    p.setAttribute("id","evento-info");
    p.innerHTML = "Provincia: " + jsonObject.provincia +
        "<br>Location: " + jsonObject.posizione +
        "<br>Eta': " + jsonObject.eta + 
        "<br>Dress code': " + jsonObject.dress_code +
        "<br>Orario': " + jsonObject.orario +
        "<br>Data': " + jsonObject.data +  
        "<br>Costo': " + jsonObject.costo;

    contenuto.appendChild(p);

    var documentUrl = window.location.href;
    console.log(documentUrl)
    if(documentUrl.includes("http://127.0.0.1:3001/elimina")) {
        var form = document.createElement("form");
        form.setAttribute("id", "page");
        form.setAttribute("action", "/api/delete?_method=DELETE");
        form.setAttribute("name", "form");
        form.setAttribute("method", "POST");
        form.setAttribute("enctype", "multipart/form-data");
        var button = document.createElement("button");
        button.setAttribute("class", "center-block");
        button.setAttribute("type", "submit");
        button.innerHTML = "Elimina evento";
        contenuto.appendChild(button);
        form.appendChild(contenuto);
        return form
    }else{
        return contenuto;
    }
    
}
