console.log('---');


var config = {
	count: 0,
	length: 0,
	base64: false
}

var testResult = {
	startTime:"",
	endTime:""
}



function getPreviousScore() {
	var previousScore = localStorage.SCORE;
	var result = [];
	if(previousScore == null || previousScore === "undefined") {
		result = [];
	} else {
		result = JSON.parse(previousScore);
	}

	return result;
}



function storeScore(data) {
	localStorage.SCORE = JSON.stringify(data);
}

function showHistory(scoreData) {
	var text = JSON.stringify(scoreData);
	do{
		text = text.replace('},{', '<br>');
	} while(text.indexOf('},{') !== -1 );
	$("#resultText").html(text);
}

var labelCounter = document.getElementById('receiveCounter');
$("document").ready(function() {
	console.log('Document is ready');
	restoreLastConfig();

	showHistory(getPreviousScore());

	$("#button_start").click(function() {
		console.log('start postMessage profiling.');

		config.length = $("#testLength").val();
		config.count = $("#testCount").val();
		if($("#optionsBase64On").prop('checked') === true) {
			config.base64 = true;
		} else {
			config.base64 = false;
		}

		storeLastConfig(config);
		counterOfReceiver = 0;
		if(w == null) {
			startWorker();
		}

		testResult.startTime = (new Date()).getTime();

		w.postMessage({
        	action: 'start',
        	config: config
        });

	});
});

var w;

var counterOfReceiver = 0;


function storeLastConfig(config) {
	localStorage.TEST_LENGTH = $("#testLength").val();
	localStorage.TEST_COUNT = $("#testCount").val();
	localStorage.ENCODE_BASE64 = JSON.stringify(config.base64);
}

function restoreLastConfig() {

	if(localStorage.TEST_LENGTH == null) {
		$("#testLength").val("5000");
	} else {
		$("#testLength").val(localStorage.TEST_LENGTH);
	}

	if(localStorage.TEST_COUNT == null) {
		$("#testCount").val(60);
	} else {
		$("#testCount").val(localStorage.TEST_COUNT);
	}

	var result = localStorage.ENCODE_BASE64;
	if(result == null) {
		result = 'false';
	}

	result = JSON.parse(result);
	if(result === true) {
		$("#optionsBase64On").prop('checked', true);
		$("#optionsBase64Off").prop('checked', false);
	} else {
		$("#optionsBase64On").prop('checked', false);
		$("#optionsBase64Off").prop('checked', true);
	}
}



function startWorker() {
    if(typeof(Worker) !== "undefined") {
        if(typeof(w) == "undefined") {
            w = new Worker("postmessageProfileWorker.js");
        }

		w.onmessage = function(event) {

			//console.log('incoming: ', event);

			if(config.base64 === true) {
				atob(event.data);
			}

        	counterOfReceiver = counterOfReceiver + 1;

			labelCounter.innerText = counterOfReceiver;
            console.log('ReceiveCount: ' + counterOfReceiver);

            if(counterOfReceiver === parseInt(config.count)) {
            	console.log('END TEST');
            	testResult.endTime = (new Date()).getTime();
            	var result = ' ' + (testResult.endTime - testResult.startTime)/1000 + 's';
            	$("#run_time").text(result);
            	config.runTime = result;

            	var scoreData = getPreviousScore();
            	if(scoreData.length > 5) {
            		scoreData.shift();
            	}

            	console.log('before:  ' + JSON.stringify(scoreData));

            	scoreData.push(config);
            	console.log('after:  ' + JSON.stringify(scoreData));

            	console.log(scoreData.length);

            	storeScore(scoreData);

            	showHistory(getPreviousScore());
            }

        };

    } else {
        //document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Workers...";
        console.warn("Sorry, your browser does not support Web Workers...");
    }
}

function stopWorker() {
    w.terminate();
    w = undefined;
}
