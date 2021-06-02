const mongoose = require('mongoose')

// parent 1 is the reffering user
const userSchema = mongoose.Schema({
    name :{type:String,require:true},
    paren1Id:{type:mongoose.Schema.Types.ObjectId},
    paren2Id:{type:mongoose.Schema.Types.ObjectId},
    paren3Id:{type:mongoose.Schema.Types.ObjectId},
})

module.exports = mongoose.model('user',userSchema)
