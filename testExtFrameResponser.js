var responser8975b6c6 = (function(){

	console.log(tag, "OoO running Responder.js ---> start");
	var tag="[[Responder]]>";

	var isOnTop = function(){

		if(self === top) {
			return true;
		} else {
			return false;
		}
	};

	$("document").ready(function() {

		if(isOnTop() === true) {
			if(document.getElementById("extensionFrame") == undefined) {
				var styleDesc= "font-family: Arial, Tahoma; background-color: white; width:auto; position: fixed;" +
				"z-index: 2147483647; top: 10%; left:30%;height:120pt;";
				var template = "<iframe style='" + styleDesc + "' id='extensionFrame' scrolling='no' src='testExtFrameServer.html'></iframe>";

				$('body').append(template);	

				console.log(tag, "OH, I am top frame, so I need to add a Extension Frame to host message");
			} else {
				console.log(tag, "extensonFrame is already existed");
			}
		} else {
			console.log(tag, "OH, I am not on top");
		}

		var messageHandler = function (event){
			console.log(tag, "Oh shit! I got message: ", event);

		};

		var readyStateHandShaker = {
			hello: function() {
				window.top.postMessage("action:hello", "*");
			}
		};

		if(window.addEventListener) {
			console.log(tag, "--> listner message");
			console.log(tag, "--> listner loadevent");
			window.addEventListener("message", messageHandler);
			window.addEventListener("load", readyStateHandShaker.hello);
		} else {
			window.attachEvent("onmessage", messageHandler);
			window.attachEvent("onload", readyStateHandShaker.hello);
		}

	});


	console.log(tag, "OoO running Responder.js ---> done");

})();




