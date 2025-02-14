import { flashcards } from './database.js';

let currentCardIndex = loadProgress();
const flashcardElement = document.getElementById('flashcard');
const nextButton = document.getElementById('nextButton');
const prevButton = document.getElementById('prevButton');
const progressBar = document.getElementById('progress-bar');
const cardCounter = document.getElementById('card-counter');
const toggleDarkModeButton = document.getElementById('toggleDarkMode');

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
  try {
    const flashcard = flashcards[currentCardIndex];
    if (!flashcard) {
      throw new Error('Invalid card index');
    }
    flashcardElement.innerHTML = `<div class="word">${flashcard.word}</div><div class="meaning">${flashcard.meaning}</div>`;
    updateProgress();
  } catch (error) {
    console.error('Error updating flashcard:', error);
    // Fallback to first card
    currentCardIndex = 0;
    updateFlashcard();
  }
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

prevButton.addEventListener('click', () => {
  currentCardIndex = (currentCardIndex - 1 + flashcards.length) % flashcards.length;
  updateFlashcard();
  saveProgress(currentCardIndex);
});

toggleDarkModeButton.addEventListener('click', toggleDarkMode);

function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  flashcardElement.classList.toggle('dark-mode');
  // Save dark mode preference
  const isDarkMode = document.body.classList.contains('dark-mode');
  localStorage.setItem('darkMode', isDarkMode);
}

/**
 * Saves the current card index to localStorage
 * @param {number} currentCardIndex - The index to save
 */
function saveProgress(currentCardIndex) {
  try {
    if (typeof currentCardIndex !== 'number' || currentCardIndex < 0) {
      throw new Error('Invalid card index');
    }
    localStorage.setItem('flashcardProgress', currentCardIndex);
  } catch (error) {
    console.error('Error saving progress:', error);
  }
}

/**
 * Loads the saved progress from localStorage
 * @returns {number} The saved card index or 0 if none exists
 */
function loadProgress() {
  try {
    const savedProgress = localStorage.getItem('flashcardProgress');
    if (savedProgress !== null) {
      const index = parseInt(savedProgress, 10);
      if (isNaN(index) || index < 0 || index >= flashcards.length) {
        throw new Error('Invalid saved progress');
      }
      return index;
    }
  } catch (error) {
    console.error('Error loading progress:', error);
  }
  return 0;
}

// Load dark mode preference on startup
const savedDarkMode = localStorage.getItem('darkMode');
if (savedDarkMode === 'true') {
  toggleDarkMode();
}

// Add keyboard navigation
document.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'ArrowRight':
    case 'ArrowDown':
      currentCardIndex = (currentCardIndex + 1) % flashcards.length;
      updateFlashcard();
      saveProgress(currentCardIndex);
      break;
    case 'ArrowLeft':
    case 'ArrowUp':
      currentCardIndex = (currentCardIndex - 1 + flashcards.length) % flashcards.length;
      updateFlashcard();
      saveProgress(currentCardIndex);
      break;
  }
});

updateFlashcard();