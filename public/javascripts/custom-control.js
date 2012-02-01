(function(){
    // remove layerX and layerY
    var all = $.event.props,
        len = all.length,
        res = [];
    while (len--) {
      var el = all[len];
      if (el != 'layerX' && el != 'layerY') res.push(el);
    }
    $.event.props = res;
}());
$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};
function validateEmail(elementValue){
   var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
   return emailPattern.test(elementValue);
 }

$(document).bind("mobileinit", function(){
	//Signin Page
	$("#signin_page").live('pageinit', function() {
			$.mobile.ajaxEnabled = false;
	});
	//Signup Page
	$("#signup_page").live('pageinit', function() {
			$.mobile.ajaxEnabled = false;
			$.mobile.defaultPageTransition = 'slide';
			$("#signup_form").submit(function(){
				var n_error = 0;
				var err_msg = "";
				var uname = $("#uname").val();
				var passw = $("#passw").val();
				var passr = $("#passr").val();
				var fname = $("#fname").val();
				$(".signup-container em.error").empty();
				if(!validateEmail(uname)){
					n_error++;
					$(".signup-container em.error.uname").empty().text("Email address is not valid");
				}
				if(passw == ""||passr == ""){
					n_error++;
					$(".signup-container em.error.passw").empty().text("Password is required");
				}else if(passw.length < 8||passr.length < 8){
					n_error++;
					$(".signup-container em.error.passw").empty().text("Password must contain at least 8 characters");
				}else if(passw != passr){
					n_error++;
					$(".signup-container em.error.passw").empty().text("Password does not match the confirm password");
				}
				if(fname == ""){
					n_error++;
					$(".signup-container em.error.fname").empty().text("Your name is required");
				}
				console.log(n_error);
				if(n_error < 1){
					var userinfo = $(this).serializeObject();
					$.ajax({
						cache:false,
						url:'/signup',
						type: 'POST',
						data: userinfo,
						beforeSend:function(msg){
						},
						success:function(msg){
							switch(msg){
								case "email":
									$(".signup-container em.error.uname").empty().text("Email address already exist");
								break;
								case "error":
									$(".signup-container em.error.uname").empty().text("Technical problem");
								break;
								case "success":
									//$(".signup-container em.error.uname").empty().text("Sign up successfull. You may now sign in");
									window.location = "/signin/success";
								break;
							}
						},
						error:function(err){
						}
					});
				}
				return false;
			});
	});
	
	//Post Page
	$("#post_page").live('pageinit', function() {
			$.mobile.ajaxEnabled = false;
			$("#postme").submit(function(){
				var post = $(this).serializeObject();
				$.ajax({
					cache:false,
					url:'/post/add',
					type: 'POST',
					data: post,
					beforeSend: function(msg){
						$("#post_page .message").text("Saving...");
					},
					success:function(msg){
						$("#post_page .message").text(msg);
						window.location = "/";
					},
					error:function(err){
						$("#post_page .message").text("Error on saving!");
					}
				});
				return false;
			});
	});
  
});