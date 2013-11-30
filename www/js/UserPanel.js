var users;
var userpic;
var countUsers;
var users_length;
var end_user;

function UserPanel(){
	users = resultObj.users;
	users_length = users.length;
	userpic=[];
	countUsers=0;
	end_user = (users_length > 12) ? 12 : users_length;
	for(var i=0; i<end_user; i++){
		getUserInfo(users[i].text);
	}
	
}

function showUserPanel(){
	for(var i=0; i<end_user; i++){
		if(users[i].size > 1){
			var userHtml = 
                "<div style='margin-bottom:5px; float:left; width:33%; height:150px '>" +
                    "<p style='font-size:8px'>{0}</p>" +
                    "<img src='{1}' height='80px'>" +
                    "<p style='font-size:8px'>(Mentioned {2} times)</p>" +
                "</div>";

        	userHtml = String.format( userHtml,
                users[i].text,
                userpic[i],
                users[i].size);
		}else if(users[i].size == 1){
			var userHtml = 
                "<div style='margin-bottom:5px; float:left; width:33%; height:150px '>" +
                    "<p style='font-size:8px'>{0}</p>" +
                    "<img src='{1}' height='80px'>" +
                    "<p style='font-size:8px'>(Mentioned 1 time)</p>" +
                "</div>";

        	userHtml = String.format( userHtml,
                users[i].text,
                userpic[i]);
		}
		
       	$("#mentionedDiv").append(userHtml);
       
	}
	for(var i=end_user; i<users_length; i++){
		if(users[i].size > 1){
			var userHtml = 
                "<div style='margin-bottom:5px; float:left; width:33% '>" +
                    "<p style='font-size:8px'>{0}</p>" +
                    "<p style='font-size:8px'>(Mentioned {1} times)</p>" +
                "</div>";

        	userHtml = String.format( userHtml,
                users[i].text,
                users[i].size);
		}else if(users[i].size == 1){
			var userHtml = 
                "<div style='margin-bottom:5px; float:left; width:33% '>" +
                    "<p style='font-size:8px'>{0}</p>" +
                    "<p style='font-size:8px'>(Mentioned 1 time)</p>" +
                "</div>";

        	userHtml = String.format( userHtml,
                users[i].text);
		}
		
                
        $("#mentionedDiv").append(userHtml);
	}
}

function getUserInfo(id){ 
      $.ajax({
            type: 'POST', 
            url: "http://www.twittstory.com/TwitterUserInfo",
            data: {id: id}
            
        })
       .done(function(msg) {
            console.log(msg);
            var obj = JSON.parse(msg);
            src = obj.pic;
			userpic.push(src);
			countUsers++;  
			if (countUsers == end_user){ showUserPanel();}       
        })
        .fail(function(jqxhr, textStatus, error) {
            var err = textStatus + ", " + error;
            console.log("Request Failed: " + err);
        });
}