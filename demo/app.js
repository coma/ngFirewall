var bodyParser = require('body-parser');
var express    = require('express');
var app        = express();

var users      = {
    'user:1234' : ['user'],
    'admin:1234': ['user', 'admin']
};

app.use(bodyParser());
app.use(express.static(__dirname + '/web'));
app.use('/dist', express.static(__dirname + '/../dist'));

app.post('/login', function(request, response) {

    var key = request.body.username + ':' + request.body.password;

    if (users.hasOwnProperty(key)) {

        response.send({
            roles: users[key]
        });
    }

    response.status(403).send();
});

app.get('/secret', function(request, response) {

    response.send();
});

app.listen(1337);