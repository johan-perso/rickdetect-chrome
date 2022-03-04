// Dire que le fichier est chargé
console.log("[Rickdetect] Background.js chargée");

// Quand l'extension s'est installé
chrome.runtime.onInstalled.addListener(async () => {
	// Obtenir la liste des rick rolls
	var allLinks = await fetch(`https://rickdetect-api.johanstickman.com/rickrolllist`, { method: 'GET' }).then(res => res.text())
	allLinks = allLinks.split('\n')

	// Créer la base de données
	chrome.storage.sync.set({ rickrolls: allLinks }, () => {
		console.log("[Rickdetect] Base de données créée");
	});
});

// Quand une demande (pour vérifier un lien) est reçu
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
	isRickRoll(msg.link).then(content => sendResponse(content));
	return true;
});

// Fonction pour vérifier si un lien est un rick roll
async function isRickRoll(link){
	// Afficher un truc dans la console
	console.log('%c\nAnalyse de l\'URL', 'font-size: 36px; font-weight: bold')
	// Obtenir la liste des rick roll
	var allLinks = await chrome.storage.sync.get('rickrolls')
	allLinks = allLinks.rickrolls

	// Modifier le lien
	link = link.replace(/https?:\/\//, '').replace(/www./, '').replace(/\/$/, '')	

	// Vérifier si le lien en fait parti
	for(var i = 0; i < allLinks.length; i++){
		console.log(`[Rickdetect] Vérification de ${link?.replace(/youtu\.be\//g,'youtube.com/watch?v=')} avec ${allLinks[i].replace(/https?:\/\//, '').replace(/www./, '').replace(/\/$/, '')}`)
		if(link?.replace(/youtu\.be\//g,'youtube.com/watch?v=').startsWith(allLinks[i].replace(/https?:\/\//, '').replace(/www./, '').replace(/\/$/, ''))) return "rickroll";
	}

	// Sinon c'est safe
	return "safe"
}