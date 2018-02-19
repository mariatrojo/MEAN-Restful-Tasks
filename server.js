var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/helloAngular/dist'));

mongoose.connect('mongodb://localhost/RestfulTaskAPI');
mongoose.Promise = global.Promise;

var TaskSchema = new mongoose.Schema ({
	title: { type: String },
	description: { type: String, default: ' ' },
	completed: { type: Boolean, default: false }
	}, { timestamps: true }
);

mongoose.model('Task', TaskSchema);
var Task = mongoose.model('Task');


//Retrieve all tasks
app.get('/tasks', function(req, res) {
	Task.find({}, function(err, tasks) {
		if(err){
			console.log("Returned error", err)
		} else {
			res.json({message: "Success", data: tasks})
		}
	})
})
//Retrieve task by id
app.get('/tasks/:id', function(req, res) {
	Task.find({_id: req.params.id}, function(err, results) {
		if (err) {
			console.log('Retrieve ID error', err)
		} else {
			res.json({data: results})
		}
	})
})
//Create a task
app.post('/tasks', function(req, res) {
	var task = new Task(req.body);
	task.save(function(err) {
		if (err) {
			console.log('New task error', err)
		} else {
			res.json({message: 'Successfully added task'})
		}
	})
})

//Update task by id
app.put('/tasks/:id', function(req, res) {
	Task.update({_id: req.params.id}, {$set: {title: req.body.title, description: req.body.description, completed: req.body.completed}}, {multi: false}, function(err, results) {
		if (err) {
			console.log('Update error', err);
			res.json({message:'Error',error:err});
		} else {
			res.json({message:'Success'});
		}
	})
})
//Delete task by id
app.delete('/tasks/:id', function(req, res) {
	Task.remove({_id: req.params.id}, function(err, results) {
		if (err) {
			console.log('Delete error', err)
		} else {
			res.json({message:'Success delete'});
		}
	})
})


app.listen(8000, function() {
	console.log("Restful Task API listening on port 8000");
})