$(document).ready(function() {


var isPhone=false;
	if (isPhone)
		document.addEventListener('deviceready', onDeviceReady, false);
	else
		onDeviceReady();
});

var language = navigator.language || navigator.userLanguage;
function onDeviceReady() {
	//alert(navigator.globalization);
	if(navigator.globalization) {
		// code to retrieve the language in the device
		navigator.globalization.getPreferredLanguage(function(deviceLanguage){
			// success
			language = deviceLanguage.value;
			
			changeLabels(language);
		}, function(){
			// error
			alert("Error, no language obtained");
		});
	}
	else {
		changeLabels(language);
	}
}
//alert(language);

			
		function changeLabels(language){
		if(language.substring(0,2)=="en"){
		NLT.currentLocale("en");}
		else if(language.substring(0,2)=="es"){
		NLT.currentLocale("es");
			}
		}
	