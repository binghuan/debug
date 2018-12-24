$( document ).ready(function() {
    console.log( "ready!" );
});

$("#button_back").click(function() {
    console.log("click");
    androidAppProxy.back();
})