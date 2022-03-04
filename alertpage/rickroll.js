// Quand la page a fini de charger
window.onload = function(){
	// Quand on appuie sur le bouton de retour en arrière
	document.getElementById('back-btn').addEventListener('click', () => {
		if(history.length > 2) {
			history.go(-2);
		} else {
			location.href = "about:blank"
		}
	});

	// Quand on appuie sur le bouton pour continuer
	document.getElementById('continue-btn').addEventListener('click', () => {
		// Obtenir l'URL du rick roll
		var continueUrl = window.location.search.slice(1)

		// Rediriger vers celle-ci
		if(/[?&]q=/.test(continueUrl)) location.href = `${continueUrl}&force_continue_for_rickdetect=true`;
		if(!/[?&]q=/.test(continueUrl)) location.href = `${continueUrl}?force_continue_for_rickdetect=true`;
	});
}