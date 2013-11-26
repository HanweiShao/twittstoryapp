


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
		
		$(".activated").removeClass("activated");
		$("#li_cloud").addClass("activated");
		$("#cloudDiv").show();
		$("#imageDiv").hide();
		$("#linkDiv").hide();
		$("#mentionedDiv").hide();
		$("#tweetDiv").hide();
		$(this).css({"z-index":"5"});
	
		$("#imgvideo1").css({"z-index":"1"});
		$("#links1").css({"z-index":"1"});
		$("#mentioned1").css({"z-index":"1"});
		$("#tweets1").css({"z-index":"1"});
	//	    $("#left-panel").panel("close");
    });
    $("#imgvideo1").click(function() {
       $(".activated").removeClass("activated");
		$("#li_img").addClass("activated");
		$("#imageDiv").show();
		$("#cloudDiv").hide();
		$("#linkDiv").hide();
		$("#mentionedDiv").hide();
		$("#tweetDiv").hide();
			$("#cloud1").css({"z-index":"1"});
		$("#imgvideo1").css({"z-index":"5"});
		$("#links1").css({"z-index":"1"});
		$("#mentioned1").css({"z-index":"1"});
		$("#tweets1").css({"z-index":"1"});
	//	  $("#left-panel").panel("close");
    });
    $("#tweets1").click(function() {
     			$(".activated").removeClass("activated");
		$("#li_tweets").addClass("activated");
		$("#cloudDiv").hide();
		$("#imageDiv").hide();
		$("#linkDiv").hide();
		$("#mentionedDiv").hide();
		$("#tweetDiv").show();
		$("#cloud1").css({"z-index":"1"});
		$("#imgvideo1").css({"z-index":"1"});
		$("#links1").css({"z-index":"1"});
		$("#mentioned1").css({"z-index":"1"});
		$("#tweets1").css({"z-index":"5"});
	//	  $("#left-panel").panel("close");
    });
    $("#links1").click(function() {
    $(".activated").removeClass("activated");
		$("#li_links").addClass("activated");
		$("#cloudDiv").hide();
		$("#imageDiv").hide();
		$("#linkDiv").show();
		$("#mentionedDiv").hide();
		$("#tweetDiv").hide();
		$("#cloud1").css({"z-index":"1"});
		$("#imgvideo1").css({"z-index":"1"});
		$("#links1").css({"z-index":"5"});
		$("#mentioned1").css({"z-index":"1"});
		$("#tweets1").css({"z-index":"1"});
	//	  $("#left-panel").panel("close");
    });
    $("#mentioned1").click(function() {
        $(".activated").removeClass("activated");
		$("#li_uses").addClass("activated");
		$("#cloudDiv").hide();
		$("#imageDiv").hide();
		$("#linkDiv").hide();
		$("#mentionedDiv").show();
		$("#tweetDiv").hide();
		$("#cloud1").css({"z-index":"1"});
		$("#imgvideo1").css({"z-index":"1"});
		$("#links1").css({"z-index":"1"});
		$("#mentioned1").css({"z-index":"5"});
		$("#tweets1").css({"z-index":"1"});
	//	 $("#left-panel").panel("close");
    });


    $("#cloudDiv").on("swipeleft", swipeleftHandler1);
    $("#linkDiv").on("swipeleft", swipeleftHandler2);
    $("#imageDiv").on("swipeleft", swipeleftHandler3);
    $("#mentionedDiv").on("swipeleft", swipeleftHandler4);
    
    $("#linkDiv").on("swiperight", swiperightHandler1);
    $("#imageDiv").on("swiperight", swiperightHandler2);
    $("#mentionedDiv").on("swiperight", swiperightHandler3);
    $("#tweetDiv").on("swiperight", swiperightHandler4);
  



    function swipeleftHandler1(event) {
        $("#cloudDiv").fadeOut(300, function() {
            $("#linkDiv").fadeIn(10);
            $("#li_cloud").removeClass("activated");
            $("#li_links").addClass("activated");
        });
    }
    function swipeleftHandler2(event) {
        $("#linkDiv").fadeOut(300, function() {
            $("#imageDiv").fadeIn(10);
            $("#li_links").removeClass("activated");
            $("#li_img").addClass("activated");
        });
    }
    function swipeleftHandler3(event) {
        $("#imageDiv").fadeOut(300, function() {
            $("#mentionedDiv").fadeIn(10);
            $("#li_img").removeClass("activated");
            $("#li_uses").addClass("activated");
        });
    }
    function swipeleftHandler4(event) {
        $("#mentionedDiv").fadeOut(300, function() {
            $("#tweetDiv").fadeIn(10);
            $("#li_uses").removeClass("activated");
            $("#li_tweets").addClass("activated");
        });
    }
    
    function swiperightHandler1(event) {
        $("#linkDiv").fadeOut(300, function() {
            $("#cloudDiv").fadeIn(10);
            $("#li_links").removeClass("activated");
            $("#li_cloud").addClass("activated");
        });
    }
    function swiperightHandler2(event) {
        $("#imageDiv").fadeOut(300, function() {
            $("#linkDiv").fadeIn(10);
            $("#li_img").removeClass("activated");
            $("#li_links").addClass("activated");
        });
    }
    function swiperightHandler3(event) {
        $("#mentionedDiv").fadeOut(300, function() {
            $("#imageDiv").fadeIn(10);
            $("#li_uses").removeClass("activated");
            $("#li_img").addClass("activated");
        });
    }
    function swiperightHandler4(event) {
        $("#tweetDiv").fadeOut(300, function() {
            $("#mentionedDiv").fadeIn(10);
            $("#li_tweets").removeClass("activated");
            $("#li_uses").addClass("activated");
        });
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