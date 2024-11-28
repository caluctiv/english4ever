const cardElement = document.getElementById("card");
const categories = document.querySelectorAll(".category");
const scoreElement = document.getElementById("score");

let score = 0;
let totalCards = 10;
let currentCardIndex = 0;
let currentCardData = null;
let isDragging = false;

// Base de données des cartes (modifiée pour inclure seulement "Habitude" et "Travail")
const cards = [
  // Habitudes
  { text: "Lire un livre chaque soir", category: "habit" },
  { text: "Se brosser les dents après le repas", category: "habit" },
  { text: "Faire une promenade quotidienne", category: "habit" },
  { text: "Boire un verre d'eau au réveil", category: "habit" },
  { text: "Méditer chaque matin", category: "habit" },
  { text: "Prendre des vitamines quotidiennement", category: "habit" },
  { text: "Faire du yoga après le travail", category: "habit" },
  { text: "Préparer le déjeuner la veille", category: "habit" },
  { text: "Écrire un journal tous les soirs", category: "habit" },
  { text: "Aller courir chaque matin", category: "habit" },

  // Travail
  { text: "Participer à une réunion d'équipe", category: "work" },
  { text: "Rédiger un rapport hebdomadaire", category: "work" },
  { text: "Planifier un projet", category: "work" },
  { text: "Passer des appels professionnels", category: "work" },
  { text: "Répondre aux emails le matin", category: "work" },
  { text: "Préparer une présentation", category: "work" },
  { text: "Faire une analyse de données", category: "work" },
  { text: "Assister à une formation en ligne", category: "work" },
  { text: "Mettre à jour un tableau de suivi", category: "work" },
  { text: "Collaborer avec un collègue", category: "work" }
];

// Mise à jour de la carte
function updateCard() {
  if (currentCardIndex >= totalCards) return endGame();

  currentCardData = cards[Math.floor(Math.random() * cards.length)];
  cardElement.textContent = currentCardData.text;
  cardElement.dataset.category = currentCardData.category;

  cardElement.style.top = "50%";
  cardElement.style.left = "50%";
  cardElement.style.transform = "translate(-50%, -50%)";
  cardElement.classList.remove("vibrate");
  isDragging = false;
}

// Vibrations en cas d'erreur
function vibrateCard() {
  cardElement.classList.add("vibrate");
  setTimeout(() => {
    cardElement.classList.remove("vibrate");
  }, 300);
}

// Déposer la carte
function dropCard() {
  if (!isDragging) return;

  let validDrop = false;

  categories.forEach((category) => {
    const cardRect = cardElement.getBoundingClientRect();
    const categoryRect = category.getBoundingClientRect();

    if (
      cardRect.right > categoryRect.left &&
      cardRect.left < categoryRect.right &&
      cardRect.bottom > categoryRect.top &&
      cardRect.top < categoryRect.bottom
    ) {
      validDrop = true;
      if (category.id === currentCardData.category) {
        score++;
        scoreElement.textContent = score;
        category.classList.add("active");
        displayMessage("Correct !");
        setTimeout(() => category.classList.remove("active"), 300);
      } else {
        vibrateCard();
        displayMessage("Incorrect !");
      }
    }
  });

  if (!validDrop) {
    vibrateCard();
    displayMessage("Incorrect !");
  }

  isDragging = false;
  currentCardIndex++;
  updateCard();
}

// Afficher un message temporaire
function displayMessage(text) {
  const message = document.createElement("div");
  message.textContent = text;
  message.style.position = "absolute";
  message.style.top = "10%";
  message.style.left = "50%";
  message.style.transform = "translateX(-50%)";
  message.style.color = "white";
  document.body.appendChild(message);

  setTimeout(() => {
    document.body.removeChild(message);
  }, 1000);
}

// Fin du jeu
function endGame() {
  alert("Le jeu est terminé ! Votre score est " + score + " sur " + totalCards);
}

// Fonction de démarrage
updateCard();
