/* 
 * apropos.js
 * 
 * A propos : affichage des informations relatives aux auteurs et aux sources
 * ( c ) 2012-2013 Patrick Cardona - 
 * Version 1.0.0
 * 
 * @source: http://code.google.com/p/Repérage/
 * 
 */

/* =================================================================== */
/* LICENCE
/* =================================================================== */
/*
@licstart  The following is the entire license notice for the 
    JavaScript code in this page.

Copyright (C) 2012-2013  Patrick CARDONA - A propos

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

function oApropos( _auteur, _annee, _nom_appli, _version) {
	this.merci = new Array();
	this.auteur = _auteur;
	this.nom_appli = _nom_appli;
	this.annee = _annee;
	this.version = _version;
	this.img = "";	
}

oApropos.prototype.ajoute = function(_app, _url_site, _lic, _url_source) {
	var ref = new Array(_app, _url_site, _lic, _url_source);
	this.merci.push( ref );	
}

oApropos.prototype.licence = function(_type){
	switch (_type){
		case "GPL":
			var lic = "<a href='http://www.gnu.org/licenses/gpl-3.0.html'>Licence GPL</a>";
			return lic;
		break;
		
		case "MIT":
			var lic = "<a href='http://www.opensource.org/licenses/mit-license.php'>Licence MIT</a>";
			return lic;
		break;
		
		case "BOTH":
			var lic = "<a href='http://www.gnu.org/licenses/gpl-3.0.html'>Licence GPL</a> et ";
			lic += "<a href='http://www.opensource.org/licenses/mit-license.php'>Licence MIT</a>";
			return lic;
		break;
		
		case "CC":
			var lic = "<a href='http://creativecommons.org/licenses/by-nc/2.0/fr/'>Licence CC-By-NC</a>";
			return lic;
		break;
		
		default:
			var lic = "Licence inconnue !";
			return lic;
	}
}

oApropos.prototype.affiche = function() {
	var msg = "<h1 class=\"apropos\">À propos de "+ this.nom_appli +" "+ this.version +"</h1>";
	msg += "<h2 class=\"apropos\">©"+ this.annee +" "+ this.auteur +"</h2>";
	msg += "<p class=\"apropos\">Cette application est un logiciel libre, réalisé grâce à :</p>";
	for (var i = 0; i < this.merci.length ; i++){
		msg	+= "<p><a href=\""+ this.merci[i][1] +"\">"+ this.merci[i][0] +"</a>";
		msg += " ("+ this.licence(this.merci[i][2]) +" - <a href='"+ this.merci[i][3] +"'>code source</a>)</p>";
	}
	
	msg +=this.img;
	$.Zebra_Dialog ( msg, {'title':"À propos...",'width':'600'} );
	
}

var apropos = new oApropos("Patrick Cardona", "2012-2013", "Repérage", "2.1.0");

// App ou API courantes :
apropos.ajoute ("jQuery", "http://jquery.com/", "BOTH", "http://docs.jquery.com/Source_Code");
apropos.ajoute ("Zebra Dialog de Stefan Gabos", "http://stefangabos.ro/jquery/zebra-dialog/", "BOTH", "https://github.com/stefangabos/Zebra_Dialog/archive/master.zip");
apropos.ajoute("Repérage de Patrick Cardona", "http://code.google.com/p/reperage/", "GPL", "http://code.google.com/p/reperage/");

var img = "<p>Les smileys utilisés dans l'exerciseur de Repérage proviennent de la collection Tango, galerie OpenClipart.org. <br />Auteur : Warszawianka</p>";
img += "<p>Package Zip Icon : sous licence CC By-Nc. Auteur : Thvg (Thrasos Varnava).</p>";
img += "<p>Logos de Repérage : © Patrick Cardona.</p>";
apropos.img = img;

/*
 * Gestion du lien 'à propos' dans l'interface
 */

