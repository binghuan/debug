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
		console.log(getTime(), rTag,"***handShake*** I want to say hello to extension frame");

		var msgObj = {
			action: "hello",
			location: location.href
		};

		windowPostMessage(window.top, msgObj, "*");		
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

		var windowMap = (function(){

			var windowTable = [];

			return {

				addWindowInTable: function(newWinObj) {

					var i;
					var hit = false;
					for(i=0; i< windowTable.length; i++) {
						if(windowTable[i].source === newWinObj.source) {
							hit = true;
							break;
						}
					}

					if(hit === false) {
						console.log(getTime(), tag,"!! incoming new windows obj");
						windowTable.push(newWinObj);		
					}
				},
				getWindowTable: function() {
					return windowTable;
				},
				clear: function() {
					windowTable = [];
				}
			};
		})();

		var messageHandler = function (event){
			console.log(getTime(), rTag,"Oh shit! I got message: ", event);
			var dataType = (typeof event.data);
			if(dataType === "object") {
				if(event.data.action === "EXTENSION_FRAME_IS_READY") {
					handShakeState.isExtFrameReady = true;
					console.log(getTime(), rTag,"***handShake*** extension frame is ready -> check!");
					var windowObjArray = windowMap.getWindowTable();
					for(var i=0; i< windowObjArray.length; i++) {
						var msgObj = {
							action:"hello"
						};
						console.log(getTime(), rTag,"checkpoint 106");
						windowObjArray[i].source.postMessage(msgObj, windowObjArray[i].origin);	
						console.log(getTime(), rTag,"checkpoint 108");
					}
					
					windowMap.clear();
				} else if(event.data.action === "hello") {
					if(self === top ) {
						if(handShakeState.isExtFrameReady === true) {
							var msgObj = {
								action:"NOTIFY_EXTENSION_READY",
								msg: "extension frame is ready la ~"
							};
							console.log(getTime(), rTag,"send back to notify extension ready");
							event.source.postMessage(msgObj, event.origin);
						} else {
							var winObj = {
								source: event.source,
								origin: event.origin
							};
							windowMap.addWindowInTable(winObj);
							console.log(getTime(), rTag,"pending asking ready or not");
						}
					} else {
						console.log(getTime(), rTag,"ya, I got it. ext ready");
					}
				} else if(event.data.action === "NOTIFY_EXTENSION_READY") {
					console.log(getTime(), rTag,"Oh ya, extension is ready ! I got you");
				} else if(event.data.action === "EXECUTE_JAVASCRIPT") {
					document.getElementById("msgtext").innerHTML = "ready in eval: ";
					document.getElementById("msgtext").innerHTML += event.data.javascript;
					console.log(getTime(), rTag, "I got command to execute javascript !");
					setTimeout(function(){
						eval(event.data.javascript);
					}, 1500);
					
				}
			}
		};

		var readyStateHandShaker = {
			hello: function() {
				var msgObj = {
					action: "hello", 
					location: location.href
				};

				console.log(getTime(), rTag,"I will say hello");
				windowPostMessage(window.top, msgObj, "*");
			}
		};

		if(window.addEventListener) {
			console.log(getTime(), rTag,"--> listner message");
			console.log(getTime(), rTag,"--> listner loadevent");
			window.addEventListener("message", messageHandler);
			if(self != top) {
				$("document").ready(readyStateHandShaker.hello);
				//window.addEventListener("load", );	
			}
			
		} else {
			window.attachEvent("onmessage", messageHandler);
			if(self != top) {
				window.attachEvent("onload", readyStateHandShaker.hello);
			}
			
		}

	});


	console.log(getTime(), rTag,"OoO running Responder.js ---> done");

})();




