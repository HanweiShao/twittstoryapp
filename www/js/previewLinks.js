var linksInfo = {};

function previewLinks(result, urlInfo) {
	var urls = result.urls;
	var counter = 0;

	urls.forEach(function(each) {
		$.ajax({
			type : "GET",
			url : "http://www.twittstory.com/PreviewUrl",
			data : {
				url : each.url
			},
			success : function(response) {
				var data = JSON.parse(response);
				console.log("[SUCCESS] previewUrl:");
				console.log(data);
			},
			complete : function() {
			},
			error : function(error) {
				console.log("[ERROR] previewUrl:" + error);
			}
		});
	});
}
