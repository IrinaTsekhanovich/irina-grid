const express = require('express');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const path = require('path')
const publicPath = path.join(__dirname, '/public')
const passport = require('./passport')
const app = express()
const port = process.env.PORT || 8080;
const ans = require('./ans')
const User = require('./User')
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(__dirname))
var request = require('request');
const urlencodedParser = bodyParser.urlencoded({extended: false});

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(publicPath))

app.use(express.static('public'));

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
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

// var options_start = {
//   url: 'https://management.azure.com/subscriptions/e00ce7ad-d0f0-4b34-b555-67f372acf5ad/resourceGroups/IrinaGrid/providers/Microsoft.Compute/virtualMachines/test-grid/start?api-version=2019-03-01',
//   method: 'POST',
//   headers: {
//     'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IkJCOENlRlZxeWFHckdOdWVoSklpTDRkZmp6dyIsImtpZCI6IkJCOENlRlZxeWFHckdOdWVoSklpTDRkZmp6dyJ9.eyJhdWQiOiJodHRwczovL21hbmFnZW1lbnQuY29yZS53aW5kb3dzLm5ldC8iLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC9iNzkxNmI3Yi1hMzYyLTRmOGItOTI5Ny01MzAyNWUyYzU4MWUvIiwiaWF0IjoxNTc2NTQwNTY1LCJuYmYiOjE1NzY1NDA1NjUsImV4cCI6MTU3NjU0NDQ2NSwiYWNyIjoiMSIsImFpbyI6IkFVUUF1LzhOQUFBQXJEaVNNSmVZOUltbDlrRUlkNVFYT0ZlQWg2MGhpN1RuSXdOc2VaRjhiYXJiZktlZ01neDZtdWw5OXZpVzljV2cydHorRzZlSlRPNGNUZkpPZGt0amRRPT0iLCJhbHRzZWNpZCI6IjE6bGl2ZS5jb206MDAwM0JGRkRENTUxN0ZDNSIsImFtciI6WyJwd2QiXSwiYXBwaWQiOiI3ZjU5YTc3My0yZWFmLTQyOWMtYTA1OS01MGZjNWJiMjhiNDQiLCJhcHBpZGFjciI6IjIiLCJlbWFpbCI6ImlyYS50c2VraGFub3ZpY2hAeWFuZGV4LnJ1IiwiZmFtaWx5X25hbWUiOiLQptC10YXQsNC90L7QstC40YciLCJnaXZlbl9uYW1lIjoi0JjRgNC40L3QsCIsImdyb3VwcyI6WyIyNDczMDFiMC00MTA3LTQ2ZmYtYWZmYi1hNmRjNzMxMTRjNjkiXSwiaWRwIjoibGl2ZS5jb20iLCJpcGFkZHIiOiIxOTUuNzAuMjE1LjIxNSIsIm5hbWUiOiLQmNGA0LjQvdCwINCm0LXRhdCw0L3QvtCy0LjRhyIsIm9pZCI6IjEyYmU0NjAwLTZlMmMtNDRjZi1hNmI3LWQyMmU2YTYzYjBlNCIsInB1aWQiOiIxMDAzMjAwMDMzQTFDODE1Iiwic2NwIjoidXNlcl9pbXBlcnNvbmF0aW9uIiwic3ViIjoiZkNsdk41cDRYeF9sOG5iRTF1OFM2dnh0eFhPY0RubUdJZDJDbG9zOWNhNCIsInRpZCI6ImI3OTE2YjdiLWEzNjItNGY4Yi05Mjk3LTUzMDI1ZTJjNTgxZSIsInVuaXF1ZV9uYW1lIjoibGl2ZS5jb20jaXJhLnRzZWtoYW5vdmljaEB5YW5kZXgucnUiLCJ1dGkiOiJOWXBTa1l0UmtFS0xLUlh4TWR3M0FBIiwidmVyIjoiMS4wIiwid2lkcyI6WyI2MmU5MDM5NC02OWY1LTQyMzctOTE5MC0wMTIxNzcxNDVlMTAiXX0.FuZEN-loOrUsjvc5orY8CZFoPuUgQKN94W6EH24HgIM7J22gs7p3hbBYObB5wF5h3NRbDr8lExrGBsVhja_tRfZELdR0rTp98jBEJGm_9qVhmwfvd5BMuf9Ly1Ky_mdxUL2REqr8aQI2E_wIK0gZhP1smsroqf-Pa3E-iKV56PULk5nWpbPCuJTjA54t6kGPW_O2m_yBHyWZ_3uW0lK2g9KkHgmO8Xve-unPN-A-hT8C288F09dZDl32rQAHgMquUMSNcDfv1nrMSg1lAVDjwKF2wVn5rp5OSYbOXfrv0l19F-N_Lh2nzJLU1v0JRKfEV7oCAewUUcvtuTDx9KMV4Q',
//     'Content-type': 'application/json'
//   }
// }

// var options_stop = {
//   url: 'https://management.azure.com/subscriptions/e00ce7ad-d0f0-4b34-b555-67f372acf5ad/resourceGroups/IrinaGrid/providers/Microsoft.Compute/virtualMachines/test-grid/deallocate?api-version=2019-03-01',
//   method: 'POST',
//   headers: {
//     'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IkJCOENlRlZxeWFHckdOdWVoSklpTDRkZmp6dyIsImtpZCI6IkJCOENlRlZxeWFHckdOdWVoSklpTDRkZmp6dyJ9.eyJhdWQiOiJodHRwczovL21hbmFnZW1lbnQuY29yZS53aW5kb3dzLm5ldC8iLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC9iNzkxNmI3Yi1hMzYyLTRmOGItOTI5Ny01MzAyNWUyYzU4MWUvIiwiaWF0IjoxNTc2NTQwOTU1LCJuYmYiOjE1NzY1NDA5NTUsImV4cCI6MTU3NjU0NDg1NSwiYWNyIjoiMSIsImFpbyI6IkFVUUF1LzhOQUFBQU03bEVNWFljZlV4MHZnK3oweE5DM0V5VlBCQnVTWU5CU05aTjhDVDNZTmpzUHpucDJTbmdSbHAyY0h4WEVCaXFsRUFLRTYwNkZpVkVTQlRua1dhQjV3PT0iLCJhbHRzZWNpZCI6IjE6bGl2ZS5jb206MDAwM0JGRkRENTUxN0ZDNSIsImFtciI6WyJwd2QiXSwiYXBwaWQiOiI3ZjU5YTc3My0yZWFmLTQyOWMtYTA1OS01MGZjNWJiMjhiNDQiLCJhcHBpZGFjciI6IjIiLCJlbWFpbCI6ImlyYS50c2VraGFub3ZpY2hAeWFuZGV4LnJ1IiwiZmFtaWx5X25hbWUiOiLQptC10YXQsNC90L7QstC40YciLCJnaXZlbl9uYW1lIjoi0JjRgNC40L3QsCIsImdyb3VwcyI6WyIyNDczMDFiMC00MTA3LTQ2ZmYtYWZmYi1hNmRjNzMxMTRjNjkiXSwiaWRwIjoibGl2ZS5jb20iLCJpcGFkZHIiOiIxOTUuNzAuMjE1LjIxNSIsIm5hbWUiOiLQmNGA0LjQvdCwINCm0LXRhdCw0L3QvtCy0LjRhyIsIm9pZCI6IjEyYmU0NjAwLTZlMmMtNDRjZi1hNmI3LWQyMmU2YTYzYjBlNCIsInB1aWQiOiIxMDAzMjAwMDMzQTFDODE1Iiwic2NwIjoidXNlcl9pbXBlcnNvbmF0aW9uIiwic3ViIjoiZkNsdk41cDRYeF9sOG5iRTF1OFM2dnh0eFhPY0RubUdJZDJDbG9zOWNhNCIsInRpZCI6ImI3OTE2YjdiLWEzNjItNGY4Yi05Mjk3LTUzMDI1ZTJjNTgxZSIsInVuaXF1ZV9uYW1lIjoibGl2ZS5jb20jaXJhLnRzZWtoYW5vdmljaEB5YW5kZXgucnUiLCJ1dGkiOiJNcTM0SHd6R3QwQ21TMkZrQnFRMkFBIiwidmVyIjoiMS4wIiwid2lkcyI6WyI2MmU5MDM5NC02OWY1LTQyMzctOTE5MC0wMTIxNzcxNDVlMTAiXX0.Ix03tvFGdKAKAumBnkSA_tyAwIc96JL2Cp51xlRqyGx1WDGI5OWOnwCN5knFyh34TSLs4noXOD6K-BjwxpyvKkkmFXq81GzRyLhoWcXZ6WK1C2fg9MJBKyLvH-rMj6JVLBDfhXEdy4KScX0tC-ogWLesqY5ezc4LbPoFb0LM0EDN7UJCviSQQ18Id3wJS7mEkWNmNEc_rH7tOcXZgBBKqWCqxhoXTJXNU3vGEGh8UF7dyVKsnpzaerK_XXTwAwE-YT0LAguHGFzaOQbTxQ-hiX_CGTURLb09OFwTSBsryWyrMpiU-Q5PKnXxfWY7RtCnIg0o-bWtg45OZ3zTQ-f8pw',
//     'Content-type': 'application/json'
//   }
// }


// app.post('/calculate', (req, res) => {
//   request(options_start, function (error, response, body) {
//     console.log('Running virtual machine');
//     var exec = require('node-ssh-exec');
    
//     var config = {
//       host: '104.214.216.227',
//       username: 'irra',
//       password: 'Qwerty123456'
//     }
    
//     n = req.body.number;
//     for(let i = 2; i <= n; ++i){
//       Prod = Prod * i
//     }
//     exec(config, command, function (error, response) {
//       console.log(response);
//       request(options_stop, function (error, response, body) {
//         console.log('Stopping virtual machine');
//       });
//     });
//     console.log(Prod) 
//     res.redirect('/result')
//   })
// });

app.post('/calculate', (req, res) => {
  an.workVM(req.user.vkontakteId, req.body.number)
  res.redirect('/')
});


app.post('/result',(req,res) => {
  res.redirect('/');
});

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