const mongoose = require('mongoose')
const  {Schema, model } = mongoose

const noteSchema = new Schema({
    content: String,
    date: Date,
    important: Boolean
})

noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Note = model ('Note', noteSchema)

const note = new Note({
    content: "Tengo miedo",
    date: new Date(),
    important: false
})

//note.save()
//    .then(result => {
//        mongoose.connection.close()
//        console.log(result)
//    })
//    .catch(err => {
//        console.error(err)
//    })
//
//
module.exports = Note