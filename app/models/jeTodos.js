var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TodoSchema = new Schema({
	todo: {type : String, default: ''},
	active: {type : Boolean, default: true}
});

var TodosBox = new Schema({
	todos: [TodoSchema],
	creationDate : {type : Date, default : Date.now},
	lastUpdate : {type : Date, default : Date.now}
});

module.exports = mongoose.model('todo', TodosBox);