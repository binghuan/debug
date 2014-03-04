
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

function sayHelloToExtFrame() {
	var msgObj = {
		action: "hello",
		location: location.href
	};
	windowPostMessage(window.top, msgObj, "*");
}
