var UserDb = require('../models').AuthorSchema;
//CAPITALIZE
function wordToUpper(str) {
    return (str + '').replace( /(^|[^a-z])([a-z])/g, function (m,p1,p2) {
        return p1+p2.toUpperCase();        
    });
} 

//USER AUTHENTICATE
exports.authenticate = function(req, res, next){
	if(req.session.auth){
		res.redirect('/');
	}else{
		var http_method = req.method;
		
		if(http_method == "GET"){
			if(req.params.type == "success"){
				res.render('signin', { title: 'Sign In', msgType: 'success', message: 'Congratulations, sign up process is successful. You may now sign in.'});
			}else{
				res.render('signin', { title: 'Sign In', msgType: 'error', message: ''});
			}
		}else{
			var query = {
				_email: req.body.username,
				_password: req.body.password
			};
			var rememberme = req.body.checked;
			UserDb.find({}).where('_email', req.body.username).where('_password', req.body.password).run(function(err, result){
				if(err){
					res.redirect('/');
				}else{
					//SESSION
					if(result.length > 0){
						req.session.userid = result[0]._id;
						req.session.auth = true;
						res.redirect('/');
					}else{
						res.render('signin', { title: 'Sign In', msgType: 'error', message: 'The username or password you entered is incorrect.'});
					}
				}
			});
		}
	}
};

//USER AUTHORIZE
exports.authorize = function(req, res){
    if(req.method == "GET"){
			res.render('signup', { title: 'Sign Up'});
    } else {
    	var userinfo = req.body.user;
    	UserDb.count({_email:userinfo.uname}).run(function(err, countdb){
    		if(countdb<1){
		    	var data = {
		    		_name: wordToUpper(userinfo.fname),
		    		_email: userinfo.uname,
		    		_password: userinfo.passw,
		    		_alive: false
		    	};
					var insertData = new UserDb(data);
					insertData.save(function(err, done){
						if(err){
							res.send("error");
						}else{
							res.send("success");
						}
					});
    		}else{
    			res.send("email");
    		}
    	});
    }
};

//USER DEAUTHENTICATE
exports.deauthenticate = function(req, res){
	req.session.destroy();
	res.redirect("/");
};