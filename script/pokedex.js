
let numeroDepart = 0;
let nombreAffiche = 1;
let premierURLPokeAPI = "https://pokeapi.co/api/v2/"+"pokemon?offset="+numeroDepart+"&limit="+nombreAffiche;
let detailDuPokemonObserve = null;

let pokemonActuellementObserve;
let pokemonUrlDetail;
let adressePokemonPrecedent = null;
let adressePokemonSuivant = null;

function vider(element) {
 while(element.firstElementChild) {
    element.firstElementChild.remove();
 }
}
function afficherPokemonActuellementObserve() {
 const blockNom = document.getElementById("nom-pokemon");
 const blockSprite = document.getElementById("pokemon-sprite");
 vider(blockPourAfficher); 

 for(let pokemon of pokemonActuellementObserve){
  const block = document.createElement("div");
  const titre = document.createElement("h3");
  titre.innerText = pokemon.name;

  block.appendChild(titre);
  blockPourAfficher.appendChild(block);
  changerNumeroPokemon(numeroDepart + 1);
 }
}
function changerNumeroPokemon(numero) {
 const indice = document.getElementById("numeros-actuels");
 indice.innerText = numero;
}
function requeteDetailPokemon(url){
 const xhttp = new XMLHttpRequest();
 xhttp.open("GET", url, true);
 xhttp.send();

 xhttp.onload = function (){
  const response = JSON.parse(xhttp.responseText);
 
  detailDuPokemonObserve = response;
  console.log(detailDuPokemonObserve);
  const image = document.createElement("img");
  image.src = detailDuPokemonObserve.sprites.front_default;

  const blockPourAfficher = document.getElementById("sprite-pokemon");
  blockPourAfficher.appendChild(image);
 }
}
function requeteALaPokeAPI(url) {
 const xhttp = new XMLHttpRequest();
 xhttp.open("GET", url, true);
 xhttp.send();
 
 xhttp.onload = function (){
  const response = JSON.parse(xhttp.responseText);
 
  adressePokemonPrecedent = response.previous;
  if(adressePokemonPrecedent === null) {
   const button = document.getElementById("boutton-precedent");
   button.disabled = true;
  }
  else {
   const button = document.getElementById("boutton-precedent");
   button.disabled = false;
  }

  adressePokemonSuivant = response.next;
  if(adressePokemonSuivant === null) {
   const button = document.getElementById("boutton-suivant");
   button.disabled = true;
  }
  else {
   const button = document.getElementById("boutton-suivant");
   button.disabled = false;
  }

  pokemonActuellementObserve = response.results;
  pokemonUrlDetail = response.results[0].url;
  // Aller rechercher le détail du pokemon regarder
  requeteDetailPokemon(pokemonUrlDetail);
  afficherPokemonActuellementObserve();
 }

}
function pokemonSuivant() {
 numeroDepart += nombreAffiche;
 requeteALaPokeAPI(adressePokemonSuivant);

}
function pokemonPrecedent() {
 numeroDepart -= nombreAffiche;

 requeteALaPokeAPI(adressePokemonPrecedent);
}

requeteALaPokeAPI(premierURLPokeAPI);

function retourAccueil(fichierCible){
    location.href = fichierCible;
}