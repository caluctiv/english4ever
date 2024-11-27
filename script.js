const cardElement = document.getElementById("card");
const categories = document.querySelectorAll(".category");
const scoreElement = document.getElementById("score");

let score = 0;
let totalCards = 10;
let currentCardIndex = 0;
let currentCardData = null;
let isDragging = false;

// Base de données des cartes (ajout de plus de types)
const cards = [
  { text: "Lire un livre avant de dormir", category: "habit" },
  { text: "Faire une réunion chaque lundi", category: "work" },
  { text: "Regarder un film le dimanche soir", category: "leisure" },
  { text: "Méditer chaque matin", category: "habit" },
  { text: "Planifier une tâche au travail", category: "work" },
  { text: "Aller à la salle de sport le mercredi", category: "routine" },
  { text: "Jouer à un jeu vidéo chaque soir", category: "leisure" },
];

// Initialisation
function updateCard() {
  if (currentCardIndex >= totalCards) return endGame();

  currentCardData = cards[Math.floor(Math.random() * cards.length)];
  cardElement.textContent = currentCardData.text;
  cardElement.dataset.category = currentCardData.category;

  cardElement.style.top = "50%";
  cardElement.style.left = "50%";
  cardElement.style.transform = "translate(-50%, -50%)";
  isDragging = false;
}

function moveCard(e) {
  if (!isDragging) return;

  cardElement.style.left = `${e.pageX}px`;
  cardElement.style.top = `${e.pageY}px`;
}

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
        setTimeout(() => category.classList.remove("active"), 300);
      }
    }
  });

  if (!validDrop) {
    alert("Mauvais emplacement !");
  }

  isDragging = false;
  currentCardIndex++;
  updateCard();
}

function endGame() {
  alert(`Jeu terminé ! Score : ${score}/${totalCards}`);
}

// Événements
cardElement.addEventListener("mousedown", () => {
  isDragging = true;
  cardElement.classList.add("dragging");
});

document.addEventListener("mousemove", moveCard);

document.addEventListener("mouseup", () => {
  cardElement.classList.remove("dragging");
  dropCard();
});

// Initialisation du jeu
updateCard();
