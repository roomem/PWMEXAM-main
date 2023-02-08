const router = require('express').Router();

router.get("/onLoad", async (req,res) => {
    var id = req.query.id;

    const eventiPresenti = await evento.findOne({
        _id: "ObjectId('"+id+"')"
    });

    console.log(eventiPresenti)

    if(eventiPresenti == null || eventiPresenti == undefined)
        return res.status(400).send("Nessun evento disponibile");

    console.log("/seeEvent eseguita con successo");
    res.status(200).send(eventiPresenti);


});

module.exports = router;