function runTest() {

	// ### check current user-agent

	document.getElementById("label_userAgent").innerHTML = navigator.userAgent;

	// ### run test 1: check online or not.
	if(navigator.onLine === true) {
		document.getElementById("online_fail").style.visibility = "hidden";
	} else {
		document.getElementById("online_ok").style.visibility = "hidden";
	}

	// ### run test 2: check online or not.
	if(document.getElementById("extensionFrame") == undefined) {
		document.getElementById("extFrame_ok").style.visibility = "hidden";
	} else {
		document.getElementById("extFrame_fail").style.visibility = "hidden";
	}

	document.getElementById("timestamp").innerHTML = (new Date()).toString();
}

$("document").ready(runTest);
