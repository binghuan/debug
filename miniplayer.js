function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

$(document).ready(function () {
    var audio = document.getElementById('binghuan_myAudio');
    var source = document.getElementById('binghuan_audioSource');
    var audioSrc = getParameterByName("source");
    if (audioSrc) {
        source.src = audioSrc;
        audio.load(); //call this to just preload the audio without playing
        audio.play(); //call this to play the song right away
    }
});

// for instance: 
// http://localhost:8080/miniplayer.html?source=http://binghuan.herokuapp.com/download/it_me_mario.mp3