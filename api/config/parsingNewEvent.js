function parseForm(event){

    var serializedArray = $("form").serializeArray();

    var o = {};

    o.nome = serializedArray[0].value;
    o.descrizione = serializedArray[1].value;
    o.tipologia = serializedArray[2].value;
    o.provincia = serializedArray[3].value;
    o.posizione = serializedArray[4].value;
    o.eta = serializedArray[5].value;
    o.dress_code = serializedArray[6].value;
    o.orario = serializedArray[7].value;
    o.data = serializedArray[8].value;
    o.costo = serializedArray[9].value;

    if($("input[name='immagine']")[0].files.length > 0){
        o.immagine = sendPhoto($("input[name='immagine']")[0].files[0])
    }

    $.ajax({
        type: "POST",
        url: "/api/addEvent",
        dataType: "json",
        success: function(msg){
            window.location.replace("/homepageAdmin?messaggio=EventoAggiuntoConSuccesso");
            console.log(msg);
        },
        error: function(err){
            if(err.status == 200)
                window.location.replace("/homepageAdmin?messaggio=EventoAggiuntoConSuccesso");
            else
                window.location.replace("/creaEvento?messaggio=Errore nell'aggiunta dell'evento")  
        },
        data: o,
        async: true
    });


    return false;
}

function sendPhoto(photo){
    var fileName = "";
    var formData = new FormData();

    formData.append("image",photo);

    $.ajax({
        url: "/api/insertImage",
        method: "POST",
        processData: false, //jquery non converte i dati in stringa
        contentType: false,
        data: formData,
        async: false, //
        success: function(data){
            fileName = data;
        },
        error: function(data){
            console.error(data);
        }
    });

    return fileName;
}


$("form").submit(parseForm);