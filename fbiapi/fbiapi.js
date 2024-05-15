let shuffledData = [];

function fetchFBI(page) {
  fetch(`https://api.fbi.gov/wanted/v1/list?page=${page}`)
    .then((response) => response.json())
    .then((data) => {
      shuffledData = shuffleArray(data.items);
      displayRandomPerson();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function displayRandomPerson() {
  let randomPerson =
    shuffledData[Math.floor(Math.random() * shuffledData.length)];

  let imageUrl = randomPerson.images[0].large;
  let imgElement = document.getElementById("image_wanted");
  imgElement.src = imageUrl;

  let nameLink = document.getElementById("name_wanted");
  nameLink.href = randomPerson.files[0].url;
  nameLink.textContent = randomPerson.title;
  nameLink.classList.add("personLink");

  if (randomPerson.aliases) {
    let aliases = document.getElementById("aliases")
    aliases.textContent = randomPerson.aliases[0].charAt(0).toUpperCase() + randomPerson.aliases[0].slice(1).toLowerCase();

  }
  else {
    let race = document.getElementById("aliases")
    race.textContent = "Unknown";
  }

  // ejemplo de raza contniuar con lo demas
  if (randomPerson.race) {    
    let race = document.getElementById("race")
    race.textContent = randomPerson.race.charAt(0).toUpperCase() + randomPerson.race.slice(1).toLowerCase();
  }
  else{
    let race = document.getElementById("race")
    race.textContent = "Unknown";
  }
  

  if (randomPerson.sex) {
    let sex = document.getElementById("sex")
    sex.textContent = randomPerson.sex.charAt(0).toUpperCase() + randomPerson.sex.slice(1).toLowerCase();

  }
  else {
    let race = document.getElementById("sex")
    race.textContent = "Unknown";

  }

  if (randomPerson.nationality) {
    let nationality = document.getElementById("nationality")
    nationality.textContent = randomPerson.nationality.charAt(0).toUpperCase() + randomPerson.nationality.slice(1).toLowerCase();

  }
  else {
    let race = document.getElementById("nationality")
    race.textContent = "Unknown";
  }

  if (randomPerson.eyes) {
    let eyes = document.getElementById("eyes")
    eyes.textContent = randomPerson.eyes.charAt(0).toUpperCase() + randomPerson.eyes.slice(1).toLowerCase();

  }
  else {
    let eyes = document.getElementById("eyes")
    race.textContent = "Unknown";
  }

  if (randomPerson.poster_classification) {
    let poster_classification = document.getElementById("poster_classification")
    poster_classification.textContent = randomPerson.poster_classification.charAt(0).toUpperCase() + randomPerson.poster_classification.slice(1).toLowerCase();

  }
  else {
    let eyes = document.getElementById("eyes")
    race.textContent = "Unknown";
  }

  console.log(randomPerson)
  let textElement = document.getElementById("about_wanted");
  textElement.textContent = randomPerson.description;
}



function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

let reloadButton = document.getElementById("reloadButton");
let pageInput = document.getElementById('page');

// Guardar el valor del campo de entrada en localStorage cuando cambia
pageInput.addEventListener("change", function () {
  let page = pageInput.value;
  localStorage.setItem('currentPage', page);
});

reloadButton.addEventListener("click", function () {
  let page = pageInput.value;
  fetchFBI(page); 
});

// Obtener el valor del campo de entrada del almacenamiento local
let savedPage = localStorage.getItem('currentPage');
if (savedPage) {
  pageInput.value = savedPage;
}

fetchFBI(savedPage || 1);
