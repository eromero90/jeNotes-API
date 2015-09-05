var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var notes = require('./app/routers/notes');
var todos = require('./app/routers/todos');
var mongoose = require('mongoose');
var config = require('./app/config.json');


mongoose.connect(config.url_db);

app.use(bodyParser.urlencoded({'extended':'true'}));

app.use('/api/notes',notes.router);

app.use('/api/todos',todos.router);

app.listen(8088);

console.log('Server started on port 8088');