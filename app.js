const express = require('express')
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const path = require('path')
const publicPath = path.join(__dirname, '/public')
const passport = require('./passport')
const app = express()
const port = process.env.PORT || 8080;



app.set("view engine", "ejs")

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(publicPath))

app.use(express.static('public'))

app.use(
    session({
      secret: 'kdsfakiragribfdasfsairagrib',
      store: new FileStore(),
      cookie: {
        path: '/',
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
      },
      resave: false,
      saveUninitialized: false,
    })
  );

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  console.log(req.isAuthenticated())
  res.render('index', {Auth : req.isAuthenticated()}) 
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

app.post('/post', (req, res) => {
    console.log(req.body);
    res.send('Success');
})

app.get('/auth/vkontakte',
  passport.authenticate('vkontakte'),
  function(req, res){
  });

app.get('/auth/vkontakte/callback',
  passport.authenticate('vkontakte', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/');
  });


  app.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/');
});
