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
			} else {
				// links
				linkHtml = 
				"<div style='margin-bottom:5px'>" + 
					"<div style=' float:left;'><img style=' float:left; width:100px; height:100px;' src='{0}' />" + 
						//"<div style='float:left;display:inline;margin-left:5px'>" + 
							"<b style='float:left;margin-left:5px;width:65%;'>{1}</b><br/>" + 
						"</div>" + 
					"<div style='clear:both'>" + 
						"{2}" + 
					"</div>" + 
					"<hr>" + 
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
