(function(){
		//var mongoose = require('mongoose'),
		//mongoUri = 'mongodb://user_gbp:gerald1234@dbh86.mongolab.com:27867/db_testblog';
		//mongoose.connect(mongoUri);
		
		module.exports = require('./db_connector');
		var postNow, Post = require('./models').PostSchema;

		postNow = function(){
			var dbBlogPost, dbBlogData;
			var dbBlogData1 = {
				_author: 'Gerald',
				_title: 'First Post',
				_body: 'Hello world. I successfully saved my first post'
			};
			var dbBlogData2 = {
				_author: 'Gerald2',
				_title: 'Second Post',
				_body: 'Hello world. I successfully saved my second post'
			};
			var dbBlogData3 = {
				_author: 'Gerald3',
				_title: 'Third Post',
				_body: 'Hello world. I successfully saved my third post'
			};
			var dbBlogData4 = {
				_author: '',
				_title: 'Fourth Post',
				_body: 'Hello world. I successfully saved my fourth post'
			};
			var dbBlogData5 = {
				_author: '',
				_title: 'Fifth Post',
				_body: 'Hello world. I successfully saved my fifth post',
			};
			var dbBlogData6 = {
				_author: ' ',
				_title: 'Sixth Post',
				_body: 'Hello world. I successfully saved my sixth post',
			};
			var dbBlogData7 = {
				_author: '4f168466e021e9e20f000002',
				_title: 'Seventh Post',
				_body: 'Hello world. I successfully saved my seventh post!!!',
			};
			dbBlogPost = new Post(dbBlogData7);
			return dbBlogPost.save(function(err, item){
					if(err){
						return console.log('\nError:\n' + err);
					}else{
						return console.log('\nSuccess:\n' + item);
					}
			});
		};	
		postNow();
}).call(this);
