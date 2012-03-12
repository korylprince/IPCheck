$(document).ready(function() {
    //preload images
    $.get("images/green.png");$.get("images/red.png");
    checkCookie();
});

//Check if already logged in. If not move back to index. If so then get iplist.
function checkCookie() {
    if ($.cookie("sessionID")){
        $.ajax({
            type: "POST",
            url: "auth/ipcheck.php",
            data: {"sessionID":$.cookie("sessionID")},
            dataType: "json",
            success: function(data) {
                if (data.errorCode) {
                    var cookiepath = window.location.pathname.substr(0,window.location.pathname.lastIndexOf("/"));
                    $.cookie("sessionID",null, { path: cookiepath });
                    window.location = "index.html"
                }
                else {
                    ipParser(data);
                }
            },
            error: function() {
                       $("body").append("<div class=\"ui-widget-overlay\"><img id=\"pingload\" src=\"images/bigloading.gif\" /></div>");
                       $(".ui-widget-overlay").css("height",($("html").height()));
                       $(".ui-widget-overlay").click(function(){destroyPing();});
                       $(".ui-widget-overlay").attr("id", "Error");
                       displayPing("There has been an Error!","Error");
                   }
        });
    }
    else{
        var cookiepath = window.location.pathname.substr(0,window.location.pathname.lastIndexOf("/"));
        $.cookie("sessionID",null, { path: cookiepath });
        window.location = "index.html"
    }
}

//Logout of session
function logout() {
    $.get("auth/logout.php");
    var cookiepath = window.location.pathname.substr(0,window.location.pathname.lastIndexOf("/"));
    $.cookie("sessionID",null, { path: cookiepath });
    window.location = "index.html"
}

//Parse the data and attach it to the DOM
function ipParser(serverList) {
    //Add the main body to the DOM
    $("body").append("<div id=\"buttonwrapper\"><button id=\"logoutbutton\">Logout</button><input id='pingip' type='textbox' /><button id=\"pingbutton\">Ping</button></div>");
    $("#logoutbutton, #pingbutton").button();
    $("#logoutbutton").click(function(){logout();});
    $("#pingip").keyup(function(e) {if(e.keyCode == 13) {$("#pingbutton").trigger("click");}});
    $("#pingbutton").click(function(){
        var ip = $("#pingip").val();
        $("body").append("<div class=\"ui-widget-overlay\"><img id=\"pingload\" src=\"images/bigloading.gif\" /></div>");
        $(".ui-widget-overlay").css("height",($("html").height()));
        $(".ui-widget-overlay").click(function(){destroyPing();});
        $(".ui-widget-overlay").attr("id", ip);
        $("body").focus();
        getPing({"description":ip,"ip":ip});
    });
    $("body").append("<div id=\"ipwrapper\"></div>");
    $("#ipwrapper").append("<div class=\"hostbox section\" id=\"server\"><div class=\"hostbox centered\"><p>Servers</p></div></div>");
    $("#ipwrapper").append("<div class=\"hostbox section\" id=\"switch\"><div class=\"hostbox centered\"><p>Switches</p></div></div>");
    //Parse through results
    for (i=0;i<serverList.servers.length;i++) {
        addHost(serverList.servers[i],  "server");
    }
    for (i=0;i<serverList.switches.length;i++) {
        addHost(serverList.switches[i],  "switch");
    }
    alternate("server");
    alternate("switch");
}

//Parse the data and attach it to the DOM
function addHost(serverData, serverClass) {
    //Choose which serverClass to add it to and add relevant data.
    $("#"+serverClass).append("<div class=\"hostbox\" id=\""+serverData.description.replace(/ /g,"_")+"\"><div class=\"host\"><p>"+serverData.description+"</p></div><div class=\"ip\"><p>"+serverData.ip+"</p></div><div class=\"status "+serverData.status+"\"></div></div>");
    var host = "#"+serverData.description.replace(/ /g,"_");
    $(host).attr("title", ("Click to ping "+serverData.ip));
    //Create click function for ping
    $(host).click(function() {
        $("body").append("<div class=\"ui-widget-overlay\"><img id=\"pingload\" src=\"images/bigloading.gif\" /></div>");
        $(".ui-widget-overlay").css("height",($("html").height()));
        $(".ui-widget-overlay").click(function(){destroyPing();});
        $(".ui-widget-overlay").attr("id", serverData.ip);
        getPing(serverData);
    });
}

//Alternate classes for color changes
function alternate(section) {
    for (i=0;i<$("#"+section).children().length;i++) {
        if (i%2 != 0) {
            $("#"+$("#"+section).children()[i].id).css("background-color","#bbb");
            $("#"+$("#"+section).children()[i].id).children(".ip").css("background-color","#ccc");
        }
    }
}

//Send an ip and get ping data for it
function getPing(serverData) {
    var server = {"ip":serverData.ip};
    $.ajax({
        type: "POST",
        url: "auth/ping.php",
        data: {"data":server, "sessionID":$.cookie("sessionID")},
        dataType: "json",
        success: function(output){
            if (output.login == "Error") {logout();}
            displayPing(output.output,serverData)
        },
        //If there is an error use the ping function to display error.
        error: function() {
                   $("body").append("<div class=\"ui-widget-overlay\"><img id=\"pingload\" src=\"images/bigloading.gif\" /></div>");
                   $(".ui-widget-overlay").css("height",($("html").height()));
                   $(".ui-widget-overlay").click(function(){destroyPing();});
                   $(".ui-widget-overlay").attr("id", "Error");
                   displayPing("There has been an Error!","Error");
               }
    });
}

//Display the ping in a box
function displayPing(output,serverData) {
    //For error messages
    if(serverData=="Error") {
        var serverData = {"description":"Error","ip":"Error"};
    }
    if ($(".ui-widget-overlay").length && $("#ping").length == 0 && $(".ui-widget-overlay").attr("id") == serverData.ip) {
        $(".ui-widget-overlay").html("");
        $("body").append("<div id=\"ping\"><div id=\"pingheader\"><h1>Ping - "+serverData.ip+"</h1></div><div id=\"pingwrapper\"><span>"+serverData.description+"</span><div id=\"pingformbox\">"+output+"<div></div></div></div></div>");
        $("#ping").draggable();
    }
}

//Destroy the box
function destroyPing() {
    $("#ping").remove();
    $(".ui-widget-overlay").remove();
}
