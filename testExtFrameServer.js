
var tag= "[[extension frame]]>";

console.log(getTime(), tag,"### running extension frame ");

var windowMap = (function(){

	var windowTable = [];

	return {

		addWindowInTable: function(newWinObj) {

			var i;
			var hit = false;
			for(i=0; i< windowTable.length; i++) {
				if(windowTable[i].source === newWinObj.source) {
					hit = true;
					break;
				}
			}

			if(hit === false) {
				console.log(getTime(), tag,"!! incoming new windows obj");
				windowTable.push(newWinObj);		
			}
		},
		getWindowTable: function() {
			return windowTable;
		}
	};
})();

function messageHandler(event) {
	console.log(getTime(), tag,"OhMyGod! I got message.", event);
	if(event.data.action === "helloExtensionFrame") {
			var source = event.data.source;
			var origin = event.data.origin;
			windowMap.addWindowInTable({source: source, origin: origin});	
			var msgObj = {
				action: "ALoHa", 
				location: location.href
			};
			windowPostMessage(source, msgObj, origin);
	}
}

$("document").ready(function() {

	if(window.addEventListener) {
		window.addEventListener("message", messageHandler);
	} else {
		window.attachEvent("onmessage", messageHandler);
	}

	var msgObj = {
			action: "EXTENSION_FRAME_IS_READY", 
			location: location.href
		};

	console.log(getTime(), tag, "***handshake*** broadcast EXTENSION_FRAME_IS_READY");
	windowPostMessage(window.top, msgObj, "*");
});
