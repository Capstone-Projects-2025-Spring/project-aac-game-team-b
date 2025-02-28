// The file where the stories will be imported from.

//TO DO:


//CHANGE THE SIZE OF THE PICTURES. NEED TO BE BIGGER
//MAKE BETTER SENTENCE/STORIES
//THE IMAGES IS SHOWING UP WITH A WHITE BACKGROUND


// stories.tsx
export interface StorySection {
    phrase: string;
    words: { [word: string]: { image: string; x: number; y: number } }; // Store image and position
}
  
  export interface Story {
    title: string;
    backgroundImage: string;
    sections: StorySection[]; // Array of sections
  }
  
  const stories: Story[] = [
    {
      title: "The Garden Adventure",
      backgroundImage: "garden-background.webp",
      sections: [
        {
          phrase: "Look in the garden, there is a ___",
          words: {
            mouse: { image: "mouse.svg", x: 50, y: 80},
            ladybug: {image: "ladybug.svg", x: 60, y:80},
          },
        },
        {
          phrase: "And near the flowers, I see a ___",  // New sentence
          words: {
            bee: { image: "bee.svg", x: 70, y:45},
            butterfly: { image: "butterfly.svg", x: 70, y:45},
            //can add more words here
          },
        },
        {
          phrase: "The tree was full of ___.", // Another sentence
          words: {
              apple: { image: "apple.svg", x: 80, y:10},
              lanterns: { image: "lantern.svg", x: 80, y:20},
          }
        }
        // ...  can add more sections
      ],
    },

    //NEW STORY
    {
        title: "Walk in the forest",
        backgroundImage: "forest-background.png",
        sections: [
          {
            phrase: "In the forest, I look in the sky and see a ___",
            words: {
              bird: { image: "bird.svg", x: 50, y:10},
              airplane: { image: "airplane.svg", x: 50, y:10},
            },
          },
          {
            phrase: "In the path there is a ___",  // New sentence
            words: {
              bear: { image: "bear.svg", x: 40, y:80},
              basket: { image: "basket.svg", x: 50, y:75},
            },
          },
          {
            phrase: "And the ___ was sitting in the bush.", // Another sentence 
            words: {
                boy: { image: "boy.svg", x: 65, y:60},
                squirrel: { image: "Squirrel.svg", x: 65, y:60}
            }
          }
          // ... more sections
        ],
      },
      
      
  ];
  
  export default stories;
 