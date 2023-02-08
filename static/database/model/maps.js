const moongoose = require('mongoose');

const maps = new moongoose.Schema({
    _id: {type: String},
    nome: {type: String, required: true },
    immagine: {type: String, required: false},
    descrizione: {type: String, required: true},
    tipologia: {type: String, required: true },
    provincia: {type: String, required: true },
    posizione: {type: String, required: true },
    eta: {type: String, required: true },
    dress_code: {type: String, required: true },
    orario: {type: String, required: true },
    data: {type: String, required: true },
    costo: {type: String, required: true },
});

module.exports = moongoose.model("evento",evento);