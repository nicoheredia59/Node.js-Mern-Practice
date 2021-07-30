require('dotenv').config()
require('./mongo')

const express = require('express')
const app = express()
const cors = require('cors')
const Note = require('./Models/Note')
const User = require('./Models/User')

app.use(cors())
app.use(express.json())




let notes = []

//Get All Notes
app.get('/api/notes', (request, response) => {
    Note.find({}).then(notes =>{
            response.json(notes)
        })
})

//Find note by id
app.get('api/notes/:id', (request, response, next) => {
    const { id } = request.params

    Note.findById(id).then(note => {
        if(note){
            return response.json(note)
        }else{
            response.status(404).end()
        }
    }).catch(err =>{
        next(err)
    })
})

//Post a note
app.post('/api/notes', (request, response) => {
    const note = request.body

    if(!note.content) {
        return response.status(400).json({
            error: 'required "content" field is missing '
        })
    }

    const newNote = new Note ({
        content: note.content,
        date: new Date(),
        important: note.important || false 
    })

    newNote.save().then(savedNote => {
        response.json(savedNote)
    })
})

//Update a Note
app.put('api/notes/:id', (request, response, next) =>{
    const { id } = request.params
    const note = request.body

    const newNoteInfo = {
        content: note.content,
        important: note.important
    }

    Note.findByIdAndUpdate(id, newNoteInfo, { new: true })
        .then(result => {
            response.json(result)
        })
})


let users = []

//Get All Users
app.get('/api/users', (request, response) => {
    User.find({}).then(users =>{
            response.json(users)
        })
})

//Create a new User
app.post('/api/users', (request, response) => {
    const user = request.body

    if(!user.name) {
        return response.status(400).json({
            error: 'required "content" field is missing '
        })
    }

    const newUser = new User ({
        name: user.name,
        lastName: user.lastName,
        ci: user.ci,
        phoneNumbre: user.phoneNumbre,
        direction: user.direction,
        age: user.age
    })

    newUser.save().then(savedUser => {
        response.json(savedUser)
    })
})






const PORT  = process.env.PORT || 4000
app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`)
})

