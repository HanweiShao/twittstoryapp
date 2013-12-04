var uniWidth = "240px";
var uniHeight = "180px";

function regex() {
	return "(http|https):\/\/(www.youtube.com|vimeo.com|vine.co)";
}

function isValidUrl(url) {
	return url.match(regex()) !== null;
}

function videos(url) {
	var m = url.match(regex());
	var fn;
	var videoHtml;

	if (m[2] === "www.youtube.com") {
		fn = new youtubeVideo(url);
		videoHtml = fn.renderOn();
	} else if (m[2] === "vimeo.com") {
		fn = new vimeoVideo(url);
		videoHtml = fn.renderOn();
	} else if (m[2] === "vine.co") {
		fn = new vineVideo(url);
		videoHtml = fn.renderOn();
	}
	if (fn === undefined) {
		// nothing
	}
	$('#imageDiv').append(videoHtml);
}

function youtubeVideo(url) {
	this.url = url;
	this.embedUrl = function() {
		// Code taken and adapted from:
		// http://stackoverflow.com/questions/13100611/replace-url-from-youtube-to-embed-code-error-permission-denied-to-access-prop
		var regex = /(\?v=|\&v=|\/\d\/|\/embed\/|\/v\/|\.be\/)([a-zA-Z0-9\-\_]+)/;
		var result = this.url.match(regex);
		if (result) {
			return "http://www.youtube.com/embed/" + result[2];
		} else {
			// Code shouldn't reach here
			var parts = this.url.split("?v=");
			return "//www.youtube.com/embed/" + parts[parts.length - 1];
		}
	};
	this.renderOn = function() {
		// <iframe width="420" height="315" src="//www.youtube.com/embed/6ssL1efZ_78"
		// frameborder="0" allowfullscreen></iframe>
		youtubeHtml = "<iframe width={0}, heihgt={1} src={2} frameborder={3} allowfullscreen></iframe>";
		youtubeHtml = String.format(youtubeHtml, uniWidth, uniHeight, this.embedUrl(), "0");
		return youtubeHtml;
	};
}

function vimeoVideo(url) {
	this.url = url;
	this.embedUrl = function() {
		var parts = this.url.split("/");
		return "http://player.vimeo.com/video/" + parts[parts.length - 1] + "?color=a8a8a8";
	};

	this.renderOn = function() {
		// <iframe src="http://player.vimeo.com/video/12422039?color=a8a8a8"
		// width="500" height="281" frameborder="0"></iframe>
		vimeoHtml = "<iframe src={0} width={1}, heihgt={2} frameborder={3}></iframe>";
		vimeoHtml = String.format(vimeoHtml, this.embedUrl(), uniWidth, uniHeight, "0");
		return vimeoHtml;
	};
}

function vineVideo(url) {
	this.url = url;

	this.renderOn = function() {
		// <iframe src="https://vine.co/v/bnrtW52x1uJ/card?mute=1"
		//  width="500px" height="500px" frameborder="0"></iframe>
		vineHtml = "<iframe src={0} width={1}, heihgt={2} frameborder={3}></iframe>";
		vineHtml = String.format(vimeoHtml, this.url + "/card?mute=1", uniWidth, uniHeight, "0");
		return vineHtml;
	};
}

