function windowPostMessage(elementWindow, messageOrObject, targetOrigin, passByString) {

	if( (passByString === true) || (navigator.userAgent.indexOf("Trident/4.0") != -1)||
		(navigator.userAgent.indexOf("Trident/5.0") != -1)) {
		if(typeof messageOrObject === "object") {
			messageOrObject = JSON.stringify(messageOrObject);
		}
	}

	elementWindow.postMessage(messageOrObject, targetOrigin);
}

function getTimestamp() {
		return (new Date()).getTime();
}

function getTime() {
	var date = new Date();
	return (date.getMonth()+1)+"-"+date.getDate()+ " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + "." + date.getMilliseconds();
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

if (typeof console === "undefined" || typeof console.log === "undefined") {
	console = {
		log: function(){},
		debug: function(){},
		warn: function(){},
		error: function(){},
		info: function(){}
	};
}
