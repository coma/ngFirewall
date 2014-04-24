var express = require('express');
var app     = express();

app.use(express.static(__dirname + '/web'));
app.use('/dist', express.static(__dirname + '/../dist'));

app.listen(1337);