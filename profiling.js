
$('document').ready(function() {

	console.log('document ready !!');
	textPingResult = document.getElementById('text_pingStatus');
	testFrame = document.getElementById("browserTestFrame");
	$('#button_testNetSpeed').click(function() {
		runPingTest();
	});
	$('#button_testBrowserPerformance').click(function() {
		testFrame.src = URL_PERFORMANCE_TEST;
	});

	// run first time on load.
	runPingTest();
	testFrame.src = URL_PERFORMANCE_TEST;
});


var URL_PERFORMANCE_TEST = "http://www.speed-battle.com/speedtest_e.php";
var URL_DOWNLOAD_FILE = "https://www.directpass.com";
var textPingResult;
var pingResult = "";
var totalTime = 0;

var testFrame ;

function runPingTest() {
	console.log("+ runPingTest");
	textPingResult.innerHTML = "";
	totalTime = 0;
	logPingResult("Pinging www.directpass.com :");
	var i;
	for(i=0; i< 5; i++) {
		ping(i);
	}
}

function logPingResult(msg) {
	var previousLog = textPingResult.innerHTML;
	textPingResult.innerHTML = previousLog + " <br> " +msg;
	//console.log(".. " + textPingResult.innerHTML);
}

function endOfPingTest() {
	logPingResult("--- www.directpass.com ping statistics ---");
	logPingResult("Average: " + totalTime/5 + "ms");
}

function ping(count) {
	console.log("+ testNetworkSpeed");
	var timeStart = (new Date()).getTime();
	$.ajax({
		url: URL_DOWNLOAD_FILE,
		type: "GET",
		contentType:"text/plain",
		dataType: 'jsonp',
		complete:function(data) {
			var timeEnd = (new Date()).getTime();
			console.log('Complete: ', data);
			if(data.status === 200) {
				var diffTime = (timeEnd - timeStart);
				console.log("ping success: time=" + diffTime + " ms");
				totalTime += diffTime;
				logPingResult("Reply from www.directpass.com: time=" + diffTime + "ms");

				if(count === 4) {
					setTimeout(endOfPingTest, 1000);
				}
			}
		},
		done: function(data) {
			console.log('Done: ', data);
		},
		success: function(data) {
			console.log('Success: ', data);
		},
		error: function(data) {
			//console.log(data);
		}
	});
}

