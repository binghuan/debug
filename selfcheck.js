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


	var portalFrame = document.getElementById("portalFrame")
	$("#btnServer99").click(function() {
		console.log("### >> ready to load url: http://10.1.200.99/signin");
		$("#btnServerBeta").attr("class", 'btn btn-default');
		$("#btnServer99").attr("class", 'btn btn-primary');
		portalFrame.src = location.href.replace("selfcheck.html", "blank.html");
		setTimeout(function(){
			portalFrame.src = "http://10.1.200.99/signin";	
		}, 1000)
	});

	$("#btnServerBeta").click(function() {
		console.log("### >> ready to load url: https://tmdphststest.trendmicro.com/signin");
		$("#btnServer99").attr("class", 'btn btn-default');
		$("#btnServerBeta").attr("class", 'btn btn-primary');
		portalFrame.src = location.href.replace("selfcheck.html", "blank.html");
		setTimeout(function(){
			portalFrame.src = "https://tmdphststest.trendmicro.com/signin";
		}, 1000)
		
	});

	document.getElementById("timestamp").innerHTML = (new Date()).toString();
}

$("document").ready(runTest);
