function runTest() {

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


	$("#btnServer99").click(function() {
		document.getElementById("portalFrame").src = "http://10.1.200.99/signin";
	});

	$("#btnServerBeta").click(function() {
		document.getElementById("portalFrame").src = "https://tmdphststest.trendmicro.com/signin";
	});
}

$("document").ready(runTest);
