


var errorCode = {
//error code
"ERR_SUCCESS":"0",
"ERR_AUTH_NOT_AUTHENTICATED":"94010001",
"ERR_PROFILE_DB_NOT_EXIST":"94010002",
"ERR_USER_LOCKOUT": "94010003",
"ERR_ID_PWD_NOT_MATCH": "94010004",
"ERR_USER_LOCKOUT_FOR_INPUT_WRONG_MASTER_PASSWORD": "94010005",
"ERR_DP_PASSWORD_CHANGED_ERROR":"99001042",
"ERR_DP_ACCOUNT_CHANGED_ERROR": "99001041",
"ERR_AUTH_KEY_EXPIRED": "99000009",
"ERR_AUTH_KEY_INVALID": "99000010"
};


var ACTION_OF_HAND_SHAKE = {
            WINDOW_CHECKIN: 210001,
            NOTIFY_EXTENSION_READY:210002,
            EXTENSION_READY:210003,
            NAVIGATE_URL: 210004
        };

function messageHandler(event) {


    if (event.origin !== "https://10.1.201.174" &&
		event.origin !== "pwm-mubeta.trendmicro.com" &&
		event.origin !== "tmdphststest.directpass.com") {
        return;
    }


	//console.log('Receive:', event.data);

    var eventData;
	try{
		eventData = JSON.parse(event.data);
	}catch(e) {

		return;
	}

    console.log("debug - actionType: ", eventData.actionType);

    if(event.data == undefined) {
        //console.log(event);
        return;
    }
    //console.log(getTime(), tag, "> extensionFrameMessageHandler");

    var msg;
    var action;
    if(event.message == undefined) {
        msg = event.data;
        //event.name = event.data.name;
        event.name = eventData.name;
        //event.message = event.data;
        event.message = eventData;
        //action = event.data.actionType;
        action = eventData.actionType;
    } else {
        action = event.message.actionType;
    }

	switch(action) {
	case ACTION_OF_HAND_SHAKE.EXTENSION_READY:
		runTest();
		break;
	case ACTION_OF_TEST.RESULT_GET_DPV3_STATUS:
		console.log('Receive: RESULT_GET_LOGIN_STATUS: ', event.message);

		var accountType = event.message.accountType;
		if(accountType === "" || accountType == undefined) {
			document.getElementById("accountType").innerHTML = "No data";
		} else {
			document.getElementById("accountType").innerHTML = accountType;
		}

		// ### check Pin state
		if(event.message.isMasterpinOk === true) {
			document.getElementById("pinFail").style.visibility = "hidden";
			document.getElementById("pinOk").style.visibility = "display";
		} else {
			document.getElementById("pinFail").style.visibility = "display";
			document.getElementById("pinOk").style.visibility = "hidden";
		}

		// ### check master pin table eixist
		if(event.message.isMasterpinTableExist === true ) {
			document.getElementById("pintableNo").style.visibility = "hidden";
		} else {
			document.getElementById("pintableYes").style.visibility = "hidden";
		}

		// ### check login status
		var erroCode = event.message.loginStatus;
		document.getElementById("loginStatus").innerHTML = erroCode;
		mappingLoginStatusErrorMsg(erroCode);

		// ### check User Settings
		document.getElementById("userSettings").innerText = JSON.stringify(event.message.userSetting, null, 4);

		break;
	}
}

if(window.addEventListener) {
	window.addEventListener("message", messageHandler);
} else {
	window.attachEvent("onmessage", messageHandler);
}


// sub action list is for setup build sage.
var ACTION_OF_TEST = {
	// BH_Lin@20140701	------------------------------------------------------->
	// purpose:
	REQUEST_GET_DPV3_STATUS:	40000001,
	RESULT_GET_DPV3_STATUS:	40000002,
	// BH_Lin@20140701	-------------------------------------------------------<

	//alert for firefox
	SHOW_ALERT : 33575039
};

function mappingLoginStatusErrorMsg(code) {

	var textField = document.getElementById("errorcodeMsg");
	textField.innerHTML  = code;

	if(code === errorCode.ERR_AUTH_NOT_AUTHENTICATED ) {
		textField.innerHTML  = "ERR_AUTH_NOT_AUTHENTICATED";
	} else if(code === errorCode.ERR_PROFILE_DB_NOT_EXIST ) {
		textField.innerHTML  = "ERR_PROFILE_DB_NOT_EXIST";
	} else if(code === errorCode.ERR_USER_LOCKOUT ) {
		textField.innerHTML  = "ERR_USER_LOCKOUT";
	} else if(code === errorCode.ERR_DP_PASSWORD_CHANGED_ERROR ) {
		textField.innerHTML  = "ERR_DP_PASSWORD_CHANGED_ERROR";
	} else if(code === errorCode.ERR_DP_ACCOUNT_CHANGED_ERROR ) {
		textField.innerHTML  = "ERR_DP_ACCOUNT_CHANGED_ERROR";
	} else if(code === errorCode.ERR_AUTH_KEY_EXPIRED ) {
		textField.innerHTML  = "ERR_AUTH_KEY_EXPIRED";
	} else if(code === errorCode.ERR_AUTH_KEY_INVALID ) {
		textField.innerHTML  = "ERR_AUTH_KEY_INVALID";
	}
}

var extensionFrame;

function runTest() {

	// ### check current user-agent
	console.log('>> runTest()');

	document.getElementById("label_userAgent").innerHTML = navigator.userAgent;

// ### run test 1: check online or not
	if(navigator.onLine === true) {
		document.getElementById("online_fail").style.visibility = "hidden";
	} else {
		document.getElementById("online_ok").style.visibility = "hidden";
	}

	setInterval(checkExtFrameExist, 1000);

	document.getElementById("timestamp").innerHTML = (new Date()).toString();

	if(mobilecheck() === true) {
		document.getElementById("typeOfPlatform").innerHTML = "Mobile";
	} else {
		document.getElementById("typeOfPlatform").innerHTML = "Desktop";
	}

	// ### check yamatoInfo
	if(window.yamatoInfo != null && yamatoInfo.proxyType != undefined) {
		document.getElementById("yamatoInfo").innerHTML = JSON.stringify(yamatoInfo);
	} else {
		document.getElementById("yamatoInfo").innerHTML = "No data";
	}


	// ### check DPV3 status
	extensionFrame = document.getElementById("extensionFrame");
	var msgObj = {};
	if(extensionFrame != undefined) {
		msgObj = {
			actionType: ACTION_OF_TEST.REQUEST_GET_DPV3_STATUS,
			name: "MessageFromGlobalPage"
		};

		windowPostMessage(window.top, msgObj, "*");
	} else {
		return;
	}
}


function checkExtFrameExist() {

	if(document.getElementById("extensionFrame") == undefined) {
		document.getElementById("extFrameStatus").innerHTML = "Not Found";
	} else {
		document.getElementById("extFrameStatus").innerHTML = "OK";
	}

    var head = $("head script");
    var hit = false;
    for(var i=0; i< head.length; i++) {
    //    console.log("check: " + head[i].src);
        if(head[i].src.indexOf("extensionFrame/content_script.js") != -1) {
            console.log("hit: " + head[i].src);
            hit = true;
            break;
        }
    }

    if(hit === true) {
        document.getElementById("contentScriptStatus").innerHTML = "OK";
    } else {
        document.getElementById("contentScriptStatus").innerHTML = "Not found";
    }
}

$("document").ready(function() {

	setTimeout(runTest(), 2000);
});


function windowPostMessage(elementWindow, messageOrObject, targetOrigin) {

	if( true || (navigator.userAgent.indexOf("Trident/4.0") !== -1)||
		(navigator.userAgent.indexOf("Trident/5.0") !== -1)) {
		if(typeof messageOrObject === "object") {
			messageOrObject = JSON.stringify(messageOrObject);
		}
	}

	if(elementWindow.postMessage != null) {

		elementWindow.postMessage(messageOrObject, targetOrigin);
	}
}

function getTimestamp() {
		return (new Date()).getTime();
}

function getTime() {
	var date = new Date();
	return (date.getMonth()+1)+"-"+date.getDate()+ " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + "." + date.getMilliseconds();
}

function getParameterByName(name) {
	name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
		results = regex.exec(location.search);
	return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

/*
03-17 01:18:44.228 V/InputDevice( 2527): ID[0]=0(0) Dn(0=>1)
*/


function serverErrorCodeMessageMapping(code) {
	var result = "";
	switch(code) {
		case 500:
			result = "500 Internal Server Error";
		break;
	}

	return result;
}

function getUrlPathWithoutDomainAndProtocol(url) {
	var urlDomain = getDomainFromUrl(url);
	var result = gIframeUrl.replace("https://" + urlDomain, "");
	result = gIframeUrl.replace("http://" + urlDomain, "");

	return result;
}

function getDomainFromUrl(url) {

	console.log(getTime(), tag,"+ getDomainFromUrl: " + url);
	var domainOfUrl = "";
	var arr = url.split("/");

	if(url.indexOf("http://") != -1 || url.indexOf("https://") != -1) {
		domainOfUrl = arr[2];
	} else {
		domainOfUrl = arr[0];
	}

	if(domainOfUrl.indexOf("www.") === 0) {
		domainOfUrl = domainOfUrl.substring(4);
	}
	// make all google site return google.com, workaround for TT 81
	if(domainOfUrl.match(/.*google.com$/)) {
		domainOfUrl = "google.com";
	}
	console.log(getTime(), tag,"return getDomainFromUrl: " + url + " --> " + domainOfUrl);

	return domainOfUrl;
}

function isTop() {
	return (window === window.top);
}

function getUrlWithoutQueryStringAndSessionSymbol(url) {
	var returnUrl = url;
	try{
		if(url.indexOf("?") != -1) {
			returnUrl = window.location.href.split('?')[0];
		}

		if(url.indexOf("#") != -1) {
			returnUrl = window.location.href.split('#')[0];
		}
	} catch(e) {
		console.warn("Error in getUrlWithoutQueryStringAndSessionSymbol:", e);
	}

	return returnUrl;
}
var escapeDomain = ["google.com", "live.com"];
function isEscapeReload(url){
	for(var i=0; i<escapeDomain.length; i++){
		if(url.indexOf(escapeDomain[i]) != -1){
			return true;
		}
	}
	return false;
}

// BH_Lin@20140223: flag to route logication to local
// purpose: issue - FW: several critical security issues in various products...
var featureList = {
	forceVerifyPinLocal: true
};

/*
function windowPostMessage(elementWindow, messageOrObject, targetOrigin) {

	if( true || (navigator.userAgent.indexOf("Trident/4.0") !== -1)||
		(navigator.userAgent.indexOf("Trident/5.0") !== -1)) {
		if(typeof messageOrObject === "object") {
			messageOrObject = JSON.stringify(messageOrObject);
		}
	}

	if(elementWindow.postMessage != null) {

		elementWindow.postMessage(messageOrObject, targetOrigin);
	}
}
*/

function getTimestamp() {
		return (new Date()).getTime();
}

function getTime() {
	var date = new Date();
	return (date.getUTCMonth()+1)+"-"+date.getUTCDate()+ " " + date.getUTCHours() + ":" + date.getUTCMinutes() + ":" + date.getUTCSeconds() + "." + date.getUTCMilliseconds();
}

function getParameterByName(name) {
	name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
		results = regex.exec(location.search);
	return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function getQSParam(paramName) {
	var QS = window.location.toString();
	var indSta = QS.indexOf(paramName + "=");
	if (indSta===-1 || paramName==="") {
		return;
	}
	var indEnd=QS.indexOf('&',indSta);
	if (indEnd==-1) {
		indEnd=QS.length;
	}
	var valore = unescape(QS.substring(indSta+paramName.length+1,indEnd));
	return valore;
}

// BH_Lin@20140505	----->
// purpose: work-around for IE8 to get Object.keys method.
if (!Object.keys) {
Object.keys = function(obj) {
	var keys = [];

	for (var i in obj) {
	if (obj[i] != null) {
		keys.push(i);
	}
	}

	return keys;
};
}

function sendMessageToTopBar(tabId, msg) {
	console.log(getTime(), tag, ">>> sendMessageToTopBar:" + tabId);
	msg.settings = getUserSettingDB();
	msg.css = URL_INJECTED_CSS;
	msg.js = URL_INJECTED_DIALOG;
	// BH_Lin@DPV3
	msg.name = "MessageFromGlobalPage";
	windowPostMessage(window.top, msg , "*");
	console.log(getTime(), tag, "### in sendMessageToTopBar: DONE");
}

function testShowFuntionalErroMsg() {
	console.log('*** testShowFuntionalErroMsg');
	actionObj = {
		actionType: ACTION_OF_POPUP.SHOW_FUNCTIONAL_ERROR_MSG
	};
	//var browserTab = safari.application.activeBrowserWindow.activeTab;
	//browserTab.page.dispatchMessage("MessageReplyInjectedDialog", actionObj);
	actionObj.name = "MessageFromGlobalPage";
	sendMessageToTopBar(-1, actionObj);
}

function testShowCreateAccountConfirmation() {
	console.log(getTime(), tag, '*** testShowCreateAccountConfirmation');
	actionObj = {
		actionType: ACTION_OF_POPUP.SHOW_CREATE_ACCOUNT_MSG,
		accountType: getLastAccountType()
	};
	actionObj.name = "MessageFromGlobalPage";
	sendMessageToTopBar(-1, actionObj);
}

function testShowLicenseExpired() {
	console.log('*** testShowLicenseExpired');
	actionObj = {
		actionType: ACTION_OF_POPUP.SHOW_LICENSE_EXPIRED_MSG
	};
	//var browserTab = safari.application.activeBrowserWindow.activeTab;
	//browserTab.page.dispatchMessage("MessageReplyInjectedDialog", actionObj);
	actionObj.name = "MessageFromGlobalPage";
	sendMessageToTopBar(-1, actionObj);
}

function testShowAuthExpiredMsg() {
	console.log('*** testShowAuthExpiredMsg');
	actionObj = {
		actionType: ACTION_OF_POPUP.SHOW_AUTH_KEY_EXPIRED_MSG
	};
	//var browserTab = safari.application.activeBrowserWindow.activeTab;
	//browserTab.page.dispatchMessage("MessageReplyInjectedDialog", actionObj);
	actionObj.name = "MessageFromGlobalPage";
	sendMessageToTopBar(-1, actionObj);
}

function testShowAuthInValidMsg() {
	console.log('*** testShowAuthInValidMsg');
	actionObj = {
		actionType: ACTION_OF_POPUP.SHOW_AUTH_KEY_INVALID_MSG
	};
	//var browserTab = safari.application.activeBrowserWindow.activeTab;
	//browserTab.page.dispatchMessage("MessageReplyInjectedDialog", actionObj);
	actionObj.name = "MessageFromGlobalPage";
	sendMessageToTopBar(-1, actionObj);
}

function testShowPwdGenerator(passwordFields) {
	console.log('*** testShowPwdGenerator');
	actionObj = {
		actionType: ACTION_OF_POPUP.SHOW_PASSWORD_GENERATOR,
		passwordFields: passwordFields
	};
	//var browserTab = safari.application.activeBrowserWindow.activeTab;
	//browserTab.page.dispatchMessage("MessageReplyInjectedDialog", actionObj);
	actionObj.name = "MessageFromGlobalPage";
	sendMessageToTopBar(-1, actionObj);
}

function testShowDPEmailChangedError() {
	console.log('*** testShowDPEmailChangedError');
	actionObj = {
		actionType: ACTION_OF_POPUP.SHOW_EMAIL_CHANGED_ERROR_MSG_MSG
	};
	//var browserTab = safari.application.activeBrowserWindow.activeTab;
	//browserTab.page.dispatchMessage("MessageReplyInjectedDialog", actionObj);
	actionObj.name = "MessageFromGlobalPage";
	sendMessageToTopBar(-1, actionObj);
}
function testShowDPPasswordChangedError() {
	console.log('*** testShowDPPasswordChangedError');
	actionObj = {
		actionType: ACTION_OF_POPUP.SHOW_PWD_CHANGED_ERROR_MSG_MSG
	};
	//var browserTab = safari.application.activeBrowserWindow.activeTab;
	//browserTab.page.dispatchMessage("MessageReplyInjectedDialog", actionObj);
	actionObj.name = "MessageFromGlobalPage";
	sendMessageToTopBar(-1, actionObj);
}

// BH_Lin@20130422
// purpose: sub code is for testing.
// use the web console to call sub function to trigger plugin to call show add passcard UI
function testShowAddPasscard() {
	var event = {};

	var tab;

	event.tabId = getTabIdFromReferenceTable(tab);
	event.cbState = ACTION_LIST.SHOW_ADD_PASSCARD;
	/*
	var fakeAddedData = {
		"ID": "FF521C026DEA68AA6A3AFDB1BAFB11097EE2209D4EB779BC1DF04A8C7DF6D183",
		"DisplayName":"testing",
		"Domain": "www.518.com.tw",
		"Account": "A147488792",
		"AccountMeta": {"Encrypted": "{\"account\":true,\"name\":\"account\",\"type\":\"text\"}" },
		"Fields": {"Encrypted": "[{\"name\":\"pwd\",\"type\":\"password\",\"value\":\"iiiiteam\"}]" },
		"ReserveEnc": null,
		"Reserved": "null",
		"Location": "http://www.518.com.tw/member-login.html",
		"FormAction": "http://www.518.com.tw/",
		"SiteID": 0,
		"DisplayName": "518 human resource bank",
		"AttrEnc": {"Encrypted": "{\"AutoSubmit\":true,\"LaunchSW\":false,\"QueryStr\":\"\",\"ShowLaunchSW\":false}"},
		"Attr": {"LastUseTime":1363154175},
		"ListOrder": 2,
		"State": 0,
		"Version": 1,
		"LastModifier": "12345678901234567890123456789012",
		"LastModified": "1363154177",
		"UsageCout": 0,
		"CheckSum": 0
	};
	*/
	var fakeAddedData = {
		"ID": "630CABA5CDA8143017A322AC73A42AA8DB0D22C01AC0A85A8E98482BEFDB9C89"
		,"Domain": "www.plurk.com"
		,"Account": "idsafe.tm@gmail.com"
		,"AccountMeta": {"Encrypted": "{\"account\":true,\"name\":\"nick_name\",\"type\":\"text\"}"}
		,"Fields": {"Encrypted":"[{\"name\":\"password\",\"type\":\"password\",\"value\":\"iiiiteam\"}]"}
		,"ReserveEnc": null
		,"Reserved": "null"
		,"Location": "http://www.plurk.com/Users/showLogin"
		,"FormAction": "https://www.plurk.com/Users/login"
		,"SiteID": 0
		,"DisplayName": "plurk.com"
		,"AttrEnc": {"Encrypted": "{\"AutoSubmit\":false,\"LaunchSW\":false,\"QueryStr\":\"login_return_url=/\",\"ShowLaunchSW\":false}" }
		,"Attr": {"LastUseTime":1363153814}
		,"ListOrder": 1
		,"State": 0
		,"Version": 1
		,"LastModifier": "12345678901234567890123456789012"
		,"LastModified": "1363153816"
		,"UsageCout": 0
		,"CheckSum": 0
	}
	event.contentJs = JSON.stringify(fakeAddedData);

	gTMPwm.NPPluginHelper.notifyNpCallback(event);
}

function testReplayPasscard() {
	var event = {};

	var tab;

	event.tabId = getTabIdFromReferenceTable(tab);
	event.cbState = ACTION_LIST.SHOW_PASSCARD_LIST;
	/*
	var fakeAddedData = {
		"ID": "FF521C026DEA68AA6A3AFDB1BAFB11097EE2209D4EB779BC1DF04A8C7DF6D183",
		"DisplayName":"testing",
		"Domain": "www.518.com.tw",
		"Account": "A147488792",
		"AccountMeta": {"Encrypted": "{\"account\":true,\"name\":\"account\",\"type\":\"text\"}" },
		"Fields": {"Encrypted": "[{\"name\":\"pwd\",\"type\":\"password\",\"value\":\"iiiiteam\"}]" },
		"ReserveEnc": null,
		"Reserved": "null",
		"Location": "http://www.518.com.tw/member-login.html",
		"FormAction": "http://www.518.com.tw/",
		"SiteID": 0,
		"DisplayName": "518 human resource bank",
		"AttrEnc": {"Encrypted": "{\"AutoSubmit\":true,\"LaunchSW\":false,\"QueryStr\":\"\",\"ShowLaunchSW\":false}"},
		"Attr": {"LastUseTime":1363154175},
		"ListOrder": 2,
		"State": 0,
		"Version": 1,
		"LastModifier": "12345678901234567890123456789012",
		"LastModified": "1363154177",
		"UsageCout": 0,
		"CheckSum": 0
	};
	*/
	var fakeAddedData = {
		Passcards: [
		{
		"ID": "630CABA5CDA8143017A322AC73A42AA8DB0D22C01AC0A85A8E98482BEFDB9C89"
		,"Domain": "www.plurk.com"
		,"Account": "idsafe.tm@gmail.com"
		,"AccountMeta": {"Encrypted": "{\"account\":true,\"name\":\"nick_name\",\"type\":\"text\"}"}
		,"Fields": {"Encrypted":"[{\"name\":\"password\",\"type\":\"password\",\"value\":\"iiiiteam\"}]"}
		,"ReserveEnc": null
		,"Reserved": "null"
		,"Location": "http://www.plurk.com/Users/showLogin"
		,"FormAction": "https://www.plurk.com/Users/login"
		,"SiteID": 0
		,"DisplayName": "plurk.com"
		,"AttrEnc": {"Encrypted": "{\"AutoSubmit\":true,\"LaunchSW\":false,\"QueryStr\":\"login_return_url=/\",\"ShowLaunchSW\":false}" }
		,"Attr": {"LastUseTime":1363153814}
		,"ListOrder": 1
		,"State": 0
		,"Version": 1
		,"LastModifier": "12345678901234567890123456789012"
		,"LastModified": "1363153816"
		,"UsageCout": 0
		,"CheckSum": 0}
		]
	}
	event.contentJs = JSON.stringify(fakeAddedData);

	gTMPwm.NPPluginHelper.notifyNpCallback(event);
}

// BH_Lin@20130614    ------------------------------------------>
// purpose: sub function is for testing showing input pin UI for autoFormFilling
function testShowInputPinForFormFill() {
	var event = {};
	var tab = safari.application.activeBrowserWindow.activeTab;
	event.tabId = getTabIdFromReferenceTable(tab);
	event.cbState = ACTION_LIST.SHOW_CHALLENGE_MASTER_PWD;
	gTMPwm.NPPluginHelper.notifyNpCallback(event);
}
// BH_Lin@20130614    ------------------------------------------<

// BH_Lin@20130626    ------------------------------------------>
// purpose: sub function is for testing showing input pin UI for autoFormFilling
function testShowWptBlockingPage() {
	var browserTab = safari.application.activeBrowserWindow.activeTab;
	var outObj = { actionType: ACTION_OF_POPUP.SHOW_BLOCKING_PAGE, htmlContent: CONTENT_OF_WTP_BLOCKING_PAGE};
	browserTab.page.dispatchMessage("MessageFromGlobalPage", outObj);
}
// BH_Lin@20130614    ------------------------------------------<

function testShowConfirmAutoLearning() {
	var browserTab = safari.application.activeBrowserWindow.activeTab;
	var actionObj = { actionType: ACTION_OF_POPUP.SHOW_CONFIRM_AUTO_LEARNING,
		UserInfo: "Sx8HhzdEZIESuTG/ACkUyegcxpMFZBNbqKF/E+NSVjSZXArd57jWHkQuC1/kriKUDVAX9l3IZCyBLA8/UI92DAlaZgV5WSug+og4/D+sTVjVMKzQOSkkt5+EKz7h0y0Tz7WhKeW7+xGZgdxJiKV2nQnDaqKCJRR9TTvsTkHpktH6YoAHJYWffO1V8gNuslWLCremHewhJtLBbj5i7O6rTg=="};
	var tabId = getTabIdFromReferenceTable(browserTab);
	sendMessageToTopBar(tabId, actionObj);
}

function testShowConfirmAutoFilling() {
	var browserTab = safari.application.activeBrowserWindow.activeTab;
	var actionObj = { actionType: ACTION_OF_POPUP.SHOW_CONFIRM_AUTO_FILLING};
	var tabId = getTabIdFromReferenceTable(browserTab);
	sendMessageToTopBar(tabId, actionObj);
}

function testShowAutoLearningComplete() {
	var browserTab = safari.application.activeBrowserWindow.activeTab;
	var actionObj = { actionType: ACTION_OF_POPUP.SHOW_AUTO_LEARNING_COMPLETE};
	var tabId = getTabIdFromReferenceTable(browserTab);
	sendMessageToTopBar(tabId, actionObj);
}

function testShowPinBlockingPage() {
	console.log('*** block user in a moment');
	actionObj = {
		actionType: ACTION_OF_POPUP.SHOW_LOCK_FOR_SAFE
	};
	var browserTab = safari.application.activeBrowserWindow.activeTab;
	browserTab.page.dispatchMessage("MessageReplyInjectedDialog", actionObj);
}

function testShowAddPasscardCompleteMsg() {
	console.log('*** testShowAddPasscardCompleteMsg');
	actionObj = {
		actionType: ACTION_OF_POPUP.SHOW_ADD_PASSCARD_COMPLETE_MSG
	};
	//var browserTab = safari.application.activeBrowserWindow.activeTab;
	//browserTab.page.dispatchMessage("MessageReplyInjectedDialog", actionObj);
	actionObj.name = "MessageReplyInjectedDialog";
	sendMessageToTopBar(-1, actionObj);
}

function testInjectjavascript(scriptText) {
	console.log('*** testInjectjavascript');
	genericBrowser.executeScript(scriptText);
}

var mobilecheck = function() {
			var check = false;
			(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
		return check; };
