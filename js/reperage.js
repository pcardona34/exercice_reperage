/* 
 * reperage.js
 * 
 * Scripts de l'exerciseur de Reperage
 * (c) 2012 - Patrick Cardona
 * Reperage : version : 2.0
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
/* =================================================================== */
/* !!!!!!!!!!!!!!!! AVERTISSEMENT  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
/* =================================================================== */
/* 
	!!! IMPORTANT !!! Ne touchez pas à ce fichier à moins de posséder de solides
	connaissances en javascript, DOM et JQuery ! 
	
	Pour générer les données de l'exercice,
	utilisez le Générateur de Repérage : generateur.html !!!
*/
/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */

/* *********************** */
/* Données de l'exercice   */
/* *********************** */

/* Elles sont chargées grâce à l'objet 'data' au format JSON.
	Cet objet est défini dans le fichier de données 'data.json',
	dont le contenu est créé au moyen du Générateur.
*/ 

/* **************************************************** */
/* 	METHODES ET FONCTIONS...								*/
/* **************************************************** */

/* **************************************************************************  */
/*               Recherche la clé d'une valeur dans un tableau et la retourne  */
/*	Etend les méthodes natives de l'objet Array grâce à la méthode prototype   */
/* **************************************************************************  */

Array.prototype.contient = function (valeur) { 
	if(this.length > 0){
		for(var i=0 ; i < this.length ; i++){
			if(this[i] == valeur){
				return i;	
			}	
		}		
	}
return -1;	// Sinon : valeur retournée impossible pour un indice
}

// Supprimer des espaces au début ou à la fin
function trim (myString) 
{ 
return myString.replace(/^\s+/g,'').replace(/\s+$/g,'');
} 
/* ****************************************************************** */
/* Fonctions secondaires de gestion de l'interface					 */
/* ****************************************************************** */

/* ****************************************************************** */	
/* 	Affichage de la consigne générale                                 */
/*  On doit créer une instance de l'objet Consigne   				  */
/* ****************************************************************** */

// Constructeur de l'objet Consigne
function objConsigne(_soustitre, _auteur, _votreConsigne, _commentaire){

	// Valeurs par défaut
	this.soustitre = _soustitre;
	this.auteur = _auteur;
	this.votreConsigne = _votreConsigne;
	this.zoom = false;
	this.commentaire = _commentaire;
}
		
	/* ----------------------------- */

objConsigne.prototype.initialise = function(_soustitre, _auteur, _votreConsigne, _commentaire){
		// On modifie les données par défaut de l'exercice
	this.soustitre = _soustitre;
	this.auteur = _auteur;
	this.votreConsigne = _votreConsigne;
	this.commentaire = _commentaire;	
}
	
	/* ----------------------------- */
	
objConsigne.prototype.afficherUne = function(){
		
// On les insère dans l'interface grâce à JQuery :
	var soustitre = this.soustitre;
	var auteur = this.auteur;
	var votreConsigne = this.votreConsigne;
	
	$("#soustitre").html(soustitre);
	$("#titre_exo").html(soustitre);
	$("#auteur_exo").html(auteur);
	$("#votreconsigne").html("<p>"+ votreConsigne +"</p>");
		
	// Option d'affichage du texte : zoom pour travailler sur un vidéo-projecteur
 	$("input#zoom1").change(function(){
 		
 		if ($(this).is(":checked")){
			var optionZoom = true;
		}
		else{
			var optionZoom = false;
		}
 		
 		if (optionZoom == true){
 			$(".nozoom").toggleClass("zoom",true);
 			$("#une").hide();
 			$("#accordeons").accordion("resize");
 		}
 		else{
 			$(".nozoom").toggleClass("zoom",false);
 			$("#une").show();
 		}
 	});

	// On affiche ou masque des blocs :
	$("#accueil").hide();
	$("#bloc").hide();
	
	
	$("div#une").show();
	$("div#etape0").show();
}
	
	/* ----------------------------- */
	
objConsigne.prototype.info = function(){
	$.Zebra_Dialog(this.votreConsigne, {'title':"Consigne"});	
}

function interprete_commentaire(_com){
	var reg1 = /__/g;
	var com1 = _com.replace(reg1,"<em>");
	var reg2 = /_/g;
	var com2 = com1.replace(reg2,"</em>");
	return com2;
}

objConsigne.prototype.afficherCommentaire = function(){
	// On affiche le commentaire ?
	if (this.commentaire.length > 0){
		$("#commentaire").html("<h2>Remarque :</h2><p>" + interprete_commentaire(this.commentaire)  + "</p>");
	}	
}

/* ****************************************************************** */
/*  Déclaration de l'Objet Exercice                                   */
/*  S'utilise au moyen d'une instance de cet objet :                  */
/*                                                                    */
/*	var ex = new objExercice(parametres);                                       */
/*  var ex.mavar // Pour accéder à la valeur d'une propriété mavar    */
/*  ex.methode() // Pour exécuter une méthode                         */
/*                                                                    */
/* ****************************************************************** */

// Constructeur de la classe d'objet Exercice
function objExercice(_essais, _maxEssais, _justes, _reponses, _mots, _solutions, _optionMot, _Exercice, _texteExercice, _solution, _finConsigne, _couleur, _jokers){
	
	this.essais = _essais;
	this.maxEssais = _maxEssais;
	this.justes = _justes;
	this.reponses = _reponses;
	this.mots = _mots;
	this.solutions = _solutions;
	this.optionMot = _optionMot;
	this.Exercice = _Exercice;
	this.texteExercice = _texteExercice;
	this.solution = _solution;
	this.finConsigne = _finConsigne;
	this.couleur = _couleur;
	this.jokers = _jokers;
	this.clics = this.solutions + this.jokers;
}	
	
	/* ----------------------------- */
	
objExercice.prototype.initialise = function(_maxEssais, _mots, _solutions, _optionMot, _texteExercice, _solution, _jokers){
	
	this.essais = 0;
	this.maxEssais = _maxEssais;
	this.justes = 0;
	this.reponses = 0;
	this.mots = _mots;
	this.solutions = _solutions;
	this.optionMot = _optionMot;
	this.Exercice = "";
	this.texteExercice = _texteExercice;
	this.solution = _solution;
	this.jokers = _jokers;
	this.clics = this.solutions + this.jokers;
	this.couleur = "black";
}
	
	/* ----------------------------- */

objExercice.prototype.prepare = function(){
	 			
	this.essais++; // On ajoute un essai
	this.reponses = 0;
	this.justes = 0;
	this.clics = this.solutions + this.jokers;
		
	this.Exercice = this.afficheExercice( this.texteExercice );
		
	//this.finConsigne = "mots ou expressions";
		
}
	
	 /* ----------------------------- */
	 
objExercice.prototype.corrige = function(){
	
	var Exercice = this.afficheExercice(this.texteExercice);
	// On affiche le texte formaté de l'exercice :
	$("#solution").html(Exercice);		
	// On colore en bleu les solutions :				
	var solution = this.solution;
	for(var i=0; i < this.solutions; i++){
		$("#solution>p>span[id="+ solution[i] +"]").addClass("correction",true);
	} // fin boucle for
		
}

	/* ----------------------------- */
	/* Calcule le score */

objExercice.prototype.calculeScore = function(){
	var score = (this.justes / this.solutions) * 100;
	var pourcent = Math.round(score);
	return pourcent;	
}
	
	/* ----------------------------- */		

objExercice.prototype.selectionneReponse = function(ID){
	
	this.reponses++;
	var fin = 0; // fin des essais : oui = 7, non = 0
	var succes = 0; // sur le mot ou groupe cliqué : oui = 1, non = 0
	var encore = 0; // recommencer cet exercice, c-à-d nouvel essai : oui = 4, non = 0
		
	var indice = this.solution.contient(ID);
	
	if(indice != -1){ // Un entier >=0 si cet ID est une valeur 
						// stockée dans le tableau 'solution'
			
		// On informe :
		var message = "Bonne réponse : ";
		message = message + this.texteExercice[ID].replace(/#/," ") + " convient en effet.";
		this.justes++;
		succes = 1;			
	}
	else{
		// Mauvaise réponse :( :
		// On informe
		var message = "Mauvaise réponse : ";
		message += this.texteExercice[ID].replace(/#/," ") + " ne convient pas.";
	}
	
	if (this.justes == this.solutions){ // Fin possible de cette instance de l'exercice
		var monScore = this.calculeScore();
		if( monScore == 100 ){
			// Inutile de recommencer !
			message += " Votre score est de 100 %.";
			fin = 7;
			var bilan = fin + succes + encore;
			
			$("#succes").show();
						
			return bilan;
			
		}
		else{
			// Score imparfait : peut-on continuer ?
			if (this.reponses < this.solutions + this.jokers){
			// Oui, à priori
			fin = 0;
			}
		}
	}
			
	if (this.reponses == this.solutions + this.jokers){ // Fin de cette instance de l'exercice
		var monScore = this.calculeScore();
		if (monScore < 100){
			message += " Votre score est de ";
			message += monScore + " %. ";
		}
		// Peut-on recommencer ?
		if ( this.maxEssais > 0 ){ // Compteur d'essais actif
			if( this.essais == this.maxEssais ){ 
				// On met fin à l'exercice en permettant d'afficher la solution.
				encore = 0;
				fin = 7;	
			}
			else{
				// Il reste des essais...
				encore = 4;
				fin = 0;
			}
		}
		else
		{
		// Pas de compteur...	
			encore = 4;
			fin = 0;
		}
	}

	var bilan = fin + succes + encore;
	if (succes == 1){
		
		$("#succes").show();
	}else{
		
		$("#echec").show();
	}
	
	
	return bilan;	
}

	/* ----------------------------- */
		
objExercice.prototype.cliquerSurUnite = function(id){ 
		
	var couleur = "orange"; // par défaut... n'apparaîtra jamais !
		
	// On vérifie la validité de la réponse :
	var bilan = this.selectionneReponse(id);
	switch(bilan){
			
		case 8:
			// Fin de l'exercice après un succès :
			// On empêche le clic sur la zone d'exercice...
			$("#exercice>span").unbind("click");
			// Et on met un curseur de souris explicite :
			$("#exercice>span").hover(function(){
				$(this).css("cursor","wait");
			},
			function(){
				$(this).css("cursor","auto");
			});
			// on peut afficher le bouton de Solution :
			$("input#action1").val("Voir la solution");
			$("input#action1").show();
			// On masque l'info clics :
			$("#clics").html(" ");
			// Couleur à retourner
			couleur = "#3c9";
			break;
			
		case 7:
			// Fin de l'exercice après un échec :
			// On empêche le clic sur la zone d'exercice...
			$("#exercice>span").unbind("click");
			// Et on met un curseur de souris explicite :
			$("#exercice>span").hover(function(){
				$(this).css("cursor","wait");
			},
			function(){
				$(this).css("cursor","auto");
			});
			// on doit afficher le bouton de Solution :
			$("input#action1").val("Voir la solution");
			$("input#action1").show();
			// On masque l'info clics :
			$("#clics").html(" ");
			// Couleur à retourner
			couleur = "red";
			break;
			
		case 5:
			// On peut recommencer après un succès :
			// On empêche le clic sur la zone d'exercice...
			$("#exercice>span").unbind("click");
			// Et on met un curseur de souris explicite :
			$("#exercice>span").hover(function(){
				$(this).css("cursor","wait");
			},
			function(){
				$(this).css("cursor","auto");
			});
			// On doit afficher le bouton Recommencer :
			$("input#action1").val("Recommencer");
			$("input#action1").show();
			// On masque l'info clics :
			$("#clics").html(" ");
			// Couleur à retourner
			couleur = "#3c9";
			break;

		case 4:
			// On peut recommencer après un échec :
			// On empêche le clic sur la zone d'exercice...
			$("#exercice>span").unbind("click");
			// Et on met un curseur de souris explicite :
			$("#exercice>span").hover(function(){
				$(this).css("cursor","wait");
			},
			function(){
				$(this).css("cursor","auto");
			});
			// on doit afficher le bouton Recommencer :
			$("input#action1").val("Recommencer");
			$("input#action1").show();
			// On masque l'info clics :
			$("#clics").html(" ");
			// Couleur à retourner
			couleur = "red";
			break;
			
		case 1:
			// L'exercice continue après un succes
			couleur = "#3c9";
			this.clics--;
			if (this.clics < 2){
				var infoclic = this.clics + " clic restant.";
			}
			else{
				var infoclic = this.clics + " clics restants.";
			}
			$("#clics").html(infoclic);
			break;
						
		case 0:
		default:
			// L'exercice continue après un échec
			couleur = "red";
			this.clics--;
			if (this.clics < 2){
				var infoclic = this.clics + " clic restant.";
			}
			else{
				var infoclic = this.clics + " clics restants.";
			}
			$("#clics").html(infoclic);
		}
	return couleur;	
}

	/* ----------------------------- */
	/* Affichage de l'exercice       */

objExercice.prototype.afficheExercice = function(tableau){
	if(tableau.length > 0){		
		var texte = tableau;
		var afficheTexte = "<p>";
		var reg = /^#/;
		for(var i=0; i < texte.length; i++){
			if(reg.test(trim(texte[i]))){
				if(trim(texte[i]).length>1){
				// Cas : un # commence la chaine
					var fin_segment = trim(texte[i]).substring(1,this.length);
					afficheTexte += "<br />" + "<span id='"+i+"'>"+ fin_segment + "</span> ";
				}
				else{
					afficheTexte += trim(texte[i]).replace(reg,"<br />");
				}	
			}
			else{
				afficheTexte += " <span id=\"" + i + "\">" + trim(texte[i]) + "</span> ";
			}
					
		} // fin boucle for
		afficheTexte += "</p>";
		return afficheTexte;
	}
}

/* ****************************************************************** */







