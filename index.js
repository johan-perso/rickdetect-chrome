// Dire que le fichier est chargé
console.log("[Rickdetect] Extension chargée");

// Une fois le document chargé
document.addEventListener("DOMContentLoaded", () => {
	// Obtenir l'URL de la page
	var link = window.location.href;

	// Si l'URL contient "?force_continue_for_rickdetect=true" on annule la suite
	if (link.indexOf("?force_continue_for_rickdetect=true") != -1) return;

	// Vérifier si il y a un rick roll
	chrome.runtime.sendMessage({ link: link }, (response) => {
		// Si c'est un rick roll
		if(response == "rickroll") window.location.href = `${chrome.runtime.getURL("alertpage/rickroll.html")}?${link}`;
	});
})