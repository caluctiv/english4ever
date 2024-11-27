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
    card.innerHTML = cardData.text;
    card.dataset.category = cardData.category; // Stocke la catégorie correcte
  } else {
    endGame(); // Fin du jeu après 10 cartes
  }
}

function
