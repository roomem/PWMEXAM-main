const moongoose = require('mongoose');

const Admin = new moongoose.Schema({
    name: {type: String, required: true },
    surname: {type: String, required: true},
    email: {type: String, required: true, min: 6,max: 255},
    password: { type: String, required: true, max: 1024, min: 8 },
});

module.exports = moongoose.model("admin",Admin);