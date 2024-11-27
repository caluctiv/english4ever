let score = 0;
let mistakes = 0;
let totalCards = 10;
let currentCardIndex = 0;
let selectedCard = null;

// Base de données des cartes avec leur catégorie correcte
const cards = [
  { text: "Manger 5 fruits ou légumes chaque jour", category: "habit" },
  { text: "Faire du sport chaque lundi", category: "routine" },
  // Ajoutez vos cartes ici
];

const cardElement = document.getElementById("card");
const categories = document.querySelectorAll(".category");

// Initialisation
function updateCard() {
  if (currentCardIndex >= totalCards) return endGame();

  const randomCard = cards[Math.floor(Math.random() * cards.length)];
  cardElement.textContent = randomCard.text;
  cardElement.dataset.category = randomCard.category;
  cardElement.style.left = "50%";
  cardElement.style.top = "50%";
}

// Drag events
cardElement.addEventListener("mousedown", (e) => {
  selectedCard = e.target;
  selectedCard.classList.add("dragging");
  moveCard(e);
});

document.addEventListener("mousemove", (e) => {
  if (selectedCard) moveCard(e);
});

document.addEventListener("mouseup", () => {
  if (selectedCard) dropCard();
});

function moveCard(e) {
  const offsetX = selectedCard.offsetWidth / 2;
  const offsetY = selectedCard.offsetHeight / 2;
  selectedCard.style.left = `${e.pageX - offsetX}px`;
  selectedCard.style.top = `${e.pageY - offsetY}px`;
}

function dropCard() {
  let validDrop = false;

  categories.forEach((category) => {
    const cardRect = selectedCard.getBoundingClientRect();
    const categoryRect = category.getBoundingClientRect();

    if (
      cardRect.right > categoryRect.left &&
      cardRect.left < categoryRect.right &&
      cardRect.bottom > categoryRect.top &&
      cardRect.top < categoryRect.bottom
    ) {
      validDrop = true;
      if (selectedCard.dataset.category === category.id) {
        score++;
        category.classList.add("active");
        setTimeout(() => category.classList.remove("active"), 300);
      } else {
        mistakes++;
      }
    }
  });

  if (!validDrop) mistakes++;

  selectedCard.classList.remove("dragging");
  selectedCard = null;
  currentCardIndex++;
  updateCard();
}

function endGame() {
  alert(`Jeu terminé ! Score : ${score}/${totalCards}, erreurs : ${mistakes}`);
}

updateCard();
