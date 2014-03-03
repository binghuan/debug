if(console && console.log) {
	//
} else {
	var console = {log: function(){}};
}

console.log("checkpoint 20131230");

function eventReceiver(event) {
	console.log("main frame get event: " + getTimestamp());
	console.log(event);
}

console.log("checkpoint 10");

var iframe;
function iframeEventHandler(event) {

	console.log("+ iframeEventHandler");
	iframeDocument = document.getElementById("iframe").contentWindow.document;
	console.log("mainFrame detect iframe is ready !!");
	var scripWidthCode = document.getElementById("iframe").contentWindow.document.createElement('script');    
	scripWidthCode.type ='text/javascript';    
	scripWidthCode.innerText ="alert('oh ya , i am in')";
	//document.getElementById("iframe").contentWindow.document.getElementsByTagName('head')[0].appendChild(scripWidthCode);
	$('#iframe').contents().find('head').append('<script type="text/javascript" src="http://127.0.0.1/injectedScript.js"></script>');


	var scripWidthSrc = iframeDocument.createElement('script');    
	scripWidthSrc.type ='text/javascript';    
	scripWidthSrc.src ='http://abc.com/abc.js';
	iframeDocument.getElementsByTagName('head')[0].appendChild(scripWidthSrc);
}

function addEvent(eventName, elementWindow, fun) {
	if(elementWindow.addEventListener) {
		elementWindow.addEventListener(eventName, fun, false);
	} else {
		elementWindow.attachEvent("on" + eventName, fun);
	}
}

$("document").ready(function() {

	console.log("main frame dcument is ready !!");

	iframe = document.getElementById("iframe");
	/*
	iframe = document.createElement("iframe");
	iframe.src="testPostMsgIframe.html";
	iframe.id="ifarme";
	iframe.width = "320pt";
	iframe.height = "480pt";
	addEvent("load", iframe, function(event) {
		alert("iframe is loaded!!");
	});
	document.body.appendChild(iframe);
	*/

	addEvent("message", window, eventReceiver);

	$("#postMessage").click(function() {
		console.log("ready to post message");
		var obj = {"actionType": 10001, "data": "test"};

		windowPostMessage(document.getElementById("iframe").contentWindow, JSON.stringify(obj), "*");
		console.log("--> done");
	});

	$("#postMessageJson").click(function() {
		console.log("ready to post message");
		var obj = {actionType: 10001, data: "test"};
		windowPostMessage(document.getElementById("iframe").contentWindow, obj, "*");
		console.log("--> done");
	});

});

(function abc () {

	var a = function () {
		alert("oh ya");
	}

	overriedFunctionIframeOnload = a;

})();

