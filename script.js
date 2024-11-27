let score = 0;
let mistakes = 0;
let totalCards = 10; // Nombre total de cartes à classer
let currentCardIndex = 0;

// Base de données des cartes avec leur catégorie correcte
const cards = [
  { text: "Manger 5 fruits ou légumes chaque jour", category: "habit" },
  { text: "Se brosser les dents chaque matin", category: "habit" },
  { text: "Faire du sport chaque lundi", category: "routine" },
  { text: "Se coucher à 22h tous les soirs", category: "routine" },
  { text: "Boire un verre d'eau après chaque repas", category: "habit" },
  { text: "Faire les courses chaque samedi", category: "routine" },
  { text: "Lire un livre avant de dormir", category: "habit" },
  { text: "Nettoyer la maison chaque semaine", category: "routine" },
  { text: "Préparer son sac la veille", category: "habit" },
  { text: "Faire une réunion tous les lundis", category: "routine" },
  { text: "Se détendre avec un café chaque matin", category: "habit" },
  { text: "Prendre un petit-déjeuner à 7h chaque jour", category: "habit" },
  { text: "Aller à la salle de gym tous les mercredis", category: "routine" },
  { text: "Planifier sa semaine chaque dimanche", category: "routine" },
  { text: "Méditer chaque matin pendant 10 minutes", category: "habit" },
];

// Sélectionne une carte aléatoirement
function getRandomCard() {
  const randomIndex = Math.floor(Math.random() * cards.length);
  return cards[randomIndex];
}

// Met à jour la carte affichée
function updateCard() {
  if (currentCardIndex < totalCards) {
    const cardData = getRandomCard();
    const card = document.getElementById("card");
    card.innerHTML = cardData.text;
    card.dataset.category = cardData.category; // Stocke la catégorie correcte
  } else {
    endGame(); // Fin du jeu après 10 cartes
  }
}

// Fonction appelée à la fin du jeu
function endGame() {
  alert("Le jeu est terminé ! Votre score : " + score + " sur 10, avec " + mistakes + " erreurs.");
}

// Fonction pour gérer le dépôt de la carte dans une catégorie
function drop(event, expectedCategory) {
  event.preventDefault();
  
  const card = document.getElementById("card");
  const cardCategory = card.dataset.category; // Récupère la catégorie correcte de la carte

  if (cardCategory === expectedCategory) {
    score++;
    alert("Correct !");
  } else {
    mistakes++;
    alert("Incorrect !");
  }

  currentCardIndex++;
  updateScore();  // Mettre à jour le score affiché
  updateCard();   // Mettre à jour la carte après le dépôt
}

// Fonction pour permettre le drag-and-drop
function allowDrop(event) {
  event.preventDefault();
}

// Fonction pour gérer le drag (commence le drag)
function drag(event) {
  event.dataTransfer.setData("text", event.target.id);
}

// Fonction pour mettre à jour le score affiché
function updateScore() {
  document.getElementById("score").innerText = score;
}

// Initialisation du jeu
document.addEventListener("DOMContentLoaded", function() {
  updateCard(); // Charge la première carte au démarrage du jeu

  // Zones de dépôt (habit et routine) - Assure-toi que ces éléments existent dans ton HTML
  const habitZone = document.getElementById("habit");
  const routineZone = document.getElementById("routine");
  const card = document.getElementById("card");

  habitZone.ondragover = allowDrop;
  routineZone.ondragover = allowDrop;

  habitZone.ondrop = (event) => drop(event, "habit");
  routineZone.ondrop = (event) => drop(event, "routine");

  card.ondragstart = drag;  // Activer le drag sur la carte
});
