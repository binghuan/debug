
var tag= "[[frame C]]>";

console.log(tag, "### running framc C");

function messageHandler(event) {
	console.log(tag, "Oh shit! I got message too.", event);
}

function loadEventHandler() {
	console.log(tag, "I will say hello to extension frame");
	//window.top.postMessage("action:hello", "*");
	window.top.document.getElementById("extensionFrame").contentWindow.postMessage("action:helloIAmFrameC", "*");
}

if(window.addEventListener) {
	window.addEventListener("message", messageHandler);
	window.addEventListener("load", loadEventHandler);
} else {
	window.attachEvent("onmessage", messageHandler);
	window.attachEvent("onload", loadEventHandler);
}

function sayHelloToExtFrame() {
	window.top.document.getElementById("extensionFrame").contentWindow.postMessage("action:helloIAmFrameC", "*");
}
