$( document ).ready(function() {
    console.log( "ready!" );
});

$("#button_back").click(function() {
    console.log("click");
    androidAppProxy.back();
})

$("#button_to_get_device_id").click(function() {
    console.log("click: button_to_get_device_id");
    alert(androidAppProxy.getDeviceId());
})

