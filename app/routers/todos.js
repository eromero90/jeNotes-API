var express = require('express');
var router = express.Router();
var todo = require('../models/jeTodos.js');

router.get('/',function(req,res){
	todo.find({},function(err,jsTodos){
		if(err) {
			console.log(err);
			res.status(500);
			res.json({status:'error'});
		} else {
			res.status(200);
			res.json(jsTodos);
		}
	});
});

router.post('/',function(req,res){
	todo.create({
		todos: JSON.parse(req.body.todos),
		creationDate : req.body.creationDate
	},function(err, todo){
		if(err) {
			console.log(err);
			res.status(500);
			res.json({status:'error'});
		} else {
			res.status(200);
			res.json({status:'ok', data: todo});
		}
	});
});

router.get('/:id',function(req,res){
	todo.find({ _id: req.params.id },function(err,todo){
		if(err && err.kind !== 'ObjectId'){
			console.log(err);
			res.status(500);
			res.json({status:'error'});
		} else {
			if(todo) {
				res.status(200);
				res.json(todo);
			} else {
				res.status(404);
				res.json({status:'idNotFound'});
			}
		}
	});
});

router.put('/:id', function (req, res) {
	todo.findByIdAndUpdate({ _id: req.params.id }, { 
		$set: { todos: JSON.parse(req.body.todos), lastUpdate : new Date()}
	}, function (err, todo) {
		if(err && err.kind !== 'ObjectId'){
			console.log(err);
			res.status(500);
			res.json({status:'error'});
		} else {
			if(todo) {
				res.status(200);
				res.json({status:'ok', data: todo});
			} else {
				res.status(404);
				res.json({status:'idNotFound'});
			}
		}
	});
});

router.delete('/:id',function(req,res){
	todo.remove({ _id: req.params.id },function(err, removed){
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