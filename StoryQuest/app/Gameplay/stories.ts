// stories.ts

export interface StorySection {
  phrase: string;
  words: {
    [word: string]: {
      image: string;
      x: number;
      y: number;
      effect?: 'spin' | 'pulse' | 'fade' | 'bounce' | 'flip' | 'sideToSide' | 'upAndDown' | 'scaleUp' | 'none';
      width?: number;
      height?: number;
    };
  };
}

export interface Story {
  title: string;
  backgroundImage: string;
  sections: StorySection[];
  colorTheme: {
    backgroundColor: string;
    buttonColor: string;
  };
}

const stories: Story[] = [
  {
    title: "The Garden Adventure",
    backgroundImage: "gs://storyquest-fcdc2.firebasestorage.app/garden-background.webp",
    colorTheme: {
      backgroundColor: "#b4fcdc",
      buttonColor: "#63d2cb",
    },
    sections: [
      {
        phrase: "Look in the garden, there is a ___",
        words: {
          mouse: { image: "gs://storyquest-fcdc2.firebasestorage.app/mouse.svg", x: 30, y: 65, effect: 'flip', width: 80, height: 80 },
          ladybug: { image: "gs://storyquest-fcdc2.firebasestorage.app/ladybug.svg", x: 60, y: 75, effect: 'sideToSide' },
          bird: { image: "gs://storyquest-fcdc2.firebasestorage.app/bird.svg", x: 30, y: 20, effect: 'upAndDown' },
          squirrel: { image: "gs://storyquest-fcdc2.firebasestorage.app/Squirrel.svg", x: 40, y: 70, effect: 'fade' },
          boy: { image: "gs://storyquest-fcdc2.firebasestorage.app/boy.svg", x: 35, y: 60, effect: 'fade', width: 250, height: 280 },
          bear: { image: "gs://storyquest-fcdc2.firebasestorage.app/bear.svg", x: 40, y: 70, effect: 'fade' }
        },
      },
      {
        phrase: "And near the flowers, I see a ___",
        words: {
          bee: { image: "gs://storyquest-fcdc2.firebasestorage.app/bee.svg", x: 70, y: 50, effect: 'pulse' },
          butterfly: { image: "gs://storyquest-fcdc2.firebasestorage.app/butterfly.svg", x: 65, y: 45, effect: 'sideToSide' },
          basket: { image: "gs://storyquest-fcdc2.firebasestorage.app/basket.svg", x: 70, y: 65, effect: 'fade' },
          bear: { image: "gs://storyquest-fcdc2.firebasestorage.app/bear.svg", x: 70, y: 57, effect: 'flip' },
          bird: { image: "gs://storyquest-fcdc2.firebasestorage.app/bird.svg", x: 70, y: 55, effect: 'flip' },
          ladybug: { image: "gs://storyquest-fcdc2.firebasestorage.app/ladybug.svg", x: 70, y: 50, effect: 'pulse' }
        },
      },
      {
        phrase: "In the middle of the clouds there is a ___.",
        words: {
          bird: { image: "gs://storyquest-fcdc2.firebasestorage.app/bird.svg", x: 20, y: 40, effect: 'fade' },
          sun: { image: "gs://storyquest-fcdc2.firebasestorage.app/sun.svg", x: 25, y: 35, effect: 'scaleUp' },
          moon: { image: "gs://storyquest-fcdc2.firebasestorage.app/moon.svg", x: 25, y: 38, effect: 'pulse' },
          witch: { image: "gs://storyquest-fcdc2.firebasestorage.app/witch.svg", x: 25, y: 35, effect: 'scaleUp' },
          balloon: { image: "gs://storyquest-fcdc2.firebasestorage.app/balloon.svg", x: 25, y: 35, effect: 'fade' },
          rainbow: { image: "gs://storyquest-fcdc2.firebasestorage.app/rainbow.svg", x: 20, y: 28, effect: 'scaleUp' }
        },
      },
      {
        phrase: "The tree was full of ___.",
        words: {
          apples: { image: "gs://storyquest-fcdc2.firebasestorage.app/apples.svg", x: 45, y: 0, effect: 'fade' },
          lanterns: { image: "gs://storyquest-fcdc2.firebasestorage.app/lantern.svg", x: 45, y: 0, effect: 'scaleUp' },
          flowers: { image: "gs://storyquest-fcdc2.firebasestorage.app/flower.svg", x: 50, y: 0, effect: 'pulse' },
          birds: { image: "gs://storyquest-fcdc2.firebasestorage.app/bird.svg", x: 70, y: 30, effect: 'scaleUp' },
          oranges: { image: "gs://storyquest-fcdc2.firebasestorage.app/orange.svg", x: 45, y: 0, effect: 'fade' },
          cherries: { image: "gs://storyquest-fcdc2.firebasestorage.app/cherry.svg", x: 45, y: 0, effect: 'scaleUp' }
        }
      }
    ],
  },
  {
    title: "Walk in the forest",
    backgroundImage: "gs://storyquest-fcdc2.firebasestorage.app/Forest-background.png",
    colorTheme: {
      backgroundColor: "#ffcccb",
      buttonColor: "#ff6666",
    },
    sections: [
      {
        phrase: "In the forest, I look in the sky and see a ___",
        words: {
          bird: { image: "gs://storyquest-fcdc2.firebasestorage.app/bird.svg", x: 40, y: 5, effect: 'fade' },
          airplane: { image: "gs://storyquest-fcdc2.firebasestorage.app/airplane.svg", x: 40, y: 5, effect: 'pulse' },
          helicopter: { image: "gs://storyquest-fcdc2.firebasestorage.app/helicopter.svg", x: 40, y: 5, effect: 'pulse' },
          hero: { image: "gs://storyquest-fcdc2.firebasestorage.app/hero.svg", x: 40, y: 5, effect: 'fade' },
          cloud: { image: "gs://storyquest-fcdc2.firebasestorage.app/cloud.svg", x: 40, y: 5, effect: 'scaleUp' },
          sun: { image: "gs://storyquest-fcdc2.firebasestorage.app/sun.svg", x: 40, y: 5, effect: 'scaleUp' },
        },
      },
      {
        phrase: "In the path there is a ___",
        words: {
          bear: { image: "gs://storyquest-fcdc2.firebasestorage.app/bear.svg", x: 40, y: 80, effect: 'pulse' },
          basket: { image: "gs://storyquest-fcdc2.firebasestorage.app/basket.svg", x: 40, y: 80, effect: 'none' },
          monkey: { image: "gs://storyquest-fcdc2.firebasestorage.app/monkey.svg", x: 40, y: 70, effect: 'none' },
          squirrel: { image: "gs://storyquest-fcdc2.firebasestorage.app/Squirrel.svg", x: 40, y: 80, effect: 'none' },
          bird: { image: "gs://storyquest-fcdc2.firebasestorage.app/bird.svg", x: 40, y: 80, effect: 'none' },
          ladybug: { image: "gs://storyquest-fcdc2.firebasestorage.app/ladybug.svg", x: 40, y: 80, effect: 'none' }
        },
      },
      {
        phrase: "And the ___ was bouncing in the bush.",
        words: {
          boy: { image: "gs://storyquest-fcdc2.firebasestorage.app/boy.svg", x: 80, y: 60, effect: 'scaleUp' },
          squirrel: { image: "gs://storyquest-fcdc2.firebasestorage.app/Squirrel.svg", x: 65, y: 60, effect: 'upAndDown' },
          mouse: { image: "gs://storyquest-fcdc2.firebasestorage.app/mouse.svg", x: 65, y: 60, effect: 'upAndDown' },
          monkey: { image: "gs://storyquest-fcdc2.firebasestorage.app/monkey.svg", x: 65, y: 60, effect: 'upAndDown' },
          ladybug: { image: "gs://storyquest-fcdc2.firebasestorage.app/ladybug.svg", x: 65, y: 60, effect: 'upAndDown' },
          bear: { image: "gs://storyquest-fcdc2.firebasestorage.app/bear.svg", x: 65, y: 60, effect: 'upAndDown' }
        }
      }
    ],
  },
  {
    title: "Space Adventure",
    backgroundImage: "gs://storyquest-fcdc2.firebasestorage.app/space-background.svg",
    colorTheme: {
      backgroundColor: "#0a0a23",
      buttonColor: "#4d79ff",
    },
    sections: [
      {
        phrase: "We are travelling thru space and saw a ___.",
        words: {
          planet: { image: "gs://storyquest-fcdc2.firebasestorage.app/planet.svg", x: 80, y: 5, effect: 'spin' },
          comet: { image: "gs://storyquest-fcdc2.firebasestorage.app/comet.svg", x: 80, y: 5, effect: 'sideToSide' },
          astronaut: { image: "gs://storyquest-fcdc2.firebasestorage.app/astronaut.svg", x: 80, y: 5, effect: 'bounce' },
          car: { image: "gs://storyquest-fcdc2.firebasestorage.app/car.svg", x: 80, y: 5, effect: 'flip' },
          alien: { image: "gs://storyquest-fcdc2.firebasestorage.app/alien.svg", x: 80, y: 5, effect: 'fade' },
          star: { image: "gs://storyquest-fcdc2.firebasestorage.app/star.svg", x: 80, y: 5, effect: 'pulse' }
        },
      },
      {
        phrase: "On the moon, we discovered a ___.",
        words: {
          flag: { image: "gs://storyquest-fcdc2.firebasestorage.app/flag.svg", x: 20, y: 25, effect: 'pulse' },
          rock: { image: "gs://storyquest-fcdc2.firebasestorage.app/rock.svg", x: 20, y: 25, effect: 'scaleUp' },
          cow: { image: "gs://storyquest-fcdc2.firebasestorage.app/cow.svg", x: 20, y: 20, effect: 'scaleUp' },
          treasure: { image: "gs://storyquest-fcdc2.firebasestorage.app/treasure.svg", x: 20, y: 25, effect: 'pulse' },
          robot: { image: "gs://storyquest-fcdc2.firebasestorage.app/robot.svg", x: 20, y: 20, effect: 'pulse' },
          alien: { image: "gs://storyquest-fcdc2.firebasestorage.app/alien.svg", x: 20, y: 20, effect: 'fade' }
        },
      },
      {
        phrase: "Suddenly, something flew by us. It was a ___.",
        words: {
          UFO: { image: "gs://storyquest-fcdc2.firebasestorage.app/ufo.svg", x: 50, y: 50, effect: 'scaleUp' },
          book: { image: "gs://storyquest-fcdc2.firebasestorage.app/book.svg", x: 50, y: 50, effect: 'fade' },
          rocket: { image: "gs://storyquest-fcdc2.firebasestorage.app/rocket.svg", x: 50, y: 50, effect: 'upAndDown' },
          airplane: { image: "gs://storyquest-fcdc2.firebasestorage.app/airplane.svg", x: 50, y: 50, effect: 'scaleUp' },
          shootingStar: { image: "gs://storyquest-fcdc2.firebasestorage.app/shootingstar.svg", x: 50, y: 50, effect: 'sideToSide' },
          spaceDragon: { image: "gs://storyquest-fcdc2.firebasestorage.app/dragon.svg", x: 50, y: 50, effect: 'bounce' }
        }
      },
      {
        phrase: "We also said hi to a ___.",
        words: {
          Alien: { image: "gs://storyquest-fcdc2.firebasestorage.app/alien.svg", x: 5, y: 70, effect: 'pulse' },
          robot: { image: "gs://storyquest-fcdc2.firebasestorage.app/robot.svg", x: 5, y: 70, effect: 'sideToSide' },
          spaceCat: { image: "gs://storyquest-fcdc2.firebasestorage.app/spacecat.svg", x: 5, y: 70, effect: 'fade' },
          spaceDog: { image: "gs://storyquest-fcdc2.firebasestorage.app/spacedog.svg", x: 5, y: 70, effect: 'bounce' },
          astronaut: { image: "gs://storyquest-fcdc2.firebasestorage.app/astronaut.svg", x: 5, y: 70, effect: 'none' },
          Wizard: { image: "gs://storyquest-fcdc2.firebasestorage.app/wizard.svg", x: 5, y: 70, effect: 'spin' }
        }
      }
    ],
  }
];

export default stories;