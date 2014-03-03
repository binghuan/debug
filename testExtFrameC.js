
var tag= "frame [C]>";

console.log(getTime(), tag,"### running framc C");

function messageHandler(event) {
	console.log(getTime(), tag,"Oh shit! I got message too.", event);
}

function loadEventHandler() {
	console.log(getTime(), tag,"event - load");

}

function checkVariable() {
	alert(ready);
}

if(window.addEventListener) {
	window.addEventListener("message", messageHandler);
	window.addEventListener("load", loadEventHandler);
} else {
	window.attachEvent("onmessage", messageHandler);
	window.attachEvent("onload", loadEventHandler);
}

function sayHelloToExtFrame() {
	windowPostMessage(window.top.document.getElementById("extensionFrame").contentWindow, "action:helloIAmFrameC", "*");
}
