function runTest() {

	// ### check current user-agent

	document.getElementById("label_userAgent").innerHTML = navigator.userAgent;

	// ### run test 1: check online or not.
	if(navigator.onLine === true) {
		document.getElementById("online_fail").style.visibility = "hidden";
	} else {
		document.getElementById("online_ok").style.visibility = "hidden";
	}

	// ### run test 2: check extension frame exist or not.
	setInterval(checkExtFrameExist, 1000);

	document.getElementById("timestamp").innerHTML = (new Date()).toString();
}


function checkExtFrameExist() {

	if(document.getElementById("extensionFrame") == undefined) {
		document.getElementById("extFrame_ok").style.visibility = "hidden";
		//console.log('is extension frame existed: no');
	} else {
		document.getElementById("extFrame_fail").style.visibility = "hidden";
		//console.log('is extension frame existed: yes');
	}
}

$("document").ready(runTest);
