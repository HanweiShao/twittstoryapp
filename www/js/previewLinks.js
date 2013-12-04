var previewResult = {};
var counter = 0;
var length = 0;

function previewLinks(result) {
	var urls = result.urls;
	length = urls.length;

	urls.forEach(function(each) {
		$.ajax({
			type : "GET",
			url : "http://www.twittstory.com/PreviewUrl",
			data : {
				url : each.url
			}
		}).done(function(response) {
			var linkInfo = JSON.parse(response);
			console.log("[SUCCESS] previewLinks:");
			console.log(linkInfo);

			previewResult[counter] = linkInfo;
			//record the result of previewing links
			counter++;

			//console.log("[RESULT] previewLinks:");
			//console.log(previewResult);

			if (isValidUrl(linkInfo.url)) {
				// video
				videos(linkInfo.url);
			} else {
				// links
				linkHtml = 
				"<div style='margin-bottom:10px; background-color:white; display:block; border-bottom-style:solid; border-bottom-width:1px; border-bottom-color:#BBBBBB '>" + 
					"<div><img style=' float:left; width:20%; ' src='{0}' />" + 
						//"<div style='float:left;display:inline;margin-left:5px'>" + 
							"<b style='float:left;margin-left:5px;width:75%; font-size:13px'>{1}</b><br/>" + 
						"</div>" + 
					"<div style='clear:both; margin-top:10px'>" + 
						"{2}" + 
					"</div>" + 
					"<br>" + 
				"</div>";
				
				linkHtml = String.format( linkHtml,
	                linkInfo.thumbnail, //0.pic
	                linkInfo.title,     //1
	                linkInfo.description //2
                );
				
				$("#linkDiv").append(linkHtml);
			}

		}).fail(function(error) {
			//console.log("[ERROR] previewLinks:" + error);
		});
	});
}
