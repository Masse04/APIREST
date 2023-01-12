const mongoose = require('mongoose')
let UserSchema = mongoose.Schema({
    nom : {
        type : String,
        require : true,
        unique : true
    },
    age : Number
})
module.exports = mongoose.model('Users',UserSchema)