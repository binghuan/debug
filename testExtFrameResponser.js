var responser8975b6c6 = (function(){
	var rTag="[[Responser] in " + location.pathname + "]>";
	console.log(getTime(), rTag, "OoO running Responder.js ---> start");

	var isOnTop = function(){

		if(self === top) {
			return true;
		} else {
			return false;
		}
	};

	var handShakeState = {
		isExtFrameReady: false,
		maxAskCount: 100, 
		askDelayTime: 1000
	};

	var timerId;
	function checkExtFrameReadyOrNot() {

		if(handShakeState.isExtFrameReady === true) {
			
			return;
		}

		if(window.top.document.getElementById("extensionFrame")) {

			console.log(getTime(), rTag,"***handShake*** I will say hello to extension frame");

			var msgObj = {
				action: "hello",
				location: location.href
			};

			windowPostMessage(window.top.document.getElementById("extensionFrame").contentWindow, msgObj, "*");		
		}

		timerId = setTimeout(checkExtFrameReadyOrNot, handShakeState.askDelayTime);
	}


	$("document").ready(function() {

		if(isOnTop() === true) {
			if(document.getElementById("extensionFrame") == undefined) {
				var styleDesc= "font-family: Arial, Tahoma; background-color: white; width:auto; position: fixed;" +
				"z-index: 2147483647; top: 160pt; left:10pt;height:140pt;";
				var template = "<iframe style='" + styleDesc + "' id='extensionFrame' scrolling='no' src='testExtFrameServer.html'></iframe>";

				console.log(getTime(), rTag,"#### OH, I am top frame, so I need to add a Extension Frame to host message");

				var delayExFrameTime = getParameterByName("delayExtFrame");
				if((delayExFrameTime != "") && 
					(delayExFrameTime != undefined)) {

					setTimeout(function() {
						$('body').append(template);							
					}, parseInt(delayExFrameTime))
				} else {
					$('body').append(template);
				}
			} else {
				console.log(getTime(), rTag,"extensonFrame is already existed");
			}
		} else {
			console.log(getTime(), rTag,"OH, I am not on top");
			checkExtFrameReadyOrNot();
		}

		var messageHandler = function (event){
			console.log(getTime(), rTag,"Oh shit! I got message: ", event);

			var dataType = (typeof event.data);
			if(dataType === "object") {
				if(event.data.action === "hello" && event.data.id === "extFrame") {
					handShakeState.isExtFrameReady = true;
					clearTimeout(timerId);
					console.log(getTime(), rTag,"***handShake*** extension frame is ready -> check!");
				}
			}
		};

		var readyStateHandShaker = {
			hello: function() {
				var msgObj = {
					action: "hello", 
					location: location.href
				};
				windowPostMessage(window.top, msgObj, "*");
			}
		};

		if(window.addEventListener) {
			console.log(getTime(), rTag,"--> listner message");
			console.log(getTime(), rTag,"--> listner loadevent");
			window.addEventListener("message", messageHandler);
			window.addEventListener("load", readyStateHandShaker.hello);
		} else {
			window.attachEvent("onmessage", messageHandler);
			window.attachEvent("onload", readyStateHandShaker.hello);
		}

	});


	console.log(getTime(), rTag,"OoO running Responder.js ---> done");

})();




