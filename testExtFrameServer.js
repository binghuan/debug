
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
	console.log(getTime(), tag,"Oh shit! I got message.", event);
	windowMap.addWindowInTable({source: event.source, origin: event.origin});
	var msgObj = {
		action: "hello", 
		location: location.href,
		id: "extFrame"
	};

	windowPostMessage(event.source, msgObj, event.origin);

}

if(window.addEventListener) {
	window.addEventListener("message", messageHandler);
} else {
	window.attachEvent("onmessage", messageHandler);
}