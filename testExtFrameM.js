var tag = "[[main frame]]";

console.log(getTime(), tag,"#### running testExtFrameM.js ---> start");


function testDelayExtFrameLoad() {
	if(location.href.indexOf("delayExtFrame") != -1){

	} else {
		location.href = location.href + "?delayExtFrame=3000";
	}
	
}

function reloadThisPage() {
	var newLoc = location.href.replace("?delayExtFrame=3000", "");	
	location.href = newLoc;
}

function action1() {
	console.log(getTime(), tag,"--> running action1");
}

function action2() {
	
}

function actionHelloA() {
	console.log(getTime(), tag,"--> running actionHelloA");
	
}

function actionHelloB() {
	console.log(getTime(), tag,"--> running actionHelloB");
}

function actionHelloC() {
	console.log(getTime(), tag,"--> running actionHelloC");
}


console.log(getTime(), tag, "OoO running testExtFrameM.js ---> done");