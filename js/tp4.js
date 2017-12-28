    var GEO_NAMES = "http://www.geonames.org/postalCodeLookupJSON";
// GEONAMES DE SECOURS: http://chabloz.eu/cp/postalCodeLookupJSON.php
// Web Service de secours valide uniquement avec les codes postaux suivants:
// 1000, 12000, 1401, 1700, 2000
var GOOGLE_MAP = "https://maps.googleapis.com/maps/api/staticmap";
var GOOGLE_MAP_PARA = "zoom=14&size=500x400&maptype=satellite&sensor=false&key=ABQIAAAA1nu4VMtb7TfHd-Dxiy9HmxRi_j0U6kJrkFvY4-OX2XYmEAa76BS_R3kzv5sXG5MMtQXVf5ySWN6_FQ&center=";

$(function (){
    $("#localite").on("change", updateMap);
    $("#code").on("keyup", function (event){
        //console.log(event.key); affiche tous les caractères entrés par le keyboard
        var cp = $("#code").val();
        if(cp.length !== 4) return;
        if(cp < 1000 || cp > 9999) return;
            //console.log(event.key);
        $.getJSON(GEO_NAMES, {postalcode : cp, country : "CH"}, updateLocalite);  
        
    });
    
});

function updateMap(event){
    console.log(event);
    console.log($("#localite option:selected"));
    var option = $("#localite option:selected");
    console.log(option.data("lng"));
    $("#map img").attr("src", "https://maps.googleapis.com/maps/api/staticmap?center="+ option.data("lat") + "," +  option.data("lng") + "&zoom=10&size=500x400&sensor=false&key=ABQIAAAA1nu4VMtb7TfHd-Dxiy9HmxRi_j0U6kJrkFvY4-OX2XYmEAa76BS_R3kzv5sXG5MMtQXVf5ySWN6_FQ");
}


function updateLocalite(data){
    //console.log(data);  
    //console.log("test 1");
    $("select").empty();
    

    $.each(data.postalcodes, function(i, localite){
        var option = $("<option>");
        //console.log(localite.adminName3);
        option.text(localite.adminName3);
        //On sauvegarde dans le DOM la valeur de localite.lng dans une variable lng du DOM (n'apparait pas dans le DOM)
        option.data("lng", localite.lng);
        option.data("lat", localite.lat);
        //Pour les récupérer
        console.log(option.data("lat"));
        //Créer un attribut - moins propre - et sauvegarder aussi la variable lng (apparait dans le DOM)
        option.attr("data-lng", localite.lng);
        //$("select").append(option); OU :
        option.appendTo("#localite");
    });
    
    //Lorsque la liste déroulante a changé, je le fais savoir à tout le monde
    $("#localite").trigger("change");
    
    
    
    //Ca, dans ce cas, ça ferait la même chose. Mais peut-être que d'autres fonctions sont intéressés par le fait qu'il y a du changement !!! Donc mieux de dire qu'il y a un événement
    //updateMap();
}