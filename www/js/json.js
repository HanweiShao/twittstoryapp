var resultObj;

//tweets index that had already been shown
var startTweets = 0;

$(document).ready(function(){
    
    $("#submitSearch").click(function() {
        
        //$("#popupBasic").slideUp();
        
        $("#popupBasic").popup( "close" );
        
        if($("#start").is(':visible')){// To change from the start screen to results screens
			$("#start").fadeOut(300, function() {
            	$("#cloudDiv").fadeIn(100);
         	});
         	$("#bullets").show();
		}		
        for(var i=0; i<5; i++){
        	$("#" + contentDivs[i]).css({
        		"opacity":"0"
        	});
        }	      
        var loading = document.createElement("img");
       	loading.setAttribute("src","img/loading.gif");
       	loading.setAttribute("id","loading");
      	$("#page").append(loading);
       	var h = $(window).height();
       	var w = $(window).width();
     	$("#loading").css({
       			"position":"absolute",
       			"top":0.3*h,
       			"left":0.3*w,
       			"width":"150px",
        		"z-index":"1"
        });
		
        
        $.ajax({
            dataType: "json",
            url: "http://www.twittstory.com/TwitterSearch",
            type: "POST",
            data: {
                query: $("#inputSearch").val(),
                lang: $("#selectlang").val(),
                includeRT: $("#inputIncRT").attr('checked') ? true : false
            },
            xhrFields: {
                withCredentials: true 
            }
        })
        .done(function(msg) {
            console.log(msg);
            console.log(JSON.stringify(msg));
            processResult(msg);
            AdjustHeight();
            
        })
        .fail(function(jqxhr, textStatus, error) {
            var err = textStatus + ", " + error;
            console.log("Request Failed: " + err);
        })
        ;//end of ajax
    });
    
    
    $(window).scroll(function () {
       if ($(document).height() <= $(window).scrollTop() + $(window).height()) {
            //if ($.mobile.activePage.attr('id') == 'tweetspage') {
            if ($("#tweetDiv").is(':visible')) {
                RenderTweets();
            }
       }
    });
});

function processResult(result) {

   	$("#leftpanelLink").css("display","block");   
   	 	
    resultObj = result;
    wordcloudShow(resultObj.words);
    UserPanel();
    
    //Tweets
    startTweets = 0;
    RenderTweets();
    $("#tweetDiv").css("height","auto");
    for(var i=0; i<5; i++){
        	$("#" + contentDivs[i]).css({
        		"opacity":"1"
        	});
    }
    
    //links and videos
    previewLinks(result);
    imagePanel(resultObj.mediaUrls);
    hashPanel(resultObj.hashtags);
    statsPanel(resultObj.snapshot);
    
    $("#loading").remove();

}

function RenderTweets()
{
    
    var tweetList = resultObj.tweets;
    var end = (startTweets + 10 > tweetList.length) ? tweetList.length : startTweets + 10;
    $("#tweetDiv").empty();
    
    for (var i = startTweets; i < end; i++)
    {
        var tweet = tweetList[i];
        var tweetHtml = 
                "<div style='margin-bottom:5px'>" +
                    "<div style=' float:left;'><img src='{0}' /></div>" +
                       "<div style='display:inline-block;margin-left:5px'>" +
                            "{1}. <b>{2}</b> @{3} <br/>({4} followers, {5} retweets)<br /><br />" +
                        "</div>" +
                    "<div style='clear:both'>" +
                            "{6}" +                
                    "</div>" +
                    "<hr>"+
                "</div>";

        tweetHtml = String.format( tweetHtml,
                tweet.user_pic, //0.pic
                i + 1,          //1
                tweet.user,     //2
                tweet.user_screenName,  //3
                tweet.user_followers,
                tweet.retweetCount,
                urlify(tweet.text));

        $("#tweetDiv").append(tweetHtml);
        startTweets++;
    }
    
}



/*
 * http://stackoverflow.com/questions/1500260/detect-urls-in-text-with-javascript
 * @param {type} text
 * @returns {unresolved}
 */
function urlify(text) {
    var urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, function(url) {
//        return String.format("<a href='#' onclick=\"window.open('{0}', '_system');\">{0}</a>",
//                            url);
        return String.format("<a href='{0}'>{0}</a>", url);
    });
}
