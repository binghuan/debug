
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

var pwdGenerator;


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

function bindInputFields() {

    console.log("---> bind input field > start");

    $(document).mouseup(function (e)
    {
        var container = $("#pwdGenerator");

        if (!container.is(e.target) &&// if the target of the click isn't the container...
            container.has(e.target).length === 0) // ... nor a descendant of the container
        {
            container.hide();
        }
    });

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

                if(document.getElementById('pwdGenerator') == undefined) {

                    pwdGenerator = document.createElement('iframe');
                    pwdGenerator.id = "pwdGenerator";
                    pwdGenerator.height = "180px";
                    pwdGenerator.scrolling="no";
                    pwdGenerator.width = inputFieldPos.width;
                    pwdGenerator.src = 'testBindInputInner.html';
                    pwdGenerator.setAttribute("frameborder",'0');
                    pwdGenerator.setAttribute('style', 'z-index: 255;position: absolute; top:' + inputFieldPos.bottom + 'px;left:' + inputFieldPos.left+ 'px;');
                    document.body.appendChild(pwdGenerator);
                } else {
                    var isVisible = $('#pwdGenerator').is(":visible");
                    if(isVisible === true) {
                        console.log("ready to hide pwdGenerator");
                        $('#pwdGenerator').hide();
                    } else {
                        console.log("ready to show pwdGenerator");
                        $('#pwdGenerator').show();
                    }

                }
        }
    });

    console.log("---> bind input field > done");
}


function generatePassword() {
    var length = 8,
        charset = "abcdefghijklnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;

    //$('#newPwd').val(retVal);
}

function bindInputFields2() {

    console.log("---> bind input field type 2 > start");


    if(document.getElementById('pwdGenerator') == undefined) {

        pwdGenerator = document.createElement('iframe');
        pwdGenerator.id = "pwdGenerator";
        pwdGenerator.height = "115px";
        pwdGenerator.scrolling="no";
        pwdGenerator.src = 'testBindInputInner.html';
        pwdGenerator.setAttribute("frameborder",'0');
        pwdGenerator.setAttribute('style', 'z-index: 255;position: absolute; display:none');
        document.body.appendChild(pwdGenerator);
    }

    $(document).mouseup(function (e)
    {
        var container = $("#pwdGenerator");

        if (!container.is(e.target) &&// if the target of the click isn't the container...
            container.has(e.target).length === 0) // ... nor a descendant of the container
        {
            container.hide();
        }
    });

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
        //console.log(this.getBoundingClientRect());
        var inputFieldPos = this.getBoundingClientRect();
        if(isInTargetArea({x: e.offsetX, y: e.offsetY}, inputFieldPos) === true) {
            $(this).css('cursor', 'pointer');
        } else {
            $(this).css('cursor', '');
        }
    });

    $(pwdField).click(function(e) {
        var inputFieldPos = this.getBoundingClientRect();

        $("#pwdGenerator").css("top", inputFieldPos.bottom + 'px')
            .css("left", inputFieldPos.left+ 'px')
            .css('width', inputFieldPos.width + "px");

        if(isInTargetArea({x: e.offsetX, y: e.offsetY}, inputFieldPos) === true) {
                console.log('hit in area !!');

                var generatedPwd = generatePassword();
                var inputFieldCount = $('input[type=password]').length;
                if( inputFieldCount > 0) {
                    var i;
                    for(i =0; i< inputFieldCount; i++) {
                        console.log("autofill strongPassword: " + generatedPwd);
                        $('input[type=password]')[i].value = generatedPwd;
                    }
                }
        } else {

            if(e.target.value == undefined || e.target.value.length < 1) {
                return;
            }

            var isVisible = $('#pwdGenerator').is(":visible");
            if(isVisible === true) {
                console.log("ready to hide pwdGenerator");
                $('#pwdGenerator').hide();
            } else {
                console.log("ready to show pwdGenerator");
                $('#pwdGenerator').show();
            }

            var msgObj = {
                action: SHOW_STRONG_PASSWORD_VIA_GENERATOR,
                strongPassword: e.target.value
            };

            console.log("ready to send message to UI: ", e.target.value);
            windowPostMessage(document.getElementById('pwdGenerator').contentWindow, msgObj, "*");

        }
    });

    $(pwdField).on('keypress', function(e) {
        var msgObj = {
            action: SHOW_STRONG_PASSWORD_VIA_GENERATOR,
            strongPassword: e.target.value
        };

        console.log("ready to send message to UI: ", e.target.value);
        windowPostMessage(document.getElementById('pwdGenerator').contentWindow, msgObj, "*");
    });

    console.log("---> bind input field > done");
}


function isInTargetArea(eventPos, inputPos) {
    //console.log('inputFieldPos right:' + inputPos.right + ', bottom:' + inputPos.bottom);
    return ((inputPos.width - eventPos.x) <= 20) ;
}

$('document').ready(function() {

    $('#bindinput').click(function() {
        bindInputFields();
    });

    $('#bindinput2').click(function() {
        bindInputFields2();
    });

    if(window.addEventListener) {
        window.addEventListener("message",messageHandler);
    } else {
        window.attachEvent("onmessage",messageHandler);
    }

});

var REQUEST_AUTOFILL_PASSWORD_VIA_GENERATOR = 11034;
var SHOW_STRONG_PASSWORD_VIA_GENERATOR= 11035;

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

        $('#pwdGenerator').hide();
    }
}
