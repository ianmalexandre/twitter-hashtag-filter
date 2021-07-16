const express = require('express');
const passport = require('passport');
const process = require('process');
const Twit = require('twit');
const axios = require('axios');
const util = require('util');

const routes = express.Router();

const coordReq = require('./utils/requestCordinates');

routes.get('/auth/twitter',
  passport.authenticate('twitter'));

routes.get('/auth/twitter/callback', 
  passport.authenticate('twitter', { failureRedirect: 'http://localhost:3000/' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect(301, "http://localhost:3000/search");
  });

routes.get('/tweets', async function(req, res) {
    let Twitter = new Twit({
      consumer_key:         process.env.TWITTER_CONSUMER_KEY,
      consumer_secret:      process.env.TWITTER_CONSUMER_SECRET,
      access_token:         process.env.TWITTER_ACCESS_TOKEN,
      access_token_secret:  process.env.TWITTER_ACCESS_TOKEN_SECRET,
    })
    let location = [];
    
    Twitter.get('search/tweets', {q: 'covid-19 since:2020-01-01', count: 100}, async function(err, data, response) {
      data.statuses.forEach(element => {
        if (element.user.location !== ''){
          location = [element.user.location, ...location];
        }

      });
      console.log(location);
      // let coordinates = [];
      // let resposta = await Promise.all(location.reduce(async (prev, curr, currIndex, acc) => {
      //   const answer = await coordReq(curr);
      //   return [answer, ...acc];
      // }))
      // console.log(resposta);
      
      // console.log(`coordinates: ${Promise.resolve(resposta)}`);
      // // const ans = await coordReq(location);
      // console.log('============');
      // console.log("Done");

      res.send({
        data: location
      })
    })    
  }
)
module.exports = routes;