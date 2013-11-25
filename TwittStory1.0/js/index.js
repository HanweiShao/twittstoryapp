


var pages = [
	"#cloudpage",
	"#linkspage",
	"#imagepage",
	"#mentionedpage",
	"#tweetspage"
];

$(document).ready(function(){
	$("#left-button").on("click",function(){	
		$( "#left-panel" ).panel( "open");
	});

	$("#right-button").on("click",function(){
		$( "#right-panel" ).panel( "open");
	});
	
  $("#cloud1").click(function(){
  	$.mobile.changePage($("#cloudpage"), "none");
  });
  $("#imgvideo1").click(function(){
  	$.mobile.changePage($("#imagepage"), "none");
  });
  $("#tweets1").click(function(){
  	$.mobile.changePage($("#tweetspage"), "none");
  });
  $("#links1").click(function(){
  	$.mobile.changePage($("#linkspage"), "none");
  });
  $("#mentioned1").click(function(){
  	$.mobile.changePage($("#mentionedpage"), "none");
  });
  
  $("#cloudpage").on( "swipeleft", swipeleftHandler1);
  $("#cloudpage").on( "swiperight", swiperightHandler1);
  $("#linkspage").on( "swipeleft", swipeleftHandler2);
  $("#linkspage").on( "swiperight", swiperightHandler2);
  $("#imagepage").on( "swipeleft", swipeleftHandler3);
  $("#imagepage").on( "swiperight", swiperightHandler3);
  $("#mentionedpage").on( "swipeleft", swipeleftHandler4);
  $("#mentionedpage").on( "swiperight", swiperightHandler4);
  $("#tweetspage").on( "swipeleft", swipeleftHandler5);
  $("#tweetspage").on( "swiperight", swiperightHandler5);



function swipeleftHandler1(event){
	$.mobile.changePage($("#linkspage"), "none");
}
	function swipeleftHandler2(event){
	$.mobile.changePage($("#imagepage"), "none");
}
	function swipeleftHandler3(event){
	$.mobile.changePage($("#mentionedpage"), "none");
}
	function swipeleftHandler4(event){
	$.mobile.changePage($("#tweetspage"), "none");
}
	function swipeleftHandler5(event){
	$.mobile.changePage($("#cloudpage"), "none");
}
function swiperightHandler1(event){
	$.mobile.changePage($("#tweetspage"), "none");
}
	function swiperightHandler2(event){
	$.mobile.changePage($("#cloudpage"), "none");
}
	function swiperightHandler3(event){
	$.mobile.changePage($("#linkspage"), "none");
}
	function swiperightHandler4(event){
	$.mobile.changePage($("#imagepage"), "none");
}
	function swiperightHandler5(event){
	$.mobile.changePage($("#mentionedpage"), "none");
}

});