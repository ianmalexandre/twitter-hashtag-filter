var Twit = require('twit');

var T = new Twit({
    consumer_key:         '4Qcz4xTc7IuvyjBMCqrk6ZeTZ',
    consumer_secret:      'zFLH8E2V4DU67t6TR325CTBVBBUQoMCUefd0J1gDaR25Iwzpa8',
    access_token:         '1377019740460290052-TD4qEdMjokGjlKpjIslRwkkIoRFcPy',
    access_token_secret:  'BB1Mj5Kb2F47J7WJkFrLfxN1RyEwN8FGWqKRT5oxd34ru',
    timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
  })

T.get('search/tweets', { q: 'banana since:2011-07-11', count: 100 }, function(err, data, response) {
console.log(data)
})