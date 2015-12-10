// close sidenav when clicked
$('.side-nav li a').on("click", function(e) {
	var overlay = document.getElementById("sidenav-overlay");
	var overlayParent = overlay.parentNode;
	overlayParent.removeChild(overlay);
	$('.button-collapse').sideNav("hide");
});
