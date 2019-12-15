const express = require('express')
const app = express()
const port = process.env.PORT;
const bodyParser = require('body-parser');

app.use(express.static('public'))

require('dotenv').config()

app.get('/', (req, res) => res.sendFile(__dirname + '/public/index.html'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

app.post('/post', (req, res) => {
    console.log(req.body);
    res.send('Success');
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
extended: true
}));