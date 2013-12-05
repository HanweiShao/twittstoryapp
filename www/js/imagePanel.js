var end_img=8;

function imagePanel(imageUrl){
	for(var i=1; i<=end_img; i++){
		var img = $("#img" + i);
		img.attr("src","");
	}
	
	end_img = (imageUrl.length < 8) ? imageUrl.length : 8;
	imgPanelInit();
	for(var i=1; i<=end_img; i++){
		var img = $("#img" + i);
		img.attr("src",imageUrl[i-1].pic);
	}
}

function imgPanelInit(){
	var content_width = $(window).width()*0.95;
	header_height = $("footer").height() + $("#bullets").height();
	var imgDisplay = $("#imageDisplay");
	
	
	if(end_img > 4){
		imgDisplay.css({
			"height":1.26*content_width,
			"position":"relative",
			"top": 0,
			"width": "100%",
			"display":"block"
		});
		for(var i=1; i<= end_img; i++){
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
	else{
		imgDisplay.css({
			"height":0.7*content_width,
			"position":"relative",
			"top": 0,
			"width": "100%",
			"display":"block"
		});
		for(var i=1; i<= end_img; i++){
			var img = $("#img" + i);
			if(i == 1){
				img.css({
					"position":"relative",
					"top": 0,
					"left": 0,
					"width": 0.6*content_width,
					"height": 0.6*content_width,
					"border-style": "solid",
					"border-width": "1px",
					"border-color": "white"
				});
			}
			else if(i == 2){
				img.css({
					"position":"relative",
					"top": -0.61*content_width,
					"left": 0.6*content_width,
					"width": 0.4*content_width,
					"height": 0.4*content_width,
					"border-style": "solid",
					"border-width": "2px",
					"border-color": "white"
				});
			}
			else if(i == 3){
				img.css({
					"position":"relative",
					"top": -0.4*content_width,
					"left": 0.19*content_width,
					"width": 0.2*content_width,
					"height": 0.2*content_width,
					"border-style": "solid",
					"border-width": "2px",
					"border-color": "white"
				});
			}
			else if(i == 4){
				img.css({
					"position":"relative",
					"top": -0.4*content_width,
					"left": 0.2*content_width,
					"width": 0.2*content_width,
					"height": 0.2*content_width,
					"border-style": "solid",
					"border-width": "2px",
					"border-color": "white"
				});
			}
		}
	}
	
}
