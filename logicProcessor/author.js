		var AuthorModel = require('../models').AuthorSchema;
		
		//ADD NEW AUTHOR
		exports.addDoc = function(name, email, password, alive){
			var dbAuthorData1 = {
				_name:name,
				_email:email,
				_password:password,
				_alive: alive
			};
			var dbAuthor = new AuthorModel(dbAuthorData1);
			dbAuthor.save(function(err, docs){
					if(err){
						console.log('\nError:\n' + err);
					}else{
						console.log('\nSuccess:\n' + docs);
					}
			});
		};
		
		//FIND		
		var resull;
		exports.findDoc = function(id, output){
			output = output === undefined ? []:output;
			var query = {
				_id: id
			};
			return AuthorModel.find(query,output);
		};
		
		//FIND AND MODIFY AUTHOR
		exports.modifyDoc = function(id, data){
			var query = {
				_id: id
			};
			var updateData = {
				_name:data.name,
				_email:data.email,
				_password:data.password,
				_alive:data.alive
			};			
			AuthorModel.update(query, updateData, function(err){
					if(err){
						console.log('\nMODIFICATION----Error:\n' + err);
					}else{
						console.log('\nMODIFICATION----Success:\n');
					}						
			});
		};
