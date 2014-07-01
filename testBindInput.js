
var pwdField;

function getCursorPosition(e) {
    var x;
    var y;
    if (e.pageX || e.pageY) {
      x = e.pageX;
      y = e.pageY;
    }
    else {
      x = e.clientX + document.body.scrollLeft +
           document.documentElement.scrollLeft;
      y = e.clientY + document.body.scrollTop +
           document.documentElement.scrollTop;
    }

    console.log('getCursorPosition: ' , x, y);

    return {x: x, y:y};
}

var pageFrame;


function windowPostMessage(elementWindow, messageOrObject, targetOrigin) {

	if( true || (navigator.userAgent.indexOf("Trident/4.0") !== -1)||
		(navigator.userAgent.indexOf("Trident/5.0") !== -1)) {
		if(typeof messageOrObject === "object") {
			messageOrObject = JSON.stringify(messageOrObject);
		}
	}

	if(elementWindow.postMessage != undefined) {

		elementWindow.postMessage(messageOrObject, targetOrigin);
	}
}

$(document).mouseup(function (e)
{
    var container = $("#pageFrame");

    if (!container.is(e.target) &&// if the target of the click isn't the container...
        container.has(e.target).length === 0) // ... nor a descendant of the container
    {
        container.hide();
    }
});

function isInTargetArea(eventPos, inputPos) {
    console.log('inputFieldPos right:' + inputPos.right + ', bottom:' + inputPos.bottom);
    return ((inputPos.width - eventPos.x) <= 20) ;
}

$('document').ready(function() {

    $('#bindinput').click(function() {
        console.log("---> bind input field > start");
        var inputFieldCount = $('input[type=password]').length;
        if(inputFieldCount > 0) {
            pwdField = $('input[type=password]')[0];
        }

        $(pwdField).css("background-image", "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAASCAYAAABSO15qAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3QsPDhss3LcOZQAAAU5JREFUOMvdkzFLA0EQhd/bO7iIYmklaCUopLAQA6KNaawt9BeIgnUwLHPJRchfEBR7CyGWgiDY2SlIQBT/gDaCoGDudiy8SLwkBiwz1c7y+GZ25i0wnFEqlSZFZKGdi8iiiOR7aU32QkR2c7ncPcljAARAkgckb8IwrGf1fg/oJ8lRAHkR2VDVmOQ8AKjqY1bMHgCGYXhFchnAg6omJGcBXEZRtNoXYK2dMsaMt1qtD9/3p40x5yS9tHICYF1Vn0mOxXH8Uq/Xb389wff9PQDbQRB0t/QNOiPZ1h4B2MoO0fxnYz8dOOcOVbWhqq8kJzzPa3RAXZIkawCenHMjJN/+GiIqlcoFgKKq3pEMAMwAuCa5VK1W3SAfbAIopum+cy5KzwXn3M5AI6XVYlVt1mq1U8/zTlS1CeC9j2+6o1wuz1lrVzpWXLDWTg3pz/0CQnd2Jos49xUAAAAASUVORK5CYII=)")
            .css("padding-right", "18px")
            .css("background-attachment", "scroll")
            .css("background-position", "100% 50%")
            .css("background-repeat", "no-repeat");


        $(pwdField).on('mousemove', function(e) {
            console.log(this.getBoundingClientRect());
            var inputFieldPos = this.getBoundingClientRect();
            if(isInTargetArea({x: e.offsetX, y: e.offsetY}, inputFieldPos) === true) {
                $(this).css('cursor', 'pointer');
            } else {
                $(this).css('cursor', '');
            }
        });

        $(pwdField).click(function(e) {
            console.log(this.getBoundingClientRect());
            var inputFieldPos = this.getBoundingClientRect();
            if(isInTargetArea({x: e.offsetX, y: e.offsetY}, inputFieldPos) === true) {
                    console.log('hit in area !!');

                    if(document.getElementById('pageFrame') == undefined) {

                        pageFrame = document.createElement('iframe');
                        pageFrame.id = "pageFrame";
                        pageFrame.height = "160px";
                        pageFrame.width = inputFieldPos.width;
                        pageFrame.src = 'testBindInputInner.html';
                        pageFrame.setAttribute("frameborder",'2');
                        pageFrame.setAttribute('style', 'z-index: 255;position: absolute; top:' + inputFieldPos.bottom + 'px;left:' + inputFieldPos.left+ 'px;');
                        document.body.appendChild(pageFrame);
                    } else {
                        var isVisible = $('#pageFrame').is(":visible");
                        if(isVisible === true) {
                            console.log("ready to hide pageFrame");
                            $('#pageFrame').hide();
                        } else {
                            console.log("ready to show pageFrame");
                            $('#pageFrame').show();
                        }

                    }
            }
        });

        console.log("---> bind input field > done");
    });



    if(window.addEventListener) {
        window.addEventListener("message",messageHandler);
    } else {
        window.attachEvent("onmessage",messageHandler);
    }

});

var REQUEST_AUTOFILL_PASSWORD_VIA_GENERATOR = 11034;

function messageHandler(event) {
    var eventData;
    console.log("receive msg: ", event.data);
    try {
        eventData = JSON.parse(event.data);
    } catch (e) {
        console.error("error in pasring event data", event.data);
        return;
    }

    if(eventData.actionType === REQUEST_AUTOFILL_PASSWORD_VIA_GENERATOR) {
        console.log("autofill !! ");
        //pwdField.value = eventData.strongPassword;
        var inputFieldCount = $('input[type=password]').length;
        if( inputFieldCount > 0) {
            var i;
            for(i =0; i< inputFieldCount; i++) {
                $('input[type=password]')[i].value = eventData.strongPassword;
            }
        }

        $('#pageFrame').hide();
    }
}