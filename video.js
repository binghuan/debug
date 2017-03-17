console.log("video.js is loaded.");

var mVideoPlayer = null;
var mTimestampStart = null;
var mTimestampEnd = null;

function resizeVideo() {
    mVideoPlayer = document.getElementById("video_player");
    if(mVideoPlayer == null) {
        return;
    }

    if(window.innerHeight > window.innerWidth) {
        mVideoPlayer.style.width = "100%";
        mVideoPlayer.style.height = "auto";
    } else {
        mVideoPlayer.style.width = "auto";
        $(mVideoPlayer).height(window.innerHeight - $(mVideoPlayer).position().top - 100 );
    }
}

window.onresize = function(event) {
    resizeVideo();
};

$("document").ready(function () {
    console.log("Document is ready ");

    resizeVideo();

    mVideoPlayer.onloadstart = function () {
        mTimestampStart = new Date() ;
        console.log("Starting to load video", mTimestampStart);
    };

    mVideoPlayer.onloadeddata = function() {
        mTimestampEnd = new Date() ;
        console.log("Ending to load video", mTimestampEnd);
        var timeDiff = mTimestampEnd - mTimestampStart;
        console.log("Spending time to load video: ", timeDiff/1000);
        $("#spending_time").text(timeDiff/1000 + " s");
    }

    $("#btn_load_video").click(function () {
        var inputOfVideoSrc = $("#video_src_textfield").val();
        console.log("load video: ___" + inputOfVideoSrc + "____");
        console.log("origional video src: " + $("#video_player").attr("src"));
        $("#video_player").attr("src", inputOfVideoSrc);
        sessionStorage.lastPlayVideo = inputOfVideoSrc;
    });

    if(sessionStorage.lastPlayVideo != null) {
        $("#video_player").attr("src", sessionStorage.lastPlayVideo);
        $("#video_src_textfield").val(sessionStorage.lastPlayVideo);
    }
});