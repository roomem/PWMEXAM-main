var list = document.getElementById("cards");
var documentUrl = document.URL;

function lista(){
    let xhr = new XMLHttpRequest();
    xhr.open('GET', "/api/getList", true);
    xhr.responseType = 'json';
    xhr.setRequestHeader("documentUrl", documentUrl);

    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            if(xhr.status == 200){
                console.log(xhr.response);
                list = parsaResponse(xhr.response); 
            }else{
                console.error(xhr.response)
            }
        }
    }

    xhr.send()
}

function parsaResponse(data) {
    data.forEach(element => {
        console.log(getEventId(element))
        var card = document.createElement("div");
        card.setAttribute("class","card");

        var upData = document.createElement("div"); //immagine e bottone
        upData.setAttribute("class","card__image-container");
        if(element.immagine){
            var img = document.createElement("img");
            img.setAttribute("src",element.immagine);
            img.setAttribute("alt","immagine");
            upData.appendChild(img);
        }
        var link = document.createElement("a");
        var p = document.createElement("p");
        if(document.URL.includes("eventiAdmin")){
            link.setAttribute("href","javascript:eliminaEvento('"+getEventId(element)+"')");
            p.innerHTML = "Elimina evento";
        }else{
            link.setAttribute("href","javascript:vediEvento('"+getEventId(element)+"')");
            p.innerHTML = "Vedi evento";
        }
        var button = document.createElement("button");
        button.setAttribute("class","card-btn");
        button.appendChild(p);
        link.appendChild(button);
        upData.appendChild(link);

        var downData = document.createElement("div"); //immagine e bottone
        downData.setAttribute("class","card__content");
        var p = document.createElement("p");
        p.setAttribute("class","card__title text--medium");
        p.innerHTML = element.nome;
        downData.appendChild(p)
        var info = document.createElement("div");
        info.setAttribute("class","card__info");
        var p = document.createElement("p");
        p.setAttribute("class","text--medium");
        p.innerHTML = element.data;
        info.appendChild(p)
        var p = document.createElement("p");
        p.setAttribute("class","card__price text--medium");
        p.innerHTML = element.costo;
        info.appendChild(p)
        downData.appendChild(info)

        card.appendChild(upData);
        card.appendChild(downData);
        list.appendChild(card);
    });

    return list;
}

function getEventId(element){
    var rawId = element.id;
    return rawId.substring(10,rawId.length - 2);
}

function vediEvento(id){
    sessionStorage.setItem("id",id);
    window.location.replace("/evento");
}

function eliminaEvento(id){
    $.ajax({
        url: "/api/deleteEvent",
        method: "DELETE",
        async: false,
        dataType: "text",
        success: function(msg){
            window.location.replace("/homepageAdmin?messaggio=EventoEliminatoConSuccesso");
            console.log(msg);
        },
        error: function(err){
            if(err.status == 200)
                window.location.replace("/homepageAdmin?messaggio=EventoEliminatoConSuccesso");
            else
                window.location.replace("/homepageAdmin?messaggio=Errore nell'eliminazione dell'evento")  
            console.error(err);
        },
        data: {
            "id": id
        },
    });
}

lista();