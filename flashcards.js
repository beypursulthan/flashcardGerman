import { flashcards } from './database.js';

let currentCardIndex = loadProgress();
const flashcardElement = document.getElementById('flashcard');
const nextButton = document.getElementById('nextButton');
const prevButton = document.getElementById('prevButton');
const progressBar = document.getElementById('progress-bar');
const cardCounter = document.getElementById('card-counter');

progressBar.addEventListener('click', (event) => {
  const totalCards = flashcards.length;
  const progressBarWidth = progressBar.offsetWidth;
  const clickPosition = event.offsetX;
  const newCardIndex = Math.floor((clickPosition / progressBarWidth) * totalCards);
  currentCardIndex = newCardIndex;
  updateFlashcard();
  saveProgress(currentCardIndex);
});

function updateFlashcard() {
  const flashcard = flashcards[currentCardIndex];
  flashcardElement.innerHTML = `<div class="word">${flashcard.word}</div><div class="meaning">${flashcard.meaning}</div>`;
  updateProgress();
}

function updateProgress() {
  const totalCards = flashcards.length;
  const progress = ((currentCardIndex + 1) / totalCards) * 100;
  progressBar.value = progress;
  cardCounter.textContent = `${currentCardIndex + 1} of ${totalCards} cards`;
}

nextButton.addEventListener('click', () => {
  currentCardIndex = (currentCardIndex + 1) % flashcards.length;
  updateFlashcard();
  saveProgress(currentCardIndex);
});

prevButton.addEventListener('click', () => { // Add this block
  currentCardIndex = (currentCardIndex - 1 + flashcards.length) % flashcards.length;
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