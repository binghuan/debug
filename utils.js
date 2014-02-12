
function getTimestamp() {
		return (new Date()).getTime();
}

if(!window.addEventListener) {

	console.log("replace postMesasge!!");

	windowPostMessage = window.postMessage;
	window.postMessage = function (message, targetOrigin) {
		if((typeof message) === "object") {
			message = JSON.stringify(message);
		}
		windowPostMessage(message, targetOrigin);
	};
}


