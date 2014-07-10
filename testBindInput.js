
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
        pwdGenerator.setAttribute('style', 'z-index: 255;position: absolute; display:none; border: 1px solid rgba(0,0,0,.3); box-shadow: 0.5px 10px rgba(0,0,0,.3)');
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
    //$(pwdField).css("background-image", "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDozQThCRTMxQTBEMjA2ODExODA4M0U3NkUwRUY5QzQ4RSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpFRTUyMEQ1QURGRTYxMUUzQTc0OEEzMjVGQkI3OTMxMCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpFRTUyMEQ1OURGRTYxMUUzQTc0OEEzMjVGQkI3OTMxMCIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RjhGMTc1NTYxNTIwNjgxMTgwODNCQ0YxMzkxMUMwMjEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6M0E4QkUzMUEwRDIwNjgxMTgwODNFNzZFMEVGOUM0OEUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz58UE7AAAAByUlEQVR42pyUTShEURTH34yXbCiR1eTbysfKQpTPWVhJsWCUFYuRHQs2lsLCwhIpYRa+JkNiIRFZiGIhNoo0WRiMj9Qo43/qvDqdbuPj1K/3zjn3/d+95557XRFPoaXMBq2gDZSDCTAGPsEt2AHzYN8ymK38UhAAJSLmFmPzmW4QAn4QtgyDyarBgRBbArVgnH0P6AV37DeBQ1AgBV285DxwAtLBG/CBdctsqSAIGti/5tI8yRlOs1ic6+eIZYIjEAU9HHsFLeCGfSrBsFwyLaue/WWwLWbTCSpAGhgR8ajyu0C2I9ghEjNqeZfi/UrlNtTm+hxBr0icqY82wSS/N6ocbU5M+F5HMDdBG5E98jNiyMkuKdMBi+v1WytSE6ANtN3qz37Dh1tgwBBvVr6LJkiCuyJYxzsrbQ+MqlgG6Fcx6sMYCa6oxJRBVBr16xrIUvFTp4Z0xC5EIhnMcnPTaUjheDYfvXNQZfhRSB69Gr5FkgwDB7mJ4wlm/QJywLNb1Ik25Mv6nw2RmG4bql07eP+jWJDvTMvUh4ugGCzwhfqTBfgijuvry2TUGpXgHhyrGj6APjCna2sn+HtE3YlhFl7lzvgwffQtwAA+uF5NKc8UNQAAAABJRU5ErkJggg==)")
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
        }

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

    });

    $(pwdField).on('input', function(e) {
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
