const router = require('express').Router();

const evento = require("../static/database/model/evento");

router.get("/getList", async (req,res) => {
    const eventiPresenti = await evento.find({});
    console.log(eventiPresenti)
    var flagParams = false;
    var length;
    var documentUrl = req.header("documentUrl");
    console.log(req.header("documentUrl"))

    if(eventiPresenti == null || eventiPresenti == undefined){
        return res.status(400).send("Nessun evento disponibile");
    }

    const response = [];

    if(documentUrl.includes("http://127.0.0.1:3001/eventi")) {
        length = eventiPresenti.length;
        if(documentUrl.includes("http://127.0.0.1:3001/eventi?")){
            params = parseURLParams(documentUrl);
            console.log("params:\n" + params.luogo);
            console.log("params:\n" + params.tipo);
            flagParams = true;
        }
    }else{
        length = 7;
      if(eventiPresenti.length < length){
        length = eventiPresenti.length;
      }  
    }

    for(var i=0;i<length;i++){
        var element = eventiPresenti[i];
        if(flagParams){
            if(params.luogo!="" && params.tipo!=""){
                if(element.provincia!=params.luogo || element.tipologia!=params.tipo){
                    continue;
                }
            }else if(params.luogo!="" && params.tipo==""){
                if(element.provincia!=params.luogo){
                    continue;
                }
            }else if(params.luogo=="" && params.tipo!=""){
                if(element.tipologia!=params.tipo){
                    continue;
                }
            }
        }
        response.push({
            nome: element.nome,
            immagine: "/uploads/" + element.immagine,
            id: element._id,
            descrizione: element.descrizione,
            tipologia: element.tipologia,
            provincia: element.provincia,
            posizione: element.posizione,
            eta: element.eta,
            dress_code: element.dress_code,
            orario: element.orario,
            data: element.data,
            costo: element.costo,
        });
    }

    if(response.length<1){
        return res.status(400).send("Nessun evento corrispondente ai filtri immessi");
    }

    console.log("/getList eseguita con successo");
    res.status(200).send(response);

});

function parseURLParams(url) {
    var queryStart = url.indexOf("?") + 1,
        queryEnd   = url.indexOf(" ") + 1 || url.length + 1,
        query = url.slice(queryStart, queryEnd - 1),
        pairs = query.replace(/\+/g, " ").split("&"),
        parms = {}, i, n, v, nv;

    if (query === url || query === "") return;

    for (i = 0; i < pairs.length; i++) {
        nv = pairs[i].split("=", 2);
        n = decodeURIComponent(nv[0]);
        v = decodeURIComponent(nv[1]);

        if (!parms.hasOwnProperty(n)) parms[n] = [];
        parms[n].push(nv.length === 2 ? v : null);
    }
    return parms;
}

module.exports = router;
