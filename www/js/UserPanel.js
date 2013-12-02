var users;
var userpic;
var countUsers;
var users_length;
var end_user;

function UserPanel(){
	$("#userInfo").empty();
	for(var i=1; i<=end_user; i++){
		var img = $("#img" + i);
		img.attr("src","");
	}
	
	users = resultObj.users;
	users_length = users.length;
	userpic=[];
	countUsers=0;
	end_user = (users_length > 8) ? 8 : users_length;
	for(var i=0; i<end_user; i++){
		getUserInfo(users[i].text);
	}
	
}

function showUserPanel(){
	userPanelInit();
	for(var i=1; i<= end_user; i++){
		var img = $("#img" + i);
		img.attr("src",userpic[i-1]);
		/*if(users[i].size > 1){
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
		
       	$("#mentionedDiv").append(userHtml);*/
       
	}
	for(var i=end_user; i<users_length; i++){
		if(users[i].size > 1){
			var userHtml = 
                "<div style='margin-bottom:5px; float:left; width:33% '>" +
                    "<p style='font-size:9px'>{0}</p>" +
                    "<p style='font-size:9px'>(Mentioned {1} times)</p>" +
                "</div>";

        	userHtml = String.format( userHtml,
                users[i].text,
                users[i].size);
		}else if(users[i].size == 1){
			var userHtml = 
                "<div style='margin-bottom:5px; float:left; width:33% '>" +
                    "<p style='font-size:9px'>{0}</p>" +
                    "<p style='font-size:9px'>(Mentioned 1 time)</p>" +
                "</div>";

        	userHtml = String.format( userHtml,
                users[i].text);
		}
		
                
        $("#userInfo").append(userHtml);
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

function userPanelInit(){
	var content_width = $(window).width()*0.95;
	header_height = $("footer").height() + $("#bullets").height();
	var userDisplay = $("#userDisplay");
	var userInfo = $("#userInfo");
	userDisplay.css({
		"height":1.26*content_width,
		"position":"relative",
		"top": 0,
		"width": "100%",
		"display":"block"
	});

	for(var i=1; i<= end_user; i++){
		var img = $("#img" + i);
		if(i == 1){
			img.css({
				"position":"relative",
				"top": 0,
				"left": 0.33*content_width,
				"width": 0.66*content_width,
				"height": 0.66*content_width,
				"border-style": "solid",
				"border-width": "1px",
				"border-color": "white"
			});
		}
		else if(i == 2){
			img.css({
				"position":"relative",
				"top": 0,
				"left": 0,
				"width": 0.5*content_width,
				"height": 0.5*content_width,
				"border-style": "solid",
				"border-width": "2px",
				"border-color": "white"
			});
		}
		else if(i == 3){
			img.css({
				"position":"relative",
				"top": -0.842*content_width,
				"left": -0.515*content_width,
				"width": 0.33*content_width,
				"height": 0.33*content_width,
				"border-style": "solid",
				"border-width": "2px",
				"border-color": "white"
			});
		}
		else if(i == 4){
			img.css({
				"position":"relative",
				"top": -0.852*content_width,
				"left": 0,
				"width": 0.33*content_width,
				"height": 0.33*content_width,
				"border-style": "solid",
				"border-width": "2px",
				"border-color": "white"
			});
		}
		else if(i == 5){
			img.css({
				"position":"relative",
				"top": -0.60*content_width,
				"left": 0.16*content_width,
				"width": 0.25*content_width,
				"height": 0.25*content_width,
				"border-style": "solid",
				"border-width": "2px",
				"border-color": "white"
			});
		}
		else if(i == 6){
			img.css({
				"position":"relative",
				"top": -0.60*content_width,
				"left": 0.15*content_width,
				"width": 0.25*content_width,
				"height": 0.25*content_width,
				"border-style": "solid",
				"border-width": "2px",
				"border-color": "white"
			});
		}
		else if(i == 7){
			img.css({
				"position":"relative",
				"top": -0.60*content_width,
				"left": 0.5*content_width,
				"width": 0.25*content_width,
				"height": 0.25*content_width,
				"border-style": "solid",
				"border-width": "2px",
				"border-color": "white"
			});
		}
		else if(i == 8){
			img.css({
				"position":"relative",
				"top": -0.60*content_width,
				"left": 0.49*content_width,
				"width": 0.25*content_width,
				"height": 0.25*content_width,
				"border-style": "solid",
				"border-width": "2px",
				"border-color": "white"
			});
		}

	}
}
