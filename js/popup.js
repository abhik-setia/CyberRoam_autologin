$("#save_btn").click(function(event) {

	user_name=$("#roll_no").val();
	user_password=$("#password").val();

	if(!user_name || !user_password){
	  	Materialize.toast("Homie!! Fill full details :P ", 2000);
	}else{

	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	message_details={
		message:"save",
		username:user_name,
		password:user_password
	};

	chrome.tabs.sendMessage(tabs[0].id, {message_details: message_details }, function(response) {
	  	console.log(response);
	    if(response.message=="Not saved"){
	    	Materialize.toast("Homie!! Fill full details :P ", 2000);
	    }else{
	    	Materialize.toast("Let's Roll bro.. I saved everything! ", 2000);
	    	$("#before_login").hide();
	    	$("#username_display").html(message_details.username);
	    	$("#password_display").html(message_details.password);
	    	$("#after_login").show();  	 	        
	   }
	  	});

	});
	}
}); 

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    var message_details=request.message_details;
    console.log('received'+message_details);
    if (message_details.message == "show"){
      	$("#after_login").hide();  	 	        
	  	$("#before_login").show();   	
    }else{
 		$("#before_login").hide();
		$("#username_display").html(message_details.username);
	   	$("#password_display").html(message_details.password);
	   	$("#after_login").show();  
    }
  });	
