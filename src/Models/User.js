const mongoose = require('mongoose')
const {Schema, model}= mongoose

const userShcema = new Schema({
    name: String,
    lastName: String,
    ci: String,
    phoneNumbre: String,
    direction: String,
    age: String
})

userShcema.set('toJSON',{
    transform : (document, returnedObject)=>{
       returnedObject.id = returnedObject._id
       delete returnedObject._id
       delete returnedObject.__v
   }
})

const User = model('User', userShcema)

module.exports = User