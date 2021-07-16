require('dotenv').config();
const express = require('express');
const cors = require('cors')
const passport = require('passport');
const passportTwitter = require('passport-twitter');
const session = require('express-session');

const Strategy = passportTwitter.Strategy;
const routes = require('./routes');

class AppController {
    constructor() {
        this.express = express();

        this.middleware();
        this.routes();
    }

    middleware() {
        this.express.use(cors());
        this.express.use(express.json());
        this.express.use(
            session({
                name: "qid",
                secret: "verySafeSecret",
                resave: false,
                saveUninitialized: false,
                cookie: {
                    httpOnly: true,
                    maxAge: 1000 * 60 * 60 * 24 * 7
                }
            })
        )
        passport.use(new Strategy({
            consumerKey: "4Qcz4xTc7IuvyjBMCqrk6ZeTZ",
            consumerSecret: "zFLH8E2V4DU67t6TR325CTBVBBUQoMCUefd0J1gDaR25Iwzpa8",
            callbackURL: "https://localhost:4000/api/twitter/callback",
          },
          function(token, tokenSecret, profile, cb) {
              console.log(profile);
            // User.findOrCreate({ twitterId: profile.id }, function (err, user) {
            //   return cb(err, user);
            // });
          }
        ));

        this.express.use(passport.initialize());
    }

    routes() {
        this.express.use(routes);
    }
}

module.exports = new AppController().express;