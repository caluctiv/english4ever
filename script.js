// Script pour gérer le jeu et la redirection
let score = 0;
let attempts = 0;
const totalQuestions = 10;

const card = document.getElementById("card");
const habitZone = document.getElementById("habit");
const routineZone = document.getElementById("routine");
const scoreDisplay = document.getElementById("score");
const feedback = document.getElementById("feedback");

// Cartes de test
const cards = [
  "Boire de l'eau le matin",
  "Faire ses devoirs après l'école",
  "Aller à la salle de sport",
  "Se brosser les dents",
  "Lire avant de dormir",
  "Préparer le dîner à 19h",
  "Faire une promenade après le déjeuner",
  "Éteindre les lumières en quittant une pièce",
  "Méditer le matin",
  "Organiser son sac pour le lendemain",
  ...Array(15).fill("Routine example"), // Plus de cartes
  ...Array(15).fill("Habit example")
];

let currentCardIndex = 0;

function updateCard() {
  if (currentCardIndex < totalQuestions) {
    card.textContent = cards[currentCardIndex];
  } else {
    redirectToResult();
  }
}

function redirectToResult() {
  window.location.href = `result_${score}.html`;
}

card.addEventListener("dragstart", (event) => {
  event.dataTransfer.setData("text/plain", card.textContent);
});

[habitZone, routineZone].forEach((zone) => {
  zone.addEventListener("dragover", (event) => {
    event.preventDefault();
  });

  zone.addEventListener("drop", (event) => {
    event.preventDefault();
    const cardText = event.dataTransfer.getData("text/plain");
    const correct =
      (zone.id === "habit" && cardText.includes("Habit")) ||
      (zone.id === "routine" && cardText.includes("Routine"));

    if (correct) {
      feedback.textContent = "Correct";
      score++;
    } else {
      feedback.textContent = "Incorrect";
      card.classList.add("vibrate");
      setTimeout(() => card.classList.remove("vibrate"), 300);
    }

    attempts++;
    scoreDisplay.textContent = `${score}`;

    currentCardIndex++;
    updateCard();
  });
});

updateCard();
