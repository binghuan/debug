
$("document").ready(function() {

	console.log("ready");

	$("#save").click(function() {
		console.log('"on click');

		$("#result").text("");

		var originalString = $("#inputText").val();
		$("#text1").text(originalString);

		var urlEncodedText = encodeURIComponent(originalString);
		$("#text2").text(urlEncodedText);

		var base64Str = btoa(urlEncodedText);
		$("#text3").text(base64Str);

		var rollbackBase64 = atob(base64Str);
		$("#text4").text(rollbackBase64);

		var rollbackString = decodeURIComponent(rollbackBase64);
		$("#text5").text(rollbackString);

	});

});