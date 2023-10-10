const inputZone = document.querySelector(".nomDeVille");
const btnSubmit = document.querySelector(".submit");
const zoneInfos = document.querySelector(".infos");
zoneInfos.style.display = "none";

const zoneImage = document.querySelector(".weather-icon");
const affichageTemperature = document.querySelector(".temp");
const affichageNomVille = document.querySelector(".nom-ville");
const affichageHumidite = document.querySelector(".humidite");
const affichageVent = document.querySelector(".vent");

let villeCherchee = "";
let url = [
  "https://api.openweathermap.org/geo/1.0/direct?q=",
  ".&limit=1&appid=8625c99bafcf31e818141fd601069d02",
];
let lat = "";
let lon = "";
let temp = "";
let img = "";
let nom = "";
let humidite = "";
let vent = "";
let pays = "";

function fetchResult(url) {
  // fonction pour récupérer la lattitude et la longitude des villes demandées.
  return fetch(url)
    .then((result) => {
      if (!result.ok) {
        throw new Error(`Erreur HTTP! Statut : ${result.status}`);
      }
      return result.json();
    })
    .catch((err) => {
      console.error("Erreur :", err);
    });
}

function majAffichage(donnees) {
  // fonction pour utiliser les données récupérées via l'API et mettre à jour l'affichage
  temp = Math.round(donnees.main.temp) + "°C";
  img = "Images/" + donnees.weather[0].icon + ".png";
  pays = donnees.sys.country;
  nom = donnees.name + ` (${pays})`;
  humidite = donnees.main.humidity + " %";
  vent = Math.round(donnees.wind.speed * 3.6) + " km/h";
  zoneImage.setAttribute("src", img);
  affichageTemperature.innerHTML = temp;
  affichageNomVille.innerHTML = nom;
  affichageHumidite.innerHTML = humidite;
  affichageVent.innerHTML = vent;
  inputZone.value = "";
  inputZone.focus();
}

btnSubmit.addEventListener("click", () => {
  if (zoneInfos.style.display === "none") {
    zoneInfos.style.display = "inline";
  }
  let url1 = `${url[0]}${inputZone.value}${url[1]}`;
  villeCherchee = inputZone.value;
  fetchResult(url1).then((result) => {
    console.log(result);
    lat = result[0].lat;
    lon = result[0].lon;
    let url2 = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=8625c99bafcf31e818141fd601069d02&lang=fr&units=metric`;
    fetchResult(url2).then((result) => {
      console.log(result);
      majAffichage(result);
    });
  });
});
