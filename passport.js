const passport = require('passport')
const VKontakteStrategy = require('passport-vkontakte').Strategy;
const UserModel = require('./User')

passport.use(new VKontakteStrategy({
    clientID:     7249444,
    clientSecret: "TOfMrKOGcCW70blnqm1M",
    callbackURL:  "https://irina-grid.azurewebsites.net/auth/vkontakte/callback"
  },
  function(accessToken, refreshToken, params, profile, done) {
    UserModel.findOne({ vkontakteId: profile.id }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        let user = UserModel.create({vkontakteId : profile.id})
      } 
      return done(null, user);
    })
  }
));

passport.serializeUser(function(user, done) {
  console.log('Сериализация: ', user)
  done(null, user.vkontakteId)
})

passport.deserializeUser(async function(id, done) {
  try{
    const user = await UserModel.findOne({ vkontakteId: id})
    if(!user) {
      return done(null, false)
    }
    else{
      return done(null, user)
    }
  }
  catch(err){
    return done(err)
  }
});

module.exports = passport