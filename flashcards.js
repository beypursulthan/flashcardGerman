import { flashcards } from './database.js';
import { examples } from './examples.js';

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
    const example = examples[currentCardIndex];
    if (!flashcard) {
      throw new Error('Invalid card index');
    }
    flashcardElement.innerHTML = `
      <div class="word">${flashcard.word}</div>
      <div class="meaning">${flashcard.meaning}</div>
      <div class="example">${example}</div>
      <button class="speak-button" aria-label="Pronounce word">🔊</button>
      <button class="speak-example-button" aria-label="Pronounce example">📢</button>
    `;
    
    // Add click events for both speak buttons
    const speakButton = flashcardElement.querySelector('.speak-button');
    const speakExampleButton = flashcardElement.querySelector('.speak-example-button');
    
    speakButton.addEventListener('click', () => {
      speakWord(flashcard.word);
    });
    
    speakExampleButton.addEventListener('click', () => {
      speakWord(example);
    });
    
    updateProgress();
  } catch (error) {
    console.error('Error updating flashcard:', error);
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

// Update the keyboard event listener to handle both 'S' and 'E' keys
document.addEventListener('keydown', (event) => {
  // Only handle keyboard shortcuts if not typing in an input field
  if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
    return;
  }

  switch (event.key.toLowerCase()) {
    case 'arrowright':
    case 'arrowdown':
      currentCardIndex = (currentCardIndex + 1) % flashcards.length;
      updateFlashcard();
      saveProgress(currentCardIndex);
      break;
    case 'arrowleft':
    case 'arrowup':
      currentCardIndex = (currentCardIndex - 1 + flashcards.length) % flashcards.length;
      updateFlashcard();
      saveProgress(currentCardIndex);
      break;
    case 's':
      const wordElement = document.querySelector('.word');
      if (wordElement) {
        speakWord(wordElement.textContent);
      }
      break;
    case 'e':
      const exampleElement = document.querySelector('.example');
      if (exampleElement) {
        speakWord(exampleElement.textContent);
      }
      break;
  }
});

// Add speak function
function speakWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = 'de-DE'; // Set language to German
  utterance.rate = 0.8; // Slightly slower speed for better clarity
  speechSynthesis.speak(utterance);
}

// Add after the toggleDarkModeButton constant
const shortcutsButton = document.createElement('button');
shortcutsButton.id = 'shortcutsButton';
shortcutsButton.textContent = 'Shortcuts';
document.body.appendChild(shortcutsButton);

// Add after the toggleDarkMode function
function createShortcutsTooltip() {
    const tooltip = document.createElement('div');
    tooltip.className = 'shortcuts-tooltip';
    tooltip.innerHTML = `
        Keyboard Shortcuts:<br>
        → or ↓: Next card<br>
        ← or ↑: Previous card<br>
        S: Speak word<br>
        E: Speak example
    `;
    document.body.appendChild(tooltip);
    return tooltip;
}

const shortcutsTooltip = createShortcutsTooltip();

shortcutsButton.addEventListener('click', (event) => {
    event.stopPropagation();
    shortcutsTooltip.classList.toggle('show');
});

// Hide tooltip when clicking anywhere else
document.addEventListener('click', (event) => {
    if (!shortcutsButton.contains(event.target)) {
        shortcutsTooltip.classList.remove('show');
    }
});

updateFlashcard();