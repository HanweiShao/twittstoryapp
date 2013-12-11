$(document).ready(function() {
    
    $("#AddSbmit").on("click", LogoutAndLogin);    
    
    $("#deleteAccount").on("click", function(){         
        $("#AccountList").find('input:radio').each(function() {
            $("<input type='checkbox' />")
                    .attr({ name: this.name,
                        value: this.value,
                        "data-theme": "c",
                        id: this.id
                    }).insertBefore(this);
        }).remove();
        $("#deleteBtnDiv").css("display","block");
        $("#accAddDelDiv").css("display","none");
        $("#AccountList").trigger("create");
    });
        
    $("#cancelDelete").on("click", CancelDelete);
    $("#deleteSubmit").on("click", function() {
        if (confirm("Are you sure you want to delete ?"))
        {            
            $("#AccountList").find('input:checked').each(function() {
                accManagement.deleteAccount(this.value, function(rs) {
                    if (rs) {
                        console.log("delete success");
                    }
                })
            }).remove();                     
        }
        CancelDelete();
        RenderAccountRadio();
    });


    accManagement.init();
//    accManagement.insertAccount(
//                        "1234",
//                        CryptoJS.AES.encrypt("4567", "user's IMEI"),
//                        "@HanweiShao",
//                        0,
//                        function(){});
//
//    accManagement.insertAccount(
//                        "1235",
//                        CryptoJS.AES.encrypt("4567", "user's IMEI"),
//                        "@HanweiShao123",
//                        0,
//                        function(){});
//                        
//    accManagement.insertAccount(
//                        "1236",
//                        CryptoJS.AES.encrypt("4567", "user's IMEI"),
//                        "@HanweiShao456",
//                        1,
//                        function(){}); 
    RenderAccountRadio();
});

function CancelDelete()
{
    $("#AccountList").find('input:checkbox').each(function() {
            $("<input type='radio' />")
                    .attr({name: this.name,
                        value: this.value,
                        "data-theme": "c",
                        id: this.id
                    }).insertBefore(this);
        }).remove();
        $("#AccountList").trigger("create");
        $("#accAddDelDiv").css("display","block");
        $("#deleteBtnDiv").css("display","none");        
}

function RenderAccountRadio()
{
    $("#AccountList").empty();
    accManagement.getAllAccount(function(rs) {
        rs.forEach(function(account) {
            var accountTemplate = '<input type="radio"  name="account" data-theme="c" id="{0}" value="{0}" {2} />' +
                                    '<label for="{0}">{1}</label>';
            var checked = account.isusing? "checked='checked'" : ""; 
            $("#AccountList").append(String.format(accountTemplate, account.username, account.twitterid, checked));
            $("#AccountList").trigger("create");
            $("#" + account.username).click(function(){
                console.log("click");  
                accManagement.changeUsingAccount($(this).val(), LogoutAndLogin);
            });
        });
    });
   
}

function LogoutAndLogin()
{
    $("#errorMsg").html("");
    if (authenticity_token != "")
    {
        TwitterLogout();
    }
    else
    {
        loginTwittStory();
    }
}

var twitterid = "";
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
    var login="", pwd="";
    

    if(!$("#loginEmail").val())
    {  
        login =  $("#loginEmail").val();
        pwd= $("#loginPwd").val();
    }
    else
    {
        var usingAcc = accManagement.getUsingAccount();
        login = usingAcc.accountname;
        pwd = CryptoJS.AES.decrypt(usingAcc.passpord, "user's IMEI");
    }
    
    
    $.ajax({
        dataType: "html",
        url: "https://api.twitter.com/oauth/authenticate",
        type: "POST",
        data: {
            authenticity_token: authenticity_token,
            oauth_token: oauth_token,
            "session[username_or_email]": login,
            "session[password]": pwd
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

                //save        
                accManagement.insertAccount(
                        $("#loginEmail").val(), 
                        CryptoJS.AES.encrypt($("#loginPwd").val(), "user's IMEI"),
                        twitterid,
                        RenderAccountRadio);


                //        console.log(oauth_verifier);
                //        $("#inputSearch").val("home:@" + twitterid);
                $("#LoginPopup").popup("close");
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
                LogoutAndLogin();
            })
            .fail(function(jqxhr, textStatus, error) {
                var err = textStatus + ", " + error;
                console.log("Request Failed: " + err);
            });//end of ajax  ;

}