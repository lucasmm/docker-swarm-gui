const express = require('express');
const app = express();

var jobExecution = require('./src/job/jobExecution');
var data = require('./src/data');

jobExecution();

app.get('/', function (req, res) {
    res.send(data);
});

var server = app.listen(8080, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)

});
