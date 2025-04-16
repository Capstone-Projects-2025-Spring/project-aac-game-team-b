import { Story } from "../Gameplay/stories";

// Function to extract all phrases from a specific story
export const extractPhrasesFromStory = (story: Story | null): string[] => {
  if (!story) return [];
  
  return story.sections.map(section => section.phrase);
};

// Function to extract all completed phrases and current phrase
export const extractAllGamePhrases = (completedPhrases: string[], currentPhrase: string): string[] => {
  return [...completedPhrases, currentPhrase];
};