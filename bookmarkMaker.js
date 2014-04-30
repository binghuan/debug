$("document").ready(function() {

	var bookmarkLink = document.getElementById("result_of_bookmark");
	var bookmarkContent = document.getElementById("text_bookmarkContent");
	var bookmarkName = document.getElementById("text_bookmarkname");
	$("#btnGenerateLink").click(function() {

		bookmarkLink.href = bookmarkContent.value;
		bookmarkLink.innerHTML = bookmarkName.value;

	});
});
