
var tag= "[[extension frame]]>";

console.log(tag, "### running extension frame ");



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
				console.log(tag, "!! incoming new windows obj");
				windowTable.push(newWinObj);

				
				
			}
		},
		getWindowTable: function() {
			return windowTable;
		}
	};
})();

function messageHandler(event) {
	console.log(tag, "Oh shit! I got message.", event);
	windowMap.addWindowInTable({source: event.source, origin: event.origin});
	event.source.postMessage("action:helloIAmExtensionFrame", event.origin);

}

if(window.addEventListener) {
	window.addEventListener("message", messageHandler);
} else {
	window.attachEvent("onmessage", messageHandler);
}