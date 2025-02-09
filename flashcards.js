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

nextButton.addEventListener("click", () => {
  const card = flashcards[currentIndex];
  flashcardElement.innerHTML = `<strong>${card.word}</strong><br>${card.meaning}`;
  currentIndex = (currentIndex + 1) % flashcards.length;
});