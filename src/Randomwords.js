import React, { Component } from "react";
const RWords = [
    "Sunshine",
          "Butterfly",
    "Chocolate",
    "Keyboard",
    "Elephant",
    "Vacation",
    "Adventure",
    "Delicious",
    "Computer",
    "Rainbow",
    "Happiness",
    "Mountain",
    "Strawberry",
    "Serenity",
    "Typing",
    "Waterfall",
    "Sunshine",
    "Butterfly",
    "Chocolate",
    "Keyboard",
    // 200 more words added below
    "Apple",
    "Banana",
    "Candle",
    "Dolphin",
    "Elephant",
    "Flower",
    "Guitar",
    "Happiness",
    "Ice Cream",
    "Jungle",
    "Kangaroo",
    "Lighthouse",
    "Moonlight",
    "Nectar",
    "Ocean",
    "Penguin",
    "Quartz",
    "Rainbow",
    "Sunset",
    "Tiger",
    "Umbrella",
    "Violin",
    "Waterfall",
    "Xylophone",
    "Yacht",
    "Zebra",
    // 100 more random words added below
    "Apricot",
    "Bicycle",
    "Carousel",
    "Dandelion",
    "Elevator",
    "Fountain",
    "Giraffe",
    "Hammer",
    "Igloo",
    "Jellyfish",
    "Kite",
    "Lemonade",
    "Magnet",
    "Napkin",
    "Octopus",
    "Piano",
    "Quokka",
    "Raspberry",
    "Seashell",
    "Tornado",
    "Umbrella",
    "Volleyball",
    "Waffle",
    "X-ray",
    "Yoga",
    "Zucchini",
    // 100 more random words added below
    "Ambulance",
    "Basketball",
    "Caterpillar",
    "Dinosaur",
    "Elephant",
    "Fireworks",
    "Giraffe",
    "Hippopotamus",
    "Icicle",
    "Jigsaw",
    "Kangaroo",
    "Lighthouse",
    "Mountain",
    "Nectarine",
    "Ostrich",
    "Pineapple",
    "Quartz",
    "Rhinoceros",
    "Starfish",
    "Tulip",
    "Umbrella",
    "Vanilla",
    "Watermelon",
    "Xylophone",
    "Yak",
    "Zebra",
  ];
  // Get a random index within the array length
const randomIndex = Math.floor(Math.random() * RWords.length);

// Get the word at the random index
const randomWord = RWords[randomIndex];

console.log(randomWord);
   
  // const spacedWords = randomWord.join('  ');
  
  export default randomWord;







    
    