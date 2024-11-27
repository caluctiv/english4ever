let score = 0;
let mistakes = 0;
let totalCards = 10; // Nombre total de cartes à classer
let currentCardIndex = 0;
let isDragging = false;
let offsetX, offsetY;
let selectedCard;
let categories = document.querySelectorAll('.category');

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
  if (score === 10) {
    alert("Félicitations, score parfait ! Vous avez " + score + "/10 !");
    triggerConfetti(); // Lance les confettis si tu veux en garder l'option
  } else {
    alert("Le jeu est terminé ! Votre score : " + score + " sur 10, avec " + mistakes + " erreurs.");
  }
}

// Détecte si la carte est dans une des catégories
function checkCardInCategory(card, category) {
  const cardRect = card.getBoundingClientRect();
  const categoryRect = category.getBoundingClientRect();
  
  return !(cardRect.right < categoryRect.left ||
           cardRect.left > categoryRect.right ||
           cardRect.bottom < categoryRect.top ||
           cardRect.top > categoryRect.bottom);
}

// Déplace la carte en suivant la souris
document.addEventListener("mousemove", function(event) {
  if (isDragging && selectedCard) {
    selectedCard.style.left = event.clientX - offsetX + "px";
    selectedCard.style.top = event.clientY - offsetY + "px";
  }
});

document.addEventListener("mousedown", function(event) {
  const card = document.getElementById("card");
  
  if (event.target === card) {
    isDragging = true;
    selectedCard = card;
    offsetX = event.offsetX;
    offsetY = event.offsetY;
  }
});

document.addEventListener("mouseup", function(event) {
  if (isDragging) {
    let droppedInCorrectCategory = false;
    categories.forEach(category => {
      if (checkCardInCategory(selectedCard, category)) {
        if (selectedCard.dataset.category === category.id) {
          score++;
          category.classList.add("active"); // Animation si la carte est correcte
          setTimeout(() => {
            category.classList.remove("active");
          }, 300);
          droppedInCorrectCategory = true;
        }
      }
    });
    
    if (!droppedInCorrectCategory) {
      mistakes++;
      selectedCard.classList.add("vibrate"); // Vibration en cas d'erreur
      setTimeout(() => {
        selectedCard.classList.remove("vibrate");
      }, 300);
    }
    
    isDragging = false;
    selectedCard.style.left = "50%";  // Réinitialise la carte au centre
    selectedCard.style.top = "50%";
    updateCard();
  }
});

// Initialiser le jeu
updateCard();
