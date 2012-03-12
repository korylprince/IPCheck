$(document).ready(function() {
    checkCookie();
    $("#submitbutton").button();
    $("#submitbutton").click(function(){checkAuth();});
    $("#username").keyup(function(e) {if(e.keyCode == 13) {checkAuth();}});
    $("#password").keyup(function(e) {if(e.keyCode == 13) {checkAuth();}});
});

//Show any errors
function showError(error) {
    $("#warning").hide();
    $("#warning").html(error);
    $("#warning").fadeIn();
    var t=setTimeout("hideError()", 7000);  
}

function hideError() {
    $("#warning").fadeOut();
}

//Check if already logged in
function checkCookie() {
    if ($.cookie("sessionID")){
        window.location = "list.html";
    }
}

//Check if user authentication is successful
function checkAuth() {
    $("#testwrapper").remove();
    var username = $("#username").val();
    var password = $("#password").val();
    if (username == ""||password == "") {
        showError("You must enter a Username and Password!");
        return -1;
    }
    var data = {"username":username,"password":password};
    $.ajax({
        type: "POST",
        url: "auth/login.php",
        data: {"data":data},
        dataType: "json",
        success: function(returndata){
            if (returndata.login == "True") {
                // fix cookie for directory
                var cookiepath = window.location.pathname.substr(0,window.location.pathname.lastIndexOf("/"));
                $.cookie("sessionID",returndata.sessionID, { path: cookiepath });
                window.location = "list.html";
            }
            else if (returndata.login == "Restricted") {
                showError("Unknown Username or Bad Password!");
            }
            else if (returndata.login == "Error") {
                showError("Unknown Error! Error Code: "+errorCode); 
            }
            else {
                showError("Unknown Error! Error Code: "+returndata.login);
            }
        },
        error: function() {
            showError("Unknown Error! Error Code: Server001"); //Ajax did not go through. Check Server.
        }
    });
}
