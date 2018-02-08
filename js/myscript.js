$(document).ready(function($) {

		 var all_inputs=$(":input");

		 var user_name=all_inputs[1];
		 var user_password=all_inputs[2];
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
					chrome.runtime.sendMessage({message_details:message_details}, function(response) {});
					console.log('user details found');
			}else{
				message_details={
					message:"show",
					username:null,
					password:null
				};
				console.log('user details empty');
				chrome.runtime.sendMessage({message_details:message_details}, function(response) {});
			}
		}else{
	      console.log('Chrome Runtime Error : '+chrome.runtime.error);
	 	}
		});
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