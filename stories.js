import { stories } from './story-database.js';

class StoryManager {
    constructor() {
        this.stories = stories;
        this.currentIndex = 0;
        this.initializeElements();
        this.setupEventListeners();
        this.updateStory();
    }

    initializeElements() {
        this.storyContent = document.getElementById('story-content');
        this.prevButton = document.getElementById('prev-story');
        this.nextButton = document.getElementById('next-story');
        this.progressBar = document.getElementById('story-progress');
        
        if (!this.storyContent || !this.prevButton || !this.nextButton || !this.progressBar) {
            console.error('Required elements not found in the DOM');
            return;
        }
    }

    setupEventListeners() {
        this.prevButton.addEventListener('click', () => this.previousStory());
        this.nextButton.addEventListener('click', () => this.nextStory());
    }

    updateStory() {
        const story = this.stories[this.currentIndex];
        this.storyContent.innerHTML = `
            <h3>${story.title}</h3>
            <p>${story.text}</p>
        `;
        
        // Update progress bar
        const progress = ((this.currentIndex + 1) / this.stories.length) * 100;
        this.progressBar.style.width = `${progress}%`;
        
        // Update button states
        this.prevButton.disabled = this.currentIndex === 0;
        this.nextButton.disabled = this.currentIndex === this.stories.length - 1;
    }

    previousStory() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.updateStory();
        }
    }

    nextStory() {
        if (this.currentIndex < this.stories.length - 1) {
            this.currentIndex++;
            this.updateStory();
        }
    }
}

// Initialize the story manager when the document is loaded
document.addEventListener('DOMContentLoaded', () => {
    new StoryManager();
}); 