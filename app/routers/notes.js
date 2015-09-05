var express = require('express');
var router = express.Router();
var note = require('../models/jeNotes.js');

router.get('/',function(req,res){
	note.find({},function(err,jsNotes){
		if(err) {
			console.log(err);
			res.status(500);
			res.json({status:'error'});
		} else {
			res.status(200);
			res.json(jsNotes);
		}
	});
});

router.post('/',function(req,res){
	note.create({
		note: req.body.note,
		creationDate : req.body.creationDate
	},function(err, note){
		if(err) {
			console.log(err);
			res.status(500);
			res.json({status:'error'});
		} else {
			res.status(200);
			res.json({status:'ok', data: note});
		}
	});
});

router.get('/:id',function(req,res){
	note.find({ _id: req.params.id },function(err,note){
		if(err && err.kind !== 'ObjectId'){
			console.log(err);
			res.status(500);
			res.json({status:'error'});
		} else {
			if(note) {
				res.status(200);
				res.json(note);
			} else {
				res.status(404);
				res.json({status:'idNotFound'});
			}
		}
	});
});

router.put('/:id', function (req, res) {
	note.findByIdAndUpdate({ _id: req.params.id }, { 
		$set: { note: req.body.note, lastUpdate : new Date()}
	}, function (err, note) {
		if(err && err.kind !== 'ObjectId'){
			console.log(err);
			res.status(500);
			res.json({status:'error'});
		} else {
			if(note) {
				res.status(200);
				res.json({status:'ok', data: note});
			} else {
				res.status(404);
				res.json({status:'idNotFound'});
			}
		}
	});
});

router.delete('/:id',function(req,res){
	note.remove({ _id: req.params.id },function(err, removed){
		if(err && err.kind !== 'ObjectId'){
			console.log(err);
			res.status(500);
			res.json({status:'error'});
		} else {
			if(removed) {
				res.status(200);
				res.json({status:'ok'});
			} else {
				res.status(404);
				res.json({status:'idNotFound'});
			}
		}
	});
});

exports.router = router;