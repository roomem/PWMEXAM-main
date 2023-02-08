const router = require('express').Router();

const evento = require("../../static/database/model/evento");

router.delete("/deleteEvent", async (req,res) => {

    var id = req.body.id;
    console.log(id)

    id = "ObjectId('" + id + "')";
    evento.findByIdAndDelete({_id : id}, function(err, event){
        if(!err){
            req.flash('success_msg','Evento eliminato con successo!');
            return res.status(200).send("Evento eliminato con successo!");
        }else{
            console.log(err);
            req.flash('error_msg' , "Errore nell'eliminazione dell'evento!");
            return res.status(400).send("Errore!");
        }
    });
});

module.exports = router;