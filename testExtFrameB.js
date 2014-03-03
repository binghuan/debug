
function sayHelloToExtFrame() {
	window.top.document.getElementById("extensionFrame").contentWindow.postMessage("action:helloIAmFrameB", "*");
}

function checkVariable() {
	alert(ready);
}