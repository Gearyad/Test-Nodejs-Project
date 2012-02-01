/*
 *
 * Module dependencies.
 *
 */

var express = require('express')
  , routes = require('./routes')
  , mongoose = require('mongoose')
  , blogPost = require('./controllers/post_ctrl')
  , user = require('./controllers/author_ctrl')
  , mongoUri;

var app = module.exports = express.createServer();

// Configuration
var database_url = "dbh86.mongolab.com:27867/db_testblog";
var database_username = "gerald";
var database_password = "gerald123456";

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'thisismysecretcodes', cookie: {expires: false}}));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Database
mongoUri = 'mongodb://' + database_username + ':' + database_password + '@' + database_url;		
mongoose.connect(mongoUri);

// Routes
app.get('/', blogPost.findAll);
app.all('/signin/:type?', user.authenticate);
app.all('/signup', user.authorize);
app.all('/signout', user.deauthenticate);
app.all('/post/:operation/:id?', blogPost.operation);
app.get('/session/:name?', routes.session);
app.use(routes.errorpage);
//app.use(routes.errHandler);

// Listening port
app.listen(8000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);