const moongoose = require("mongoose");


const urlMongoDB = "mongodb://127.0.0.1:27017/webapp";

moongoose.connect(urlMongoDB,{useNewUrlParser: true,useUnifiedTopology: true}).then( () => {
    console.log("Database MongoDB connesso con successo");
}).catch(err => {
    console.log("Errore nella connessione al database");
    console.log(err);
});


