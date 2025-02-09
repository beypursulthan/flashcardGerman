const flashcards = [
  { word: "Haus", meaning: "House" },
  { word: "Buch", meaning: "Book" },
  { word: "Apfel", meaning: "Apple" },
  { word: "Baum", meaning: "Tree" },
  { word: "Stuhl", meaning: "Chair" },
  { word: "Tisch", meaning: "Table" }
];

let currentIndex = 0;

const flashcardElement = document.getElementById("flashcard");
const nextButton = document.getElementById("nextButton");
const prevButton = document.getElementById("prevButton");

nextButton.addEventListener("click", () => {
  showNextCard();
});

prevButton.addEventListener("click", () => {
  showPreviousCard();
});

function updateProgress() {
  const progressText = document.getElementById('progress-text');
  progressText.textContent = `${currentIndex + 1} of ${flashcards.length} cards`;
}

function updateFlashcardDisplay() {
  const card = flashcards[currentIndex];
  flashcardElement.innerHTML = `<strong>${card.word}</strong><br>${card.meaning}`;
}

function showNextCard() {
  if (currentIndex < flashcards.length - 1) {
    currentIndex++;
    updateFlashcardDisplay();
    updateProgress();
  }
}

function showPreviousCard() {
  if (currentIndex > 0) {
    currentIndex--;
    updateFlashcardDisplay();
    updateProgress();
  }
}

// Initialize the display and progress when the page loads
updateFlashcardDisplay();
updateProgress();