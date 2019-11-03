/*
 * parametres.js
 *
 * Données par défaut : utilisées pour le mode démo
 * si data.json est absent
 * ( c ) 2012-2019 Patrick Cardona - Exercice de Reperage 3.0.0
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

Copyright (C) 2012-2019 Patrick CARDONA - A propos

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


// Récupération du paramètre "numero" : d'après MSDN

function obtenirParametre(sVar) {
  return unescape(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + escape(sVar).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
}

var numero = obtenirParametre('numero');
if (!numero) {
	alert("Syntaxe : http://votre_serveur/exercice_reperage/reperage.html?numero=31 pour charger l'exercice de repérage 31 (c-à-d reperage31.json).");
}
else
    {
	var donnees = 'json/reperage' + numero + '.json';
    }
	

/*
 * Valeurs par défaut de l'exercice si aucun fichier 'data.json' n'est présent.
 */

	var soustitreDef = "Mon exercice";
	var auteurDef = "Anonyme";
	var votreConsigneDef = "Aucun fichier JSON chargé dans l'exerciseur. Ceci est un exercice fictif.<br />";
	votreConsigneDef += "Cliquez sur les couleurs."
	var commentaireDef = "Aucun commentaire.";

// Valeurs par défaut de l'Exercice
	var essaisDef = 0;
	var maxEssaisDef = 5;
	var justesDef = 0;
	var reponsesDef = 0;
	var motsDef = 4;
	var solutionsDef = 2;
	var optionMotDef = "on";
	var ExerciceDef = "";
	var finConsigneDef = "mots";
	var couleurDef = "black";
	var texteExerciceDef = new Array("Arbre","bleu","prune bleue","maison");
	var solutionDef = new Array("1","2");
	var jokersDef = 0;



