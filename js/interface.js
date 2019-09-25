/* 
 * interface.js
 * 
 * Reperage : interface de l'exercice de repérage 
 * ( c ) 2012 - Patrick Cardona
 * Version : 2.0
 * 
 * @source: http://code.google.com/p/reperage/
 * 
 */

/* =================================================================== */
/* LICENCE
/* =================================================================== */
/*
@licstart  The following is the entire license notice for the 
    JavaScript code in this page.

Copyright (C) 2012  Patrick CARDONA - Reperage

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


/* *************************************************************************************** */
/* Gestionnaire de l'Interface utilisateur au moyen de gestionnaires d'événements JQuery   */
/* *************************************************************************************** */

$("document").ready(function(){

// On crée une instance de l'objet Consigne :
var cons = new objConsigne(soustitreDef, auteurDef, votreConsigneDef, commentaireDef);
// On crée une instance de cet objet avec les valeurs par défaut
var exo = new objExercice(essaisDef, maxEssaisDef, justesDef, reponsesDef, motsDef, solutionsDef, optionMotDef, ExerciceDef, texteExerciceDef, solutionDef, finConsigneDef, couleurDef, jokersDef);

// On initialise le facteur de zoom
$("#zoom1").attr("checked",false);

// On masque les zones de bilan :
$("#succes").hide();
$("#echec").hide();

/*
	 * Lien licence
	 */
	$("a[title='licence']").click(function(e){
		var msg = lic; 
		$.Zebra_Dialog(msg, {'title':"Licence",'width':'600'});
		e.preventDefault();
	});
	
	$("a[title=apropos]").click(function(e){
		apropos.affiche();
		e.preventDefault(); // Pour ne pas suivre le lien.
	});

    /*
    * Gestion des tiroirs
    */
    $("#accordeons").accordion({ fillSpace: true });

// On charge les données de cet exercice
$.getJSON('data.json', function(data) {
	cons.initialise(data.soustitre, data.auteur, data.votreConsigne, data.commentaire);
  	exo.initialise(parseInt(data.maxEssais), parseInt(data.mots), parseInt(data.solutions), data.optionMot, data.texteExercice, data.solution, parseInt(data.jokers));

	// On affiche la consigne et l'option zoom :
    $("#bloc").hide();
    cons.afficherUne();
    
	// On prépare l'exercice dans sa zone
    $("#action0").click();
});




	
	/* ======================================================= */
	/* Evénement 0 : présentation et consigne...			   */
	/* ======================================================= */
	
	
  /* ----------------------------- */
  $("input:submit").click(function(){
	// On récupère le libellé du bouton cliqué.
	var monAction = $(this).val();
	// On va gérer les événements en fonction du libellé du bouton cliqué :
	
	switch ( monAction ){
	
	/* ----------------------------- */	
	case "Commencer l'exercice":
		// On masque les zones de bilan :
		$("#succes").hide();
		$("#echec").hide();
		
		exo.prepare(); // On (ré)initialise certaines variables de l'exercice
		$(this).hide(); // On cache le bouton cliqué.
	 	$("div#etape2").hide();
	 	$("#action1").hide();
	    	
		
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
		$("#msg_initial").html("<p>"+ msginitial + "</p>");
		
		// Le nombre initial de clics permis :
		if (exo.clics < 2){
			var infoclic = exo.clics + " clic restant.";
		}
		else{
			var infoclic = exo.clics + " clics restants.";
		}
		$("#clics").html(infoclic);
		// Si on clique sur le lien 'consigne' :
		
		/* ---------------------------------------- */		
		// Texte de l'exercice
		$("#exercice").html(exo.Exercice);
		
		
		/* ---------------------------------------- */
		// Option d'affichage du texte : zoom pour travailler sur un vidéo-projecteur
 		// Par défaut, on a hérité le zoom de celui de la consigne.
 		
 		/* ---------------------------------------- */
 		// On gère l'événement : Si on clique sur une unité du texte.
 		$("#exercice>p>span").click(function(){
		// On récupère l'id de cette unité :
 			var id = $(this).attr("id");
			// Traitement des données : est-ce une bonne réponse, score, etc.
			var couleur = exo.cliquerSurUnite(id);
			// On modifie l'aspect de l'unité :
			$(this).css("color", couleur);
		});
		
		
		
					
 	break;
 	
 	case "Recommencer":
		// On masque les zones de bilan :
		$("#succes").hide();
		$("#echec").hide();
		
		exo.prepare(); // On (ré)initialise certaines variables de l'exercice
		$(this).hide(); // On cache le bouton cliqué.
	 	$("div#etape2").hide();
	 	$("#action1").hide();
	    	
		
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
		$("#msg_initial").html("<p>"+ msginitial + "</p>");
		
		// Le nombre initial de clics permis :
		if (exo.clics < 2){
			var infoclic = exo.clics + " clic restant.";
		}
		else{
			var infoclic = exo.clics + " clics restants.";
		}
		$("#clics").html(infoclic);
		
		
		/* ---------------------------------------- */		
		// Texte de l'exercice
		$("#exercice").html(exo.Exercice);
		
		
		/* ---------------------------------------- */
		// Option d'affichage du texte : zoom pour travailler sur un vidéo-projecteur
 		// Par défaut, on a hérité le zoom de celui de la consigne.
 		
 		/* ---------------------------------------- */
 		// On gère l'événement : Si on clique sur une unité du texte.
 		$("#exercice>p>span").click(function(){
		// On récupère l'id de cette unité :
 			var id = $(this).attr("id");
			// Traitement des données : est-ce une bonne réponse, score, etc.
			var couleur = exo.cliquerSurUnite(id);
			// On modifie l'aspect de l'unité :
			$(this).css("color", couleur);
		});
		
		
 	break;
 	
 	/* ----------------------------- */	
 	case "Voir la solution":
 		// On prépare l'affichage de la solution qui héritera du zoom...
		exo.corrige();
		cons.afficherCommentaire();
 		$("div#etape2").show();
		$("div#etape1").hide();
		

	break;
	
	/* ----------------------------- */
	case "Afficher la consigne":
		cons.afficherUne();
		
		$("#bloc").hide();
	break;
	
	/* ----------------------------- */
	default:
		alert('Cet événement n\'est pas géré...');
		
	break;	
	/* ----------------------------- */				
	}// fin du switch
		
	/* ----------------------------- */
	return false;
	}); // Fin du gestionnaire d'événement : clique sur un bouton...
/* ----------------------------- */			
}); // Fin de la fonction .ready()

