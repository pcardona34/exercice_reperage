/*
 * interface.js
 *
 * Reperage : interface de l'exercice de repérage
 * ( c ) 2012-2019 - Patrick Cardona
 * Version : 3.0.0
 *
 * @source: sur Github...
 *
 */

/* =================================================================== */
/* LICENCE															   */
/* =================================================================== */
/*
@licstart  The following is the entire license notice for the
    JavaScript code in this page.

Copyright (C) 2012-2019  Patrick CARDONA - Reperage

    The JavaScript code in this page is free software: you can
    redistribute it and/or modify it under the terms of the GNU
    General Public License (GNU GPL) as published by the Free Software
    Foundation, either version 3 of the License, or (at your option)
    any later version.  The code is distributed WITHOUT ANY WARRANTY;
    without even the implied warranty of MERCHANTABILITY or FITNESS
    FOR A PARTICULAR PURPOSE.  See the GNU GPL for more details.

    As additional permission under GNU GPL version 3 section 7, you
    may distribute non-source (e.g., minimized or compacted) forms of
    that code without the copy of the GNU GPL normally required by
    section 4, provided you include this license notice and a URL
    through which recipients can access the Corresponding Source.

@licend  The above is the entire license notice
    for the JavaScript code in this page. 
*/


/* **************************************************************** */
/* Fonctions de gestion de l'affichage des accordéons               */
/* **************************************************************** */

function montreAccordeon(id){
	
	/* On replie tous les accordéons */
	let accordeons = document.querySelectorAll('.degrade');
	for ( let i = 0; i < accordeons.length; i++ ){
		let ida = accordeons[i].getAttribute('id');
		cacherAccordeon(ida);
	}
	/* On remet les titres en gris */
	let titres = document.querySelectorAll('h3');
	for ( let i = 0; i < titres.length; i++){
		titres[i].style.color = 'gray';
	}
	
	/* On affiche celui qui a été sélectionné */
	document.getElementById(id).style.display = 'block';
}

function cacherAccordeon(id){
	
	document.getElementById(id).style.display = 'none';
	
}

/* ******************************************************************/
/* Gestionnaire de l'Interface utilisateur  						*/
/* ******************************************************************/

/* Dès que la page est chargée...*/

document.addEventListener("DOMContentLoaded", function(){

// On crée une instance de l'objet Consigne :
var cons = new objConsigne(soustitreDef, auteurDef, votreConsigneDef, commentaireDef);
// On crée une instance de cet objet avec les valeurs par défaut
var exo = new objExercice(essaisDef, maxEssaisDef, justesDef, reponsesDef, motsDef, solutionsDef, optionMotDef, ExerciceDef, texteExerciceDef, solutionDef, finConsigneDef, couleurDef, jokersDef);

// On charge les données de cet exercice dans le modèle d'interface à partir du fichier de données obtenu via la variable 'donnees'
// Gestion du modèle (template)
var template = document.getElementById('modele').innerHTML;


// Appel effectif de la fonction du chargement des données
// On récupère les données au format JSON

	fetch(donnees)
	.then(function(response) {
	if (!response.ok) {
		throw new Error("Erreur HTTP, status = " + response.status);
       }
       return response.json();
     })
     .then(function(json) {
		 
	var nouvel = document.createElement("div");
	nouvel.innerHTML = template;
	
	cons.initialise(json.soustitre, json.auteur, json.votreConsigne, json.commentaire);
  	exo.initialise(parseInt(json.maxEssais), parseInt(json.mots), parseInt(json.solutions), json.optionMot, json.texteExercice, json.solution, parseInt(json.jokers));
	// On affiche la consigne :
    cons.afficherUne(nouvel);

	// On prépare l'exercice dans sa zone
	exo.prepare();
	nouvel.querySelector("#exercice").innerHTML = exo.Exercice;
	// On masque le bouton recommencer
	nouvel.querySelector('#action2').style.display = 'none';
	
	document.getElementById("conteneur").innerHTML = "";
    document.getElementById("conteneur").appendChild(nouvel);
    
    // On initialise le facteur de zoom
document.getElementById("zoom1").checked = false;

// On masque les zones de bilan :
document.getElementById("succes").style.display = 'none';
document.getElementById("echec").style.display = 'none';


/* Liens licence et à propos */
	document.querySelector("a[title='licence']").addEventListener('click', function(e){
		let msg = lic; 
		alert (msg);
		e.preventDefault();
	});

	document.querySelector("a[title=apropos]").addEventListener('click', function(e){
		apropos.affiche();
		e.preventDefault(); // Pour ne pas suivre le lien.
	});

    /*
    * Gestion des tiroirs
    */
    var accordeons = document.querySelectorAll('.degrade');
    for ( let i = 0 ; i < accordeons.length ; i++ ){
			accordeons[i].style.display = 'none';
	}
	
	var titres = document.querySelectorAll('h3');
	for ( let i = 0; i < titres.length; i++){
		titres[i].addEventListener('click', function(){
			let tiroirs = document.querySelectorAll('.degrade');
			montreAccordeon(tiroirs[i].getAttribute('id'));
			titres[i].style.color = 'black';
	});
	} // Fin de la boucle for sur les titres
	


	
/* ***************************************************** */
/* Gestion du zoom */
/* ***************************************************** */

// Option d'affichage du texte : zoom pour travailler sur un vidéo-projecteur
 	document.getElementById("zoom1").addEventListener('click',function(){

 		if (this.checked == true){
			var optionZoom = true;
		}
		else{
			var optionZoom = false;
		}

		if (optionZoom == true){
			document.getElementById('exercice').style.fontSize = '1.5em';
			document.getElementById("une").style.display = 'none';
 		}
 		else{
 			document.getElementById('exercice').style.fontSize = '1em';
 			document.getElementById("une").style.display = 'block';
 		}
 	});

	/* ======================================================= */
	/* Evénement 0 : présentation et consigne...			   */
	/* ======================================================= */

  /* ----------------------------- */
  document.getElementById("action0").addEventListener('click', function(e){
	/* ----------------------------- */
	/* Commencer l'exercice */
		// On masque les zones de bilan :
		document.getElementById("succes").style.display = 'none';
		document.getElementById("echec").style.display = 'none';

		exo.prepare(); // On (ré)initialise certaines variables de l'exercice
		this.style.display = 'none'; // On cache le bouton cliqué.
	 	document.getElementById("etape2").style.display = 'none';
	 	document.getElementById("action1").style.display = 'none';

		// info sur la tolérance des erreurs dans le calcul du score :
		switch(exo.jokers){
		case 0:
			var infoErreurs = "Vous n'avez droit à aucune erreur.";
			break;
		case 1:
			var infoErreurs = "Vous avez droit à une erreur.";
			break;
		default:
			var infoErreurs = "Vous avez droit à "+ exo.jokers +" erreurs.";
		}
		// Nombre d'exécutions de l'exercice ?
		if (exo.maxEssais > 0){
			var fois = exo.maxEssais - exo.essais;
			switch( fois ){
				case 0:
					var infoEssais = "<br />C'est votre dernier essai.";
				break;
				default:
					var infoEssais = "<br />Vous pourrez encore exécuter " + fois + " fois cet exercice.";
			} // fin switch
		}
		else{
			var infoEssais = "<br />Vous pourrez exécuter cet exercice autant de fois que nécessaire.";
		}
		var msginitial = infoErreurs + infoEssais;
		document.getElementById("msg_initial").innerHTML = "<p>"+ msginitial + "</p>";

		// Le nombre initial de clics permis :
		if (exo.clics < 2){
			var infoclic = exo.clics + " clic restant.";
		}
		else{
			var infoclic = exo.clics + " clics restants.";
		}
		document.getElementById("clics").innerHTML = infoclic;
		// Si on clique sur le lien 'consigne' :

		/* ---------------------------------------- */
		// Texte de l'exercice
		//document.getElementById("exercice").innerHTML = exo.Exercice;


		/* ---------------------------------------- */
 		// On gère l'événement : Si on clique sur une unité du texte.

 		//document.querySelectorAll("#exercice > p > span").addEventListener('click', repere(){

		for ( let i = 0 ;  i < exo.mots ; i++ ){
		document.getElementById(i).addEventListener('click', function(){
		// On récupère l'id de cette unité :
			
 			var id = this.getAttribute('id');
			// Traitement des données : est-ce une bonne réponse, score, etc.
			var couleur = exo.cliquerSurUnite(id);
			// On modifie l'aspect de l'unité :
			this.style.color = couleur;
		});
		} // fin boucle for
	e.preventDefault();
 	});

/* Recommencer */
 	document.getElementById("action2").addEventListener('click', function(e){
	
		// On masque les zones de bilan :
		document.getElementById("succes").style.display = 'none';
		document.getElementById("echec").style.display = 'none';

		exo.prepare(); // On (ré)initialise certaines variables de l'exercice
		this.style.display = 'none'; // On cache le bouton cliqué.
	 	document.getElementById("etape2").style.display = 'none';
	 	document.getElementById("action1").style.display = 'none';


		// info sur la tolérance des erreurs dans le calcul du score :
		switch(exo.jokers){
		case 0:
			var infoErreurs = "Vous n'avez droit à aucune erreur.";
			break;
		case 1:
			var infoErreurs = "Vous avez droit à une erreur.";
			break;
		default:
			var infoErreurs = "Vous avez droit à "+ exo.jokers +" erreurs.";
		}
		// Nombre d'exécutions de l'exercice ?
		if (exo.maxEssais > 0){
			var fois = exo.maxEssais - exo.essais;
			switch( fois ){
				case 0:
					var infoEssais = "<br />C'est votre dernier essai.";
				break;
				default:
					var infoEssais = "<br />Vous pourrez encore exécuter " + fois + " fois cet exercice.";
			} // fin switch
		}
		else{
			var infoEssais = "<br />Vous pourrez exécuter cet exercice autant de fois que nécessaire.";
		}
		var msginitial = infoErreurs + infoEssais;
		document.getElementById("msg_initial").innerHTML = "<p>"+ msginitial + "</p>";

		// Le nombre initial de clics permis :
		if (exo.clics < 2){
			var infoclic = exo.clics + " clic restant.";
		}
		else{
			var infoclic = exo.clics + " clics restants.";
		}
		document.getElementById("clics").innerHTML = infoclic;


		/* ---------------------------------------- */
		// Texte de l'exercice
		document.getElementById("exercice").innerHTML = exo.Exercice;


		/* ---------------------------------------- */
		// Option d'affichage du texte : zoom pour travailler sur un vidéo-projecteur
 		// Par défaut, on a hérité le zoom de celui de la consigne.

 		/* ---------------------------------------- */
 		// On gère l'événement : Si on clique sur une unité du texte.
		for ( let i = 0 ; i < exo.mots ; i++ ){
		document.getElementById(i).addEventListener('click', function(){
		// On récupère l'id de cette unité :
 			var id = this.getAttribute('id');
			// Traitement des données : est-ce une bonne réponse, score, etc.
			var couleur = exo.cliquerSurUnite(id);
			// On modifie l'aspect de l'unité :
			this.style.color = couleur;
			});
		}
		e.preventDefault(); // On empêche le bouton de recharger la page sans les paramètres...
 	});

 	/* ----------------------------- */
 	document.getElementById("action1").addEventListener('click', function(e){
	/* Voir la solution */
 		// On prépare l'affichage de la solution qui héritera du zoom...
		exo.corrige();
		cons.afficherCommentaire();
 		document.getElementById("etape2").style.display = 'block';
		document.getElementById("etape1").style.display = 'none';
		e.preventDefault();
	});


/* ----------------------------- */
}); /*Fin de la fonction principale */


	
}); /* Fin de la fonction fetch */

