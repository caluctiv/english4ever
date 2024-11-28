const cardElement = document.getElementById("card");
const categories = document.querySelectorAll(".category");
const scoreElement = document.getElementById("score");

let score = 0;
let totalCards = 10;
let currentCardIndex = 0;
let currentCardData = null;

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
}

// Vérifier si la carte est dans une catégorie valide
function checkDrop(event) {
  let validDrop = false;

  categories.forEach((category) => {
    const cardRect = cardElement.getBoundingClientRect();
    const categoryRect = category.getBoundingClientRect();

    // Vérification si la carte est dans la zone de la catégorie
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
        displayMessage("Incorrect !");
      }
    }
  });

  if (!validDrop) {
    displayMessage("Incorrect !");
  }

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

// Événements de souris et tactile
cardElement.addEventListener("click", (event) => {
  // Déplacer la carte à l'endroit du clic
  const rect = cardElement.getBoundingClientRect();
  const offsetX = event.clientX - rect.width / 2;
  const offsetY = event.clientY - rect.height / 2;

  cardElement.style.left = `${offsetX}px`;
  cardElement.style.top = `${offsetY}px`;

  // Vérifier si la carte a été déposée dans une catégorie
  checkDrop(event);
});

document.addEventListener("touchstart", (event) => {
  const touch = event.touches[0];
  const rect = cardElement.getBoundingClientRect();
  const offsetX = touch.clientX - rect.width / 2;
  const offsetY = touch.clientY - rect.height / 2;

  cardElement.style.left = `${offsetX}px`;
  cardElement.style.top = `${offsetY}px`;

  // Vérifier si la carte a été déposée dans une catégorie
  checkDrop(event);
}, { passive: true });
