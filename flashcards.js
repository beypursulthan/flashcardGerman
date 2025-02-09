import { flashcards } from './database.js';

let currentCardIndex = loadProgress();
const flashcardElement = document.getElementById('flashcard');
const nextButton = document.getElementById('nextButton');

function updateFlashcard() {
  const flashcard = flashcards[currentCardIndex];
  flashcardElement.textContent = `${flashcard.word} - ${flashcard.meaning}`;
}

nextButton.addEventListener('click', () => {
  currentCardIndex = (currentCardIndex + 1) % flashcards.length;
  updateFlashcard();
  saveProgress(currentCardIndex);
});

function saveProgress(currentCardIndex) {
  localStorage.setItem('flashcardProgress', currentCardIndex);
}

function loadProgress() {
  const savedProgress = localStorage.getItem('flashcardProgress');
  if (savedProgress !== null) {
    return parseInt(savedProgress, 10);
  }
  return 0; // Default to the first card if no progress is saved
}

updateFlashcard();