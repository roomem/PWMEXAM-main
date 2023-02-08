const router = require('express').Router();
const multer = require("multer");
const ObjectId = require('mongodb').ObjectId;

const FOLDER_UPLOAD = "./static/uploads/";
const evento = require("../../static/database/model/evento");

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,FOLDER_UPLOAD);
    },
    filename: function(req,file,cb){
        cb(null,file.fieldname+Date.now().toString()+".jpg");
    }
});

const fileFilter = (req,file,cb) => {
    if(file.mimetype === "image/jpeg" || file.mimetype === "image/png")
        cb(null,true);
    else
        cb(new Error("Il file non è jpg o png!"),false);
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 1000 * 1000 * 10 //10MB
    }
});


var upload_image = upload.single("image");

router.post("/addEvent", async (req,res) => {

    console.log(req.body);
    var inserimento = req.body;

    inserimento._id = "ObjectId('"+new ObjectId()+"')";

    var newEvent = new evento(inserimento);

    try{
        await newEvent.save();
        req.flash('success_msg','Evento aggiunto con successo!');
        return res.status(200).send("Inserimento effettuato!");
    }
    catch(err){
        console.log(err);
        req.flash('error_msg' , "Errore nell'aggiunta dell'evento!");
        return res.status(400).send("Errore!");
    }
});

router.post("/insertImage", async (req,res) => {
    upload_image(req,res, async (err) =>{
        if(err)
            return res.status(400).json({message: err.message});
        return res.status(200).send(req.file.filename);
    });
});


module.exports = router;