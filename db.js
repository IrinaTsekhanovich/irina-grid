const mongoose = require('mongoose')


mongoose.connect(
    'mongodb://dbuser:pass1234@ds016098.mlab.com:16098/griddb',
    { 
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
      }
)

const connection = mongoose.connection

connection.on('error', function(){
    console.log('Connect error')
})

connection.once('open', async function(){
    console.log('MongoDB successfully connected')
})

module.exports = connection