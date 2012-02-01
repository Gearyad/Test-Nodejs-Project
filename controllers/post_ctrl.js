var PostDb = require('../models').PostSchema;

//INSERT
exports.insert = function(req, res){
	var data = {
		_author: '4f168466e021e9e20f000002',
		_title: 'Title of the Post ' + req.params.content,
		_body: 'Hello world. I successfully saved my ' + req.params.content +' post!!!'
		};
		var insertData = new PostDb(data);
		insertData.save(function(err, done){
			if(err){
				res.send("Error");
			}else{
				res.send("Saved");
			}
		});
};
//function
function operation(req, res){
	var operation = req.params.operation;
	var http_method = req.method;
	
	switch(operation){
		case "viewAll":
			PostDb.find({}).populate('_author', ['_name']).desc('_datePosted').run(function(err, result){
				res.render('index', { title: 'Simple Blog Test Project', blog:result, auth: req.session.auth});
			});
			break;
		case "view":
		var blogId = req.params.id;
			if(blogId){
				PostDb.findById(blogId).populate('_author', ['_name']).run(function(err, result){
					res.render('viewpost', { title: 'Simple Blog Test Project', blog:result});
				});
			}else{
				next();
			}
			break;
		case "add":
			var blogId = req.params.id;
			if(http_method == "GET"){
				res.render('post', {title: 'Post a blog'})
			}else{
				var post = req.body.post;
				var data = {
					_author: req.session.userid,
					_title: post.title,
					_body: post.body
					};
					var insertData = new PostDb(data);
					insertData.save(function(err, done){
						if(err){
							res.send("Error");
						}else{
							res.send("Successfully saved");
						}
					});
			}
			break;
		default:
			next();
	}
}
	
//FIND && HOMEPAGE
exports.findAll = function(req, res){
	req.params.operation = "viewAll";
	operation(req, res);
};

//OPERATION
exports.operation = function(req, res, next){
	if(req.session.auth){
		operation(req, res);
	}else if(req.params.operation == "view"){
		operation(req, res);
	}else{
		res.redirect("/signin");
	}
};