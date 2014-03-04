
function sayHelloToExtFrame() {
	var msgObj = {
		action: "hello"
	};
	windowPostMessage(window.top, msgObj, "*");
}

function checkVariable() {
	alert(ready);
}