const mongoose = require('mongoose')

const connectionString = process.env.DB_URI
mongoose.connect(connectionString, {
            useNewUrlParser:true,
            useUnifiedTopology:true,
            useFindAndModify:true,
            useCreateIndex:true,
        } )
        .then(() => {
        console.log('Database Connected')
    }).catch(err =>{
        console.error(err)
    })
