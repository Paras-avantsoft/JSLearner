/**
 * A simple API hosted under localhost:8080/books
 */
var express = require('express');
var app = express();
var Twit = require('twit');
var client = null;

function connectToTwitter() {
    client = new Twit({
        consumer_key: '<your consumer key>',
        consumer_secret: '<your consumer secret>',
        access_token: '<your access token>',
        access_token_secret: '<your access token secret>'
    });
};

//get the app to connect to twitter.
connectToTwitter();

//additional setup to allow CORS requests
var allowCrossDomain = function(req, response, next) {
    response.header('Access-Control-Allow-Origin', "http://localhost");
    response.header('Access-Control-Allow-Methods', 'OPTIONS, GET,PUT,POST,DELETE');
    response.header('Access-Control-Allow-Headers', 'Content-Type');
    if ('OPTIONS' == req.method) {
        response.sendStatus(200);
    } else {
        next();
    }
};

// app.configure(function() {
//     app.use(allowCrossDomain);

//     //Parses the JSON object given in the body request
//     app.use(express.bodyParser());
// });

/**
 * Returns the twitter timeline for the current user
 **/
app.get('/timeline', function(request, response) {
    response.header('Access-Control-Allow-Origin', '*');
    client.get('statuses/home_timeline', {}, function(err, reply) {
        if (err) {
            console.log(err);
            response.sendStatus(404);
        }
        if (reply) {
            response.json(reply);
        }
    });
});

//start up the app on port 8080
app.listen(8080);
