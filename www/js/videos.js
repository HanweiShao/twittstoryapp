function regex() {
	return "(http|https):\/\/(www.youtube.com|vimeo.com|vine.co)";
}

function isValidUrl(url) {
	return url.match(regex()) !== null;
}
