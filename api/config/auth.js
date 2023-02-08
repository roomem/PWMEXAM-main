module.exports = {
    //middleware----
    isLoggedIn : function(req,res,next) {
        if(req.isAuthenticated()) {
            return next();
        }
        req.flash('error_msg' , "Effettua il login per accedere a quest'area");
        res.redirect('/login');
    }
}

