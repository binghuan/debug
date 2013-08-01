// sub action list is for setup build sage.
var ACTION_OF_TEST = {
	REQUEST_SET_TEST_BUILD_STAGE:		33575001,
	RESULT_SET_TEST_BUILD_STAGE:		33575002,
	REQUEST_GET_TEST_BUILD_STAGE:		33575003,
	RESULT_GET_TEST_BUILD_STAGE:		33575004,

	// sub actionType is for WTP testing
	REQUEST_SET_WTP_HOST_ADDRESS:		33575011,
	RESULT_SET_WTP_HOST_ADDRESS:		33575012,
	REQUEST_GET_WTP_HOST_ADDRESS:		33575013,
	RESULT_GET_WTP_HOST_ADDRESS:		33575014,

	// show error nofity enabled
	REQUEST_SET_ERROR_NOTIFY_ENABLED:		33575021,
	RESULT_SET_ERROR_NOTIFY_ENABLED:		33575022,
	REQUEST_GET_ERROR_NOTIFY_ENABLED:		33575023,
	RESULT_GET_ERROR_NOTIFY_ENABLED:		33575024,

	REQUEST_LOG: 33575099,
	RESULT_LOG: 33575100,
	
	// show error nofity enabled
	REQUEST_SET_LOG_LEVEL:		33575031,
	RESULT_SET_LOG_LEVEL:		33575032,
	REQUEST_GET_LOG_LEVEL:		33575033,
	RESULT_GET_LOG_LEVEL:		33575034,
	
	REQUEST_SET_LOG2FILE_ONOFF:	33575035,
	RESULT_SET_LOG2FILE_ONOFF:		33575036,
	REQUEST_GET_LOG2FILE_ONOFF:	33575037,
	RESULT_GET_LOG2FILE_ONOFF:		33575038
};


function getCurrentStage() {
	window.top.postMessage({actionType: ACTION_OF_TEST.REQUEST_GET_TEST_BUILD_STAGE}, "*");
}

function getCurrentLogLevel() {
	window.top.postMessage({actionType: ACTION_OF_TEST.REQUEST_GET_LOG_LEVEL}, "*");
}

function checkIsLog2FileEnabled() {
	window.top.postMessage({actionType: ACTION_OF_TEST.REQUEST_GET_LOG2FILE_ONOFF}, "*");
}

$('document').ready(function() {
	console.log("ready");


	getCurrentStage();
	getCurrentLogLevel();
	checkIsLog2FileEnabled();

	window.top.postMessage({actionType: ACTION_OF_TEST.REQUEST_GET_WTP_HOST_ADDRESS}, "*");
	window.top.postMessage({actionType: ACTION_OF_TEST.REQUEST_GET_ERROR_NOTIFY_ENABLED}, "*");	
	
	console.log("go");
	
	$("#button_generateLog").click(function() {
		console.log("button_generateLog");
		window.top.postMessage({actionType: ACTION_OF_TEST.REQUEST_LOG}, "*");	
		
	});

	$('#button_getStage').click(function() {
		console.log("button_getStage");
		getCurrentStage();
	});

	$('#button_getWtpUrl').click(function() {
		console.log("button_getWtpUrl");
		window.top.postMessage({actionType: ACTION_OF_TEST.REQUEST_GET_WTP_HOST_ADDRESS}, "*");
	});
	
	
	$('#button_dev_test').click(function() {
		console.log("button_dev_test");
		window.top.postMessage( 
			{actionType: ACTION_OF_TEST.REQUEST_SET_TEST_BUILD_STAGE,
				stage: "dev-test"}, "*");
		getCurrentStage();
	});
	
	$('#button_dev').click(function() {
		console.log("button_dev");
		window.top.postMessage( 
			{actionType: ACTION_OF_TEST.REQUEST_SET_TEST_BUILD_STAGE,
				stage: "dev"}, "*");
		getCurrentStage();
	});
	
	$('#button_beta').click(function() {
		console.log("button_beta");
		window.top.postMessage( 
			{actionType: ACTION_OF_TEST.REQUEST_SET_TEST_BUILD_STAGE,
				stage: "beta"}, "*");
		getCurrentStage();
	});
	
	$('#button_ebeta').click(function() {
		console.log("button_ebeta");
		window.top.postMessage( 
			{actionType: ACTION_OF_TEST.REQUEST_SET_TEST_BUILD_STAGE,
				stage: "ebeta"}, "*");
		getCurrentStage();
	});

	$('#button_enabled').click(function() {
		console.log("button_enabled");
		window.top.postMessage( 
			{actionType: ACTION_OF_TEST.REQUEST_SET_ERROR_NOTIFY_ENABLED,
				enabled: true}, "*");
	});

	$('#button_disabled').click(function() {
		console.log("button_disabled");
		window.top.postMessage( 
			{actionType: ACTION_OF_TEST.REQUEST_SET_ERROR_NOTIFY_ENABLED,
				enabled: false}, "*");
	});

	$('#button_wtpUrl').click(function() {
		console.log("button_wtpUrl");
		var sentObj = {actionType: ACTION_OF_TEST.REQUEST_SET_WTP_HOST_ADDRESS,
				address: document.getElementById('wtpUrl').value};
		window.top.postMessage( sentObj, "*");
		console.log("Ready to set wtp host address: ");
		console.log(sentObj);
	});

	$('#button_getLogLevel').click(function() {
		getCurrentLogLevel();
	});

	$('#button_note').click(function() {
		console.log("button_note");
		var sentObj = {actionType: ACTION_OF_TEST.REQUEST_SET_LOG_LEVEL,
				LogLevel: "Xnote"};
		window.top.postMessage( sentObj, "*");
		console.log("sent Request:", sentObj);
	});
	$('#button_checkpoint').click(function() {
		console.log("button_checkpoint");
		var sentObj = {actionType: ACTION_OF_TEST.REQUEST_SET_LOG_LEVEL,
				LogLevel: "Xchkpt"};
		window.top.postMessage( sentObj, "*");
		console.log("sent Request:", sentObj);
	});
	$('#button_exception').click(function() {
		console.log("button_exception");
		var sentObj = {actionType: ACTION_OF_TEST.REQUEST_SET_LOG_LEVEL,
				LogLevel: "Xcept"};
		window.top.postMessage( sentObj, "*");
		console.log("sent Request:", sentObj);
	});

	$('#button_getLog2File').click(function() {
		checkIsLog2FileEnabled();
	});

	$('#button_log2file_on').click(function() {
		console.log("button_log2file_on");
		var sentObj = {actionType: ACTION_OF_TEST.REQUEST_SET_LOG2FILE_ONOFF,
				setLog2FileEnabled: true};
		window.top.postMessage( sentObj, "*");
		console.log("sent Request:", sentObj);
	});
	$('#button_log2file_off').click(function() {
		console.log("button_log2file_off");
		var sentObj = {actionType: ACTION_OF_TEST.REQUEST_SET_LOG2FILE_ONOFF,
				setLog2FileEnabled: false};
		window.top.postMessage( sentObj, "*");
		console.log("sent Request:", sentObj);
	});

	window.addEventListener("message", function(event) {
		var action = event.data.actionType;
		switch(action) {
			case ACTION_OF_TEST.RESULT_GET_TEST_BUILD_STAGE:
				console.log("Receive RESULT_GET_TEST_BUILD_STAGE:");
				console.log(event);
				$('#stage_value').html(event.data.stage);
				break;
			case ACTION_OF_TEST.RESULT_GET_WTP_HOST_ADDRESS:
				console.log("Receive RESULT_GET_WTP_HOST_ADDRESS:");
				console.log(event);
				document.getElementById('wtp_host_url').innerHTML = event.data.address;
				break;
			case ACTION_OF_TEST.RESULT_GET_ERROR_NOTIFY_ENABLED:
				console.log("Receive RESULT_GET_ERROR_NOTIFY_ENABLED:");
				console.log(event);
				document.getElementById('errorNotifyEnabled').innerHTML = event.data.enabled;
				break;
			case ACTION_OF_TEST.RESULT_GET_LOG2FILE_ONOFF:
				console.log("Receive RESULT_GET_LOG2FILE_ONOFF:");
				console.log(event.data);
				document.getElementById('log2file_value').innerHTML = event.data.isLog2FileEnabled;
				break;				
			case ACTION_OF_TEST.RESULT_GET_LOG_LEVEL:
				console.log("Receive RESULT_GET_LOG_LEVEL:");
				console.log(event.data);
				document.getElementById('logLevel_value').innerHTML = event.data.LogLevel;
				break;
			case ACTION_OF_TEST.RESULT_LOG:
				console.log("Receive RESULT_LOG:");	
				console.log(event.data);
				//document.getElementById('logLevel_value').innerHTML = event.data.isLog2FileEnabled;
				break;
		}
	});
});
