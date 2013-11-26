


var pages = [
	"#cloudpage",
	"#linkspage",
	"#imagepage",
	"#mentionedpage",
	"#tweetspage"
];

$(document).ready(function(){
    $("#left-button").on("click", function() {
        $("#left-panel").panel("open");
    });

    $("#right-button").on("click", function() {
        $("#right-panel").panel("open");
    });

    //balloon
    $("#cloud1").click(function() {
        $.mobile.changePage($("#cloudpage"), "none");
    });
    $("#imgvideo1").click(function() {
        $.mobile.changePage($("#imagepage"), "none");
    });
    $("#tweets1").click(function() {
        $.mobile.changePage($("#tweetspage"), "none");
        
    });
    $("#links1").click(function() {
        $.mobile.changePage($("#linkspage"), "none");
    });
    $("#mentioned1").click(function() {
        $.mobile.changePage($("#mentionedpage"), "none");
    });
  /*
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
*/

    $("#Div1").on("swipeleft", swipeleftHandler1);
    $("#Div2").on("swipeleft", swipeleftHandler2);
    $("#Div3").on("swipeleft", swipeleftHandler3);
    $("#Div4").on("swipeleft", swipeleftHandler4);
    $("#tweetDiv").on("swipeleft", swipeleftHandler5);
  
    //$("#tweetDiv").on( "swiperight", swiperightHandler1);


    function swipeleftHandler1(event) {
        //alert("1");
        $("#Div1").fadeOut(300, function() {
            $("#Div2").fadeIn(10);
        });
        
        //$("#tweetDiv").fadeOut(500);
        //$("#tweetDiv2").fadeIn(500);
        //$.mobile.changePage($("#tweetDiv"), "none");
    }
    function swipeleftHandler2(event) {
        //alert("2");
        $("#Div2").fadeOut(300, function() {
            $("#Div3").fadeIn(10);
        });
        //$.mobile.changePage($("#tweetDiv2"), "none");
    }
    function swipeleftHandler3(event) {
        //alert("3");
        $("#Div3").fadeOut(300, function() {
            $("#Div4").fadeIn(10);
        });
        //$.mobile.changePage($("#tweetDiv3"), "none");
    }
    function swipeleftHandler4(event) {
        //$.mobile.changePage($("#tweetDiv4"), "none");
        $("#Div4").fadeOut(300, function() {
            $("#tweetDiv").fadeIn(10);
            $("#li_uses").removeClass("activated");
            $("#li_tweets").addClass("activated");
        });
    }
    function swipeleftHandler5(event) {
        //$.mobile.changePage($("#tweetDiv5"), "none");


    }

/*
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
*/
});