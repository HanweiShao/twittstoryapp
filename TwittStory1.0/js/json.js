window.onload = function()
{
    processResult(result);
};

function processResult(result) {

    var obj = eval(result);
    //alert(obj.tweets[0].text);

    for (var i = 0; i < 10; i++)
    {
        var tweet = obj.tweets[i];
        var tweetHtml = 
                "<div style='margin-bottom:5px'>" +
                    "<div style=' float:left'><img src='{0}' /></div>" +
                       "<div style='display:inline-block;margin-left:5px'>" +
                            "{1}. <b>{2}</b> @{3} <br/>({4} followers, {5} retweets)<br />" +
                        "</div>" +
                    "<div style='clear:both'>" +
                            "{6}" +                
                    "</div>" +
                    "<hr>"+
                "</div>";

        tweetHtml = tweetHtml.format(
                tweet.user_pic, //0.pic
                i + 1,          //1
                tweet.user,     //2
                tweet.user_screenName,  //3
                tweet.user_followers,
                tweet.retweetCount,
                urlify(tweet.text));




        $("#tweetDiv").append(tweetHtml);
    }
}

String.prototype.format = function() {
    var content = this;
    for (var i = 0; i < arguments.length; i++) {
        var replacement = '{' + i + '}';
        content = content.replace(replacement, arguments[i]);
    }
    return content;
};

/*
 * http://stackoverflow.com/questions/1500260/detect-urls-in-text-with-javascript
 * @param {type} text
 * @returns {unresolved}
 */
function urlify(text) {
    var urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, function(url) {
        return '<a href="' + url + '" target="_blank">' + url + '</a>';
    })
    // or alternatively
    // return text.replace(urlRegex, '<a href="$1">$1</a>')
}