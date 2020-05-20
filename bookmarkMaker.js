function getParameterByName(name, url) {
	if (!url) url = window.location.href;
	name = name.replace(/[\[\]]/g, "\\$&");
	var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
		results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return '';
	return decodeURIComponent(results[2].replace(/\+/g, " "));
}

const PREFIX_FOR_SCRIPT = "javascript:";

function generateBookmark() {
	console.log(">> generateBookmark");
	if (!bookmarkContent.value.trim().startsWith(PREFIX_FOR_SCRIPT)) {
		bookmarkContent.value = PREFIX_FOR_SCRIPT + bookmarkContent.value;
	}
	bookmarkLink.href = bookmarkContent.value;
	bookmarkLink.innerHTML = bookmarkName.value;
}

function shareBookmark() {
	console.log(">> shareBookmark");
	let link = location.protocol + "//" + location.host + location.pathname;
	link += "?name=" + encodeURIComponent(bookmarkName.value) + "&script=" + btoa(bookmarkContent.value);
	document.getElementById("link_to_share").href = link;
	document.getElementById("link_to_share").innerHTML = link;
}

let bookmarkLink = null;
let bookmarkContent = null;
let bookmarkName = null;

$("document").ready(function () {

	bookmarkLink = document.getElementById("result_of_bookmark");
	bookmarkContent = document.getElementById("text_bookmarkContent");
	bookmarkName = document.getElementById("text_bookmarkname");

	let script = getParameterByName("script");
	let name = getParameterByName("name");
	console.log("name = ", name);
	console.log("script = ", script);
	if (script != null) {
		bookmarkLink.href = atob(script);
		bookmarkContent.value = atob(script);
		
		bookmarkLink.innerHTML = decodeURIComponent(name);
		bookmarkName.value = decodeURIComponent(name);
		
		generateBookmark();
	}

	$("#btnGenerateLink").click(function () {
		generateBookmark();
	});

	$("#btnShareBookmark").click(function () {
		shareBookmark();
	});
});
