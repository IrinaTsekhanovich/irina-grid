const express = require('express')
const app = express()
const port = process.env.PORT;
const bodyParser = require('body-parser');
const Auth0Strategy = require('passport-auth0');

app.use(express.static('public'))

require('dotenv').config()

app.get('/', (req, res) => res.sendFile(__dirname + '/public/index.html'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

app.post('/post', (req, res) => {
    console.log(req.body);
    res.send('Success');
})

// Configure Passport to use Auth0
const strategy = new Auth0Strategy(
    {
        domain: process.env.AUTH0_DOMAIN,
        clientID: process.env.AUTH0_CLIENTID,
        clientSecret: process.env.AUTH0_CLIENTID,
        callbackURL:
            process.env.AUTH0_CALLBACK_URL || '/callback'
    },
    function (accessToken, refreshToken, extraParams, profile, done) {
        console.log(profile)
        let userid = profile.id;
        client.query('select count(client_id) as count from clients where client_id=$1',[userid], (err,res) => {
            if (err) {
                console.log(err.stack)
            }

            console.log(res.rows[0].count)
            if (res.rows[0].count == 0) {
                let lname = profile.name.familyName;
                let fname = profile.name.givenName;
                let ct = 1;
                client.query('insert into clients (client_id,last_name,first_name,city_id) values ($1,$2,$3,$4)', [userid, lname, fname, ct], (err, res) => {
                    if (err) {
                        console.log(err.stack)
                    }
                })
            }
            })
        // accessToken is the token to call Auth0 API (not needed in the most cases)
        // extraParams.id_token has the JSON Web Token
        // profile has all the information from the user
        return done(null, profile)
    }
)
passport.use(strategy);


app.use(session(sess));
app.use(passport.initialize());
app.use(passport.session());
//Внизу что-то интересное
passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

app.get('/login', passport.authenticate('auth0', {
    scope: 'openid email profile'
}), function (req, res) {
    res.redirect('/');
});

app.get('/callback', function (req, res, next) {
    passport.authenticate('auth0', function (err, user, info) {
        if (err) { return next(err); }
        if (!user) { return res.redirect('/login'); }
        req.logIn(user, function (err) {
            if (err) { return next(err); }
            const returnTo = req.session.returnTo;
            delete req.session.returnTo;
            res.redirect(returnTo || '/');
        });
    })(req, res, next);
});

app.get('/logout',(req,res)=>{
    req.logout()
    res.redirect('/')
});



app.get('/',(req, res) =>{
    console.log(req.isAuthenticated())
    res.sendFile(__dirname + '/public/index.html')
})
app.get('/index.html',(req, res) =>{
    console.log(req.isAuthenticated())
    res.sendFile(__dirname + '/public/index.html')
});

const auth = (req, res, next) => {
    if (req.isAuthenticated()) {
        next()
    }
    else {
        return res.redirect('/login')
    }
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
extended: true
}));