(function(){
		var collections = new Array(),
		mongoose = require('mongoose'),
		Schema = mongoose.Schema;
		
		//SCHEMAS
		var Authors_coll = new Schema();
		var Comments_coll = new Schema();
		var BlogPosts_coll = new Schema();
		
		//Author_coll
		Authors_coll.add({
				_name:{
					type: String,
					set: author,
					default: ""
				},
				_email:{
					type:String,
					lowercase:true,
					unique:true
				},
				_password:{
					type:String
				},
				_password:{
					type:String
				},
				_alive:{
					type:Boolean
				}
		});
		//Comments_coll
		Comments_coll.add({
				_name:{
					type:String,
					set: author,
					default: ""
				},
				_body:{
					type:String
				},
				_datePosted:{
					type:Date
				}				
		});
		//BlogPosts_coll
		BlogPosts_coll.add({
			_author:{
				type: Schema.ObjectId,
				ref: 'author'
			},
			//_author:{
				//type: String,
				//set: author,
				//default: ""
			//},
			_title:{
				type: String
			},
			_body:{
				type: String
			},
			_datePosted:{
				type: Date,
				default: setDateNow
			},
			_comments:[Comments_coll]
		});
		
		//FUNCTIONS SETTER
		/*coll_BlogPost.path('_datePosted').default(function(){
				return new Date();
		}).set(function(v){
			return v == 'now' ? new Date() : v;
		});*/
		function setDateNow(){
			return new Date();
		}
		function author(v){
			var a = v.replace(/\s/g, "");
			return a == '' ? 'Anonymous' : v;
		}
				
		//COLLECTIONS
		collections[0] = mongoose.model('author', Authors_coll);
		collections[1] = mongoose.model('comment', Comments_coll);
		collections[2] = mongoose.model('blogpost', BlogPosts_coll);
		
		//EXPORTS
		exports.AuthorSchema = collections[0];
		exports.CommentSchema = collections[1];
		exports.PostSchema = collections[2];
}).call(this);