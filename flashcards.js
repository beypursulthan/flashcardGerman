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
const progressBar = document.getElementById("progress-bar");
const cardCounter = document.getElementById("card-counter");

function updateCard() {
  const card = flashcards[currentIndex];
  flashcardElement.innerHTML = `
    <div class="word">${card.word}</div>
    <div class="meaning">${card.meaning}</div>
  `;

  // Update progress bar
  let progress = ((currentIndex + 1) / flashcards.length) * 100;
  progressBar.value = progress;

  // Update card counter text
  cardCounter.textContent = `${currentIndex + 1} of ${flashcards.length} cards`;

  // Increment index for next card (loops back to start)
  currentIndex = (currentIndex + 1) % flashcards.length;
}

nextButton.addEventListener("click", updateCard);

// Initialize the first card on page load
updateCard();
