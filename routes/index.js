/*** MVC ROUTES ***/

//LOGIN
exports.login = function(req, res){
	res.render('signin', { title: 'Sign In'});
};

//SESSION
exports.session = function(req, res, next){
	req.session.data = req.params.name;
  res.redirect('/');
};

//404 ERROR PAGE
exports.errorpage = function(req, res, next){
  res.render('errorpage', { title: 'Error', status: 404, url: req.url });
};

// ERROR PAGE

//VIEWALLPOSTS
//exports.viewallpost = function(req, res){
//    if (req.headers['x-requested-with'] == 'XMLHttpRequest') {
//    	res.send({r:'success'});
//    } else {
//    	console.log('not json');
//			res.redirect('/');
//    }
//};