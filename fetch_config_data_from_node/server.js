/**
 * A simple API hosted under localhost:8080/books
 */
var express = require('express');
var app = express();
var configId = 100;

function getConfig(id) {
    for (var i = 0; i < config.length; i++) {
        if (config[i].id === id) {
            return config[i];
        }
    }
    return null;
}

// function removeConfig(id) {
//     var configNo = 0;
//     for (var i = 0; i < config.length; i++) {
//         if (config[i].id === id) {
//             configNo = i;
//         }
//     }
//     config.splice(configNo, 1);
// }

// app.configure(function() {
//     //Parses the JSON object given in the body request
//     app.use(express.bodyParser());
// });

var config = [{
    id: 001,
    name: 'Jarvaze Silent',
    ram: '32 GB',
    cpu: 'Intel i20 3rd Gen',
    hd: '10 TB'
}, {
    id: 002,
    name: 'Jarvaze Extreme',
    ram: '64 GB',
    cpu: 'Intel i40 2nd Gen',
    hd: '20 TB'
}];

/**
 * HTTP GET /config
 * Should return a list of config
 */
app.get('/config', function(request, response) {
    response.header('Access-Control-Allow-Origin', '*');
    console.log('In GET function..');
    response.json(config);
});

/**
 * HTTP GET /config/:id
 * id is the unique identifier of the book you want to retrieve
 * Should return the task with the specified id, or else 404
 */
app.get('/config/:id', function(request, response) {
    response.header('Access-Control-Allow-Origin', '*');
    console.log('Getting a config with id ' + request.params.id);
    var config = getConfig(parseInt(request.params.id, 10));
    if (config === null) {
        console.log(404);
        response.send(404);
    } else {
        response.json(config);
    }
});

//additional setup to allow CORS requests
var allowCrossDomain = function(req, response, next) {
    response.header('Access-Control-Allow-Origin', "http://localhost");
    response.header('Access-Control-Allow-Methods', 'OPTIONS, GET');
    response.header('Access-Control-Allow-Headers', 'Content-Type');
    if ('OPTIONS' == req.method) {
        response.send(200);
    } else {
        next();
    }
};

// app.configure(function() {
//     app.use(allowCrossDomain);
// });

//start up the app on port 4968
app.listen(4968);