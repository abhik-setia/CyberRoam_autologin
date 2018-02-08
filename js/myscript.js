var user_name,user_password,login_btn,msg_div,msg_value;

$(document).ready(function($) {

		 var all_inputs=$(":input");
		  user_name=all_inputs[1];
		  user_password=all_inputs[2];
		  login_btn=$("#logincaption");
		  msg_div=$("#msgDiv");
		  check_user_storage();
		  
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    var message_details=request.message_details;

    if (message_details.message == "save"){
    	save_changes(message_details.username,message_details.password,sendResponse);
    }
  });

function check_user_storage() {
	 chrome.storage.sync.get("user_details", function(items) {

	    if (!chrome.runtime.error) {
			if(items.user_details!=null){
				//user details present
				message_details={
					message:"hide",
					username:items.user_details.username,
					password:items.user_details.password
				};
					attempt_login(message_details.username,message_details.password);
			}else{
				message_details={
					message:"show",
					username:null,
					password:null
				};
			}
		}else{
	      console.log('Chrome Runtime Error : '+chrome.runtime.error);
	 	}
		});
}

function attempt_login (u,p) {
		user_name.value=u;
		user_password.value=p;
		login_btn.click();
		setTimeout(function () {msg_value=msg_div.find('xmp')[0].innerHTML;}, 1000);
}	

function save_changes (username,password,sendResponse) {
	 	var user_details={
		 	username:username,
		 	password:password
		 }
		 chrome.storage.sync.set({'user_details':user_details}, function() {
		 	console.log('Saved details');
	      });	
	 sendResponse({message:"saved"});
}