// close sidenav when clicked
$('.side-nav li a').on("click", function(e) {
<<<<<<< HEAD
	$('.button-collapse').sideNav('hide');
	var overlay = document.getElementById("sidenav-overlay");
	var overlayParent = overlay.parentNode;
	overlayParent.removeChild(overlay);
	$('.button-collapse').sideNav('hide');
=======
	$('.button-collapse').sideNav("hide");
	var overlay = document.getElementById("sidenav-overlay");
	var overlayParent = overlay.parentNode;
	overlayParent.removeChild(overlay);
	$('.button-collapse').sideNav("hide");
>>>>>>> 2bb2038fdf25388b25049ff8128d3e5ee412da59
});
$('sideNav').on("hide", function(e){
	var overlay = document.getElementById("sidenav-overlay");
	var overlayParent = overlay.parentNode;
	overlayParent.removeChild(overlay);
})
