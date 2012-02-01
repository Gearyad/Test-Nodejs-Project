module.exports = require('./db_connector');
var Author = require('./logicProcessor/author');
//Author.addDoc("Gerald", "gerald.b.picazoa@gmail.com", "gerald123456", true);
var id = "4f168466e021e9e20f000002";
//FIND
var stream = Author.findDoc(id).stream();
stream.on('data', function(doc){
		 console.log(doc);
});
//MODIFY
//var result = Author.findDoc(id).stream();
//result.on('data', function(doc){
//		var data = {
//			name:"Gerald B Picazo",
//			email:doc._email,
//			password:doc._password,
//			alive:doc._alive
//		};
//		Author.modifyDoc(id, data);
//});