var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NotesBox = new Schema({
	note : {type : String, default: ''},
	creationDate : {type : Date, default : Date.now},
	lastUpdate : {type : Date, default : Date.now}
});


module.exports = mongoose.model('note',NotesBox);