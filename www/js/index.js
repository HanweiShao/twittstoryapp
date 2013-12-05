


var contentDivs = [
	"cloudDiv",
	"linkDiv",
	"imageDiv",
	"mentionedDiv",
	"tweetDiv",
	"start"
];
var fadeOutTime = 300;
var fadInTime = 100;

$(document).ready(function(){
	
    AdjustHeight();
    $("#logo").css({
    	"width":$(window).width()*0.95,
    	"position":"relative"
    });
    
    $("#LoginTwitter").on("click",loginTwitter);

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
		
	    $("#leftpanel1").panel("close");
    });
    $("#imgvideo1").click(function() {
       $(".activated").removeClass("activated");
		$("#li_img").addClass("activated");
		$("#imageDiv").show();
		$("#cloudDiv").hide();
		$("#linkDiv").hide();
		$("#mentionedDiv").hide();
		$("#tweetDiv").hide();
			
	  $("#leftpanel1").panel("close");
    });
    $("#tweets1").click(function() {
     			$(".activated").removeClass("activated");
		$("#li_tweets").addClass("activated");
		$("#cloudDiv").hide();
		$("#imageDiv").hide();
		$("#linkDiv").hide();
		$("#mentionedDiv").hide();
		$("#tweetDiv").show();
		
	        $("#leftpanel1").panel("close");
    });
    $("#links1").click(function() {
    $(".activated").removeClass("activated");
		$("#li_links").addClass("activated");
		$("#cloudDiv").hide();
		$("#imageDiv").hide();
		$("#linkDiv").show();
		$("#mentionedDiv").hide();
		$("#tweetDiv").hide();
		
	        $("#leftpanel1").panel("close");
    });
    $("#mentioned1").click(function() {
        $(".activated").removeClass("activated");
		$("#li_uses").addClass("activated");
		$("#cloudDiv").hide();
		$("#imageDiv").hide();
		$("#linkDiv").hide();
		$("#mentionedDiv").show();
		$("#tweetDiv").hide();
		
	     $("#leftpanel1").panel("close");
    });


    $("#cloudDiv").on("swipeleft", swipeleftHandler1);
    $("#linkDiv").on("swipeleft", swipeleftHandler2);
    $("#imageDiv").on("swipeleft", swipeleftHandler3);
    $("#mentionedDiv").on("swipeleft", swipeleftHandler4);
    
    $("#linkDiv").on("swiperight", swiperightHandler1);
    $("#imageDiv").on("swiperight", swiperightHandler2);
    $("#mentionedDiv").on("swiperight", swiperightHandler3);
    $("#tweetDiv").on("swiperight", swiperightHandler4);
  	
  	//Choose a word and search again
	$("#cloudDiv").click(function(event){
		if(event.target.tagName == "text"){
			var word = event.target.textContent;
			var searchContent = $("#inputSearch").val() + " " + word;
			$("#inputSearch").val(searchContent);
			$("#popupBasic").popup("open");	
		} 
		
	});
	
	$("#displayUser").click(function(){
		$("#userInfo").css("display","block");
	});

});

function swipeleftHandler1(event) {
        $("#cloudDiv").fadeOut(fadeOutTime, function() {
            $("#linkDiv").fadeIn(fadInTime);
            $("#li_cloud").removeClass("activated");
            $("#li_links").addClass("activated");
        });
    }
    function swipeleftHandler2(event) {
        $("#linkDiv").fadeOut(fadeOutTime, function() {
            $("#imageDiv").fadeIn(fadInTime);
            $("#li_links").removeClass("activated");
            $("#li_img").addClass("activated");
        });
    }
    function swipeleftHandler3(event) {
        $("#imageDiv").fadeOut(fadeOutTime, function() {
            $("#mentionedDiv").fadeIn(fadInTime);
            $("#li_img").removeClass("activated");
            $("#li_uses").addClass("activated");
        });
    }
    function swipeleftHandler4(event) {
        $("#mentionedDiv").fadeOut(fadeOutTime, function() {
            $("#tweetDiv").fadeIn(fadInTime);
            $("#li_uses").removeClass("activated");
            $("#li_tweets").addClass("activated");
        });
    }
    
    function swiperightHandler1(event) {
        $("#linkDiv").fadeOut(fadeOutTime, function() {
            $("#cloudDiv").fadeIn(fadInTime);
            $("#li_links").removeClass("activated");
            $("#li_cloud").addClass("activated");
        });
    }
    function swiperightHandler2(event) {
        $("#imageDiv").fadeOut(fadeOutTime, function() {
            $("#linkDiv").fadeIn(fadInTime);
            $("#li_img").removeClass("activated");
            $("#li_links").addClass("activated");
        });
    }
    function swiperightHandler3(event) {
        $("#mentionedDiv").fadeOut(fadeOutTime, function() {
            $("#imageDiv").fadeIn(fadInTime);
            $("#li_uses").removeClass("activated");
            $("#li_img").addClass("activated");
        });
    }
    function swiperightHandler4(event) {
        $("#tweetDiv").fadeOut(fadeOutTime, function() {
            $("#mentionedDiv").fadeIn(fadInTime);
            $("#li_tweets").removeClass("activated");
            $("#li_uses").addClass("activated");
        });
    }

	
    function  loginTwitter() {
        $("#LoginPopup").popup("open");
        $.ajax({
            dataType: "html",
            url: "http://www.twittstory.com/TwitterSignIn",
            type: "GET",
            xhrFields: {
                withCredentials: true
            }
        })
        .done(function(msg) {                 
            var link = $("#not-logged-in a", msg).attr("href");
            $("#loginSubmit").on("click", function() {
                TwitterLoginPageSubmit(msg);
            });          
            AdjustHeight();
        })
        .fail(function(jqxhr, textStatus, error) {
            var err = textStatus + ", " + error;
            console.log("Request Failed: " + err);
        });//end of ajax          
    }
    
    
var authenticity_token = "";
var oauth_token = "";

/*
 * input email/password and submit to Twitter
 */
function TwitterLoginPageSubmit(twitterpage)
{
    authenticity_token =  $("input[name='authenticity_token']", twitterpage).val();
    oauth_token = $("input[name='oauth_token']", twitterpage).val();

    $.ajax({
        dataType: "html",
        url: "https://api.twitter.com/oauth/authenticate",
        type: "POST",
        data: {
            authenticity_token: authenticity_token,
            oauth_token: oauth_token,
            "session[username_or_email]": $("#loginEmail").val(),
            "session[password]": $("#loginPwd").val()
        },
        xhrFields: {
            withCredentials: true
        }
    })
    .done(function(html) {
        TwitterLoginPageSubmitConfirm(html);
    })
    .fail(function(jqxhr, textStatus, error) {
        var err = textStatus + ", " + error;
        console.log("Request Failed: " + err);
    });//end of ajax  ;

}

/*
 * confirm login and login into Twitter
 */
function TwitterLoginPageSubmitConfirm(page)
{
    $.ajax({
        dataType: "html",
        url: "https://api.twitter.com/oauth/authenticate",
        type: "POST",
        data: {
            authenticity_token: authenticity_token,
            oauth_token: oauth_token
        },
        xhrFields: {
            withCredentials: true
        }
    })
    .done(function(html) {
        var twitterid = $("span.name", page).html();
        $("#inputSearch").val("home:@"+twitterid);
        $("#LoginPopup").popup("close");
        $("#rightpanel1").panel("close");
        $("#popupBasic").popup("open");
       
    })
    .fail(function(jqxhr, textStatus, error) {
        var err = textStatus + ", " + error;
        console.log("Request Failed: " + err);
    });//end of ajax  ;
    
}


function AdjustHeight()
{
    for (var i = 0; i < contentDivs.length; i++)
    {
        var d = $("#" + contentDivs[i]);
        if (d.height() < $(window).height())
            d.height($(window).height());
        d.width($(window).width() * 0.95);
    }
}