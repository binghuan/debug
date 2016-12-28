var editor = ace.edit("editor");
editor.setTheme("ace/theme/monokai");
//editor.getSession().setMode("ace/mode/javascript");

$("#button_preview").click(function() {
    //console.log("" + editor.getValue());

    var frameWindow = document.getElementById('preview_frame').contentWindow;
    frameWindow.postMessage(editor.getValue(), location.origin);
});

$("#button_open").click(function() {
    $("#toNewWindow").html(editor.getValue())
    var w = window.open();
    var html = $("#toNewWindow").html();
    $(w.document.body).html(html);
    $("#toNewWindow").html("");
});
