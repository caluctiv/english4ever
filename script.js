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
  { text: "Boire du thé vert après le déjeuner", category: "habit" },
  { text: "Planifier la journée le matin", category: "habit" },
  { text: "Faire des exercices de respiration", category: "habit" },
  { text: "Prendre une douche froide au réveil", category: "habit" },
  { text: "Vérifier les emails après le petit-déjeuner", category: "habit" },

  // Routine
  { text: "Aller à la salle de sport le mercredi", category: "routine" },
  { text: "Faire une lessive chaque samedi", category: "routine" },
  { text: "Changer les draps tous les dimanches", category: "routine" },
  { text: "Aller au supermarché le lundi soir", category: "routine" },
  { text: "Nettoyer la voiture chaque mois", category: "routine" },
  { text: "Déposer les enfants à l'école", category: "routine" },
  { text: "Préparer le petit-déjeuner chaque matin", category: "routine" },
  { text: "Prendre un café à 10h", category: "routine" },
  { text: "Appeler un parent chaque dimanche", category: "routine" },
  { text: "Sortir les poubelles le mardi soir", category: "routine" },
  { text: "Préparer le repas de famille le vendredi", category: "routine" },
  { text: "Aller au marché le samedi matin", category: "routine" },
  { text: "Ranger les courses après les avoir achetées", category: "routine" },
  { text: "Faire une promenade après dîner", category: "routine" },

  // Loisirs
  { text: "Regarder un film le samedi soir", category: "leisure" },
  { text: "Jouer à un jeu vidéo après le dîner", category: "leisure" },
  { text: "Lire un roman fantastique", category: "leisure" },
  { text: "Écouter de la musique en soirée", category: "leisure" },
  { text: "Aller au parc le dimanche après-midi", category: "leisure" },
  { text: "Regarder un match de football", category: "leisure" },
  { text: "Jouer à un jeu de société avec des amis", category: "leisure" },
  { text: "Aller au cinéma le vendredi soir", category: "leisure" },
  { text: "Visiter une galerie d'art", category: "leisure" },
  { text: "Planifier une sortie entre amis", category: "leisure" },
  { text: "Participer à un atelier créatif", category: "leisure" },
  { text: "Pratiquer un instrument de musique", category: "leisure" },
  { text: "Faire du jardinage", category: "leisure" },
  { text: "Observer les étoiles la nuit", category: "leisure" },
  { text: "Photographier la nature", category: "leisure" },

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
  { text: "Collaborer avec un collègue", category: "work" },
  { text: "Examiner les objectifs mensuels", category: "work" },
  { text: "Organiser les fichiers numériques", category: "work" },
  { text: "Créer un calendrier de travail", category: "work" },
  { text: "Passer un entretien d'embauche", category: "work" },
  { text: "Superviser un stagiaire", category: "work" },
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
  message.style.backgroundColor = "#000";
  message.style.color = "#fff";
  message.style.fontSize = "18px";
  message.style.borderRadius = "5px";
  document.body.appendChild(message);
  setTimeout(() => {
    document.body.removeChild(message);
  }, 1000);
}

// Fin du jeu
function endGame() {
  alert(`Partie terminée ! Votre score est de ${score}/${totalCards}`);
}

// Déplacement de la carte
cardElement.addEventListener("mousedown", (event) => {
  isDragging = true;
});

document.addEventListener("mousemove", (event) => {
  if (!isDragging) return;

  const x = event.clientX - cardElement.offsetWidth / 2;
  const y = event.clientY - cardElement.offsetHeight / 2;

  cardElement.style.left = `${x}px`;
  cardElement.style.top = `${y}px`;
});

document.addEventListener("mouseup", dropCard);

// Initialiser le jeu
updateCard();
