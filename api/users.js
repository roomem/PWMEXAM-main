const express = require('express');
const router = express.Router();
const admin = require("../static/database/model/admin");
const bcrypt = require('bcrypt');
const passport = require('passport');

router.post('/login',(req,res,next)=>{
passport.authenticate('local',{
    successRedirect : '/homepageAdmin',
    failureRedirect: '/login',
    failureFlash : true
})(req,res,next)
})

//logout
router.delete("/logout", function (req, res) {
    req.logout(function(err) {
        if (err) { return next(err); }
        req.flash('success_msg','Disconesso con successo');
        res.redirect('/login');
    });
});


const addAdmin = async (name,surname,email,password) => {

    //check se l'admin esiste gia' 
    const existingAdmin = await admin.findOne({
        email: email
    });
    
    if(existingAdmin)
        return false;


    //hash della password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);
    
    const newAdmin = new admin({
        email: email,
        name: name,
        surname: surname,
        password: hashedPassword
    });

    try{
        await newAdmin.save();
    }
    catch(err){
        console.log(err);
        return false;
    }

    return true;
};

// console.log(addAdmin("Marco","Romegioli","prova@gmail.com","ciao"));

module.exports  = router;