function getParameterByName(name, url) {
    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

// https://youtu.be/yk2CUjbyyQY
var youtubeVideoId = "yk2CUjbyyQY";
if(getParameterByName("url") != null) {
  youtubeVideoId = getParameterByName("url").replace("https://youtube/", "").replace("https://www.youtube.com/watch?v=", "");
}



// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.

var player = null;
var onYouTubeIframeAPIReady = function() {
    player = new YT.Player(("player"), {
        height: screen.height,
        width: screen.width,
        videoId: youtubeVideoId,
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });

    console.log("Video Width:", player.getIframe().width, ", height: ", player.getIframe().height);
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
    console.log(">> onPlayerReady");
    event.target.playVideo();
    event.target.mute();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;

function onPlayerStateChange(event) {
    // if (event.data == YT.PlayerState.PLAYING && !done) {
    //     setTimeout(stopVideo, 6000);
    //     done = true;
    // }
}

function stopVideo() {
    player.stopVideo();
}

window.onresize = function(event) {
    if (player == null) {
        return;
    }
    //console.log("window.onresize: ", event);
    player.getIframe().height = screen.height;
    player.getIframe().width = screen.width;
}
