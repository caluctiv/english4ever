const cardElement = document.getElementById("card");
const categories = document.querySelectorAll(".category");
const scoreElement = document.getElementById("score");

let score = 0;
let totalCards = 10;
let currentCardIndex = 0;
let currentCardData = null;
let isDragging = false;

// Base de données des cartes (15 par catégorie)
const cards = [
  // Habitudes
  { text: "Lire un livre chaque soir", category: "true" },
  { text: "Se brosser les dents après le repas", category: "true" },
  { text: "Faire une promenade quotidienne", category: "true" },
  { text: "Boire un verre d'eau au réveil", category: "true" },
  { text: "Méditer chaque matin", category: "true" },
  { text: "Prendre des vitamines quotidiennement", category: "true" },
  { text: "Faire du yoga après le travail", category: "true" },
  { text: "Préparer le déjeuner la veille", category: "true" },
  { text: "Écrire un journal tous les soirs", category: "true" },
  { text: "Aller courir chaque matin", category: "true" },
  { text: "Boire du thé vert après le déjeuner", category: "true" },
  { text: "Planifier la journée le matin", category: "true" },
  { text: "Faire des exercices de respiration", category: "true" },
  { text: "Prendre une douche froide au réveil", category: "true" },
  { text: "Vérifier les emails après le petit-déjeuner", category: "true" },

  // Routine
  { text: "Aller à la salle de sport le mercredi", category: "false" },
  { text: "Faire une lessive chaque samedi", category: "false" },
  { text: "Changer les draps tous les dimanches", category: "false" },
  { text: "Aller au supermarché le lundi soir", category: "false" },
  { text: "Nettoyer la voiture chaque mois", category: "false" },
  { text: "Déposer les enfants à l'école", category: "false" },
  { text: "Préparer le petit-déjeuner chaque matin", category: "false" },
  { text: "Prendre un café à 10h", category: "false" },
  { text: "Appeler un parent chaque dimanche", category: "false" },
  { text: "Sortir les poubelles le mardi soir", category: "false" },
  { text: "Préparer le repas de famille le vendredi", category: "false" },
  { text: "Aller au marché le samedi matin", category: "false" },
  { text: "Ranger les courses après les avoir achetées", category: "false" },
  { text: "Faire une promenade après dîner", category: "false" },

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
  message.style.padding = "10px 20px";
  message.style.backgroundColor = text === "Correct !" ? "#4CAF50" : "#F44336";
  message.style.color = "white";
  message.style.borderRadius = "5px";
  message.style.fontWeight = "bold";
  document.body.appendChild(message);

  setTimeout(() => {
    document.body.removeChild(message);
  }, 1000);
}

// Fonction pour afficher le bouton "Réessayer" à la fin de la partie
function endGame() {
  displayMessage(`Finished game ! Scoring : ${score}/${totalCards}`);

  // Créer un élément de bouton "Réessayer"
  const retryButton = document.createElement("button");
  retryButton.classList.add("retry-button");
  retryButton.innerHTML = `<i class="retry-icon">&#8635;</i> Retry`;

  // Ajouter un événement pour recharger la page lorsque le bouton est cliqué
  retryButton.onclick = function() {
    window.location.reload();
  };

  // Ajouter le bouton à la fin du body ou à un conteneur spécifique
  document.body.appendChild(retryButton);
}

// Gestion des événements
cardElement.addEventListener("mousedown", () => {
  isDragging = true;
  cardElement.classList.add("dragging");
});

document.addEventListener("mousemove", (e) => {
  if (isDragging) {
    cardElement.style.left = `${e.pageX}px`;
    cardElement.style.top = `${e.pageY}px`;
  }
});

document.addEventListener("mouseup", () => {
  cardElement.classList.remove("dragging");
  dropCard();
});


