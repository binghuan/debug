
console.log("+run worker");

function randString(n) {
    if(!n)
    {
        n = 5;
    }

    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for(var i=0; i < n; i++)
    {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
}

self.addEventListener("message", function(e) {
    // the passed-in data is available via e.data
    console.log("incoming message:", e);

    if(e.data.action != null && e.data.action === "start") {
    	for(var i=0; i < parseInt(e.data.config.count); i++) {

    		if(e.data.config.base64 === true) {
    			console.log("base64");
    			postMessage(btoa(randString(e.data.config.length)));
    		} else {
    			postMessage(randString(e.data.config.length));
    		}

    	}
    }
}, false);