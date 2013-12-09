$(document).ready(function() {
    $("#AddSbmit").on("click", AddAccount);
});

function AddAccount()
{
    $("#errorMsg").html("");
    if(authenticity_token != "")
    {           
        TwitterLogout();
    }
    else
    {       
        loginTwittStory();
    }
}

var twitterid="";
var authenticity_token = "";
var oauth_token = "";
var oauth_verifier = "";

/*
 * request TwittStory Login Page
 * @param {type} twitterpage
 * @returns {undefined}
 */
function  loginTwittStory() {
    $.ajax({
        dataType: "html",
        url: "http://www.twittstory.com/TwitterSignIn",
        type: "GET",
        xhrFields: {
            withCredentials: true
        }
    })
    .done(function(msg) {        
        //$("#loginSubmit").on("click", function() {
            TwitterLoginPageSubmit(msg);
        //});
    })
    .fail(function(jqxhr, textStatus, error) {
        var err = textStatus + ", " + error;
        console.log("Request Failed: " + err);
    });//end of ajax          
}

/*
 * input email/password and submit to Twitter
 */
function TwitterLoginPageSubmit(twitterpage)
{
    authenticity_token = $("input[name='authenticity_token']", twitterpage).val();
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
            //console.log(html);
            if ($(".error.notice p", html).length > 0)
            {                
                //account, password incorrect
                console.log("TwitterLoginPageSubmit incorrect!");
                $("#loginPwd").html("");
                $("#errorMsg").html($(".error.notice p", html).text());                
            }
            else
            {
                //account, password correct
                console.log("TwitterLoginPageSubmit correct!");
                $("#loginEmail").html("");
                $("#loginPwd").html("");

                TwitterLoginPageSubmitConfirm(html);
                //return html;
                //$("#errorMsg").html("correct");
                
                //console.log(html);
            }
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
    .done(function(page) {
        console.log("TwitterLoginPageSubmitConfirm Done!");
        //console.log(page);
        twitterid = $("span.name", page).html();
        oauth_verifier = $("a.maintain-context", page).attr("href");
        oauth_verifier = oauth_verifier.substring(oauth_verifier.indexOf("oauth_verifier=") + "oauth_verifier=".length);
//        console.log(oauth_verifier);
//        $("#inputSearch").val("home:@" + twitterid);
        $("#LoginPopup").popup("close");
        
        //add a new account
        var accountTemplate = '<input type="radio" name="account" data-theme="c" id="{0}" value="{1}" checked="checked" />'+
                               '<label for="{0}">{2}</label>';
                        
        $("#AccountList").append(String.format(accountTemplate, "acc0", twitterid, "@"+twitterid));
        $("#AccountList").trigger("create");
        //LoginCallback(page);
    })
    .fail(function(jqxhr, textStatus, error) {
        var err = textStatus + ", " + error;
        console.log("Request Failed: " + err);
    });//end of ajax  ;
}

/*
 * 
 */
function LoginCallback(page)
{
    var urlstr = String.format("http://www.twittstory.com/TwitterSignInCallback?oauth_token={0}&oauth_verifier={1} ",
                    oauth_token, oauth_verifier);
    console.log(urlstr);
    $.ajax({
        dataType: "html",
        url: urlstr,
        type: "GET",
        xhrFields: {
            withCredentials: true
        }
    })
    .done(function(html) {
        //console.log("LoginCallback Done!");
        // successfully logged in save to database

    })
    .fail(function(jqxhr, textStatus, error) {
        var err = textStatus + ", " + error;
        console.log("Request Failed: " + err);
    });//end of ajax  ;
}


function TwitterLogout()
{
     $.ajax({
        dataType: "html",
        url: "https://twitter.com/logout",
        type: "POST",
        data: {
            authenticity_token: authenticity_token
        },
        xhrFields: {
            withCredentials: true
        }
    })
    .done(function(page) {
        authenticity_token = "";   
        AddAccount();
    })
    .fail(function(jqxhr, textStatus, error) {
        var err = textStatus + ", " + error;
        console.log("Request Failed: " + err);
    });//end of ajax  ;
    
}