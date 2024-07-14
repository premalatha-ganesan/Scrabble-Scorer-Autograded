// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system.

const input = require("readline-sync");

const oldPointStructure = {
  1: ["A", "E", "I", "O", "U", "L", "N", "R", "S", "T"],
  2: ["D", "G"],
  3: ["B", "C", "M", "P"],
  4: ["F", "H", "V", "W", "Y"],
  5: ["K"],
  8: ["J", "X"],
  10: ["Q", "Z"]
  // 0 : [' ']
};

const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ ";

const vowels = ["A", "E", "I", "O", "U"];

let newPointStructure = transform(oldPointStructure);

function transform(oldPoint) {
  let newPoints = {};
  for (item in oldPoint) {
    let v = oldPoint[item];
    for (let j = 0; j < v.length; j++) {
      let key = oldPoint[item][j].toLowerCase();
      let val = item;
      newPoints[key] = Number(val);
    }
  }
  return newPoints;
}

function initialPrompt() {
  console.log("Let's play some scrabble!");
  inputWord = input.question("\nEnter a word to score: ");
  inputWord = String(inputWord.toUpperCase());
  for (let i = 0; i < inputWord.length; i++) {
    while (!alphabets.includes(inputWord[i])) {
      console.log("Please do not enter numbers or symbols");
      inputWord = input.question("\nEnter a word to score: ");
      inputWord = String(inputWord.toUpperCase());
    }
    return inputWord;
  }
}

function oldScrabbleScorer(word) {
  word = word.toUpperCase();
  let letterPoints = "";
  for (let i = 0; i < word.length; i++) {
    for (const pointValue in oldPointStructure) {
      if (oldPointStructure[pointValue].includes(word[i])) {
        letterPoints += `Points for '${word[i]}': ${pointValue}\n`;
      }
    }
  }
  return letterPoints;
}

function scrabbleScorer(word) {
  word = String(word).toLowerCase();
  let letterPoints = 0;

  for (let i = 0; i < word.length; i++) {
    let currentChar = word[i];
    let currentScore = newPointStructure[currentChar];
    letterPoints += currentScore;
  }
  return letterPoints;
}

function simpleScorer(word) {
  let simpleScore = String(word).length;
  return simpleScore;
}

function vowelBonusScorer(word) {
  word = String(word).toUpperCase();
  let letterPoints = 0;
  for (let i = 0; i < word.length; i++) {
    let currentLetter = word[i];
    if (vowels.includes(currentLetter)) {
      letterPoints += 3;
    } else {
      letterPoints++;
    }
  }
  return letterPoints;
}

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

let simpleScorers = {
  name: "Simple Scorer",
  description: "Each letter is worth 1 point",
  scorerFunction: simpleScorer
};

let vowelBonusScorers = {
  name: "Bonus Vowels",
  description: "Vowels are 3 pts, consonants are 1 pt.",
  scorerFunction: vowelBonusScorer
};

let scrabbleScorers = {
  name: "Scrabble",
  description: "The traditional scoring algorithm.",
  scorerFunction: scrabbleScorer
};

const scoringAlgorithms = [simpleScorers, vowelBonusScorers, scrabbleScorers];

function scorerPrompt() {
  let inputWord = initialPrompt();
  console.log(`Which scoring algorithm would you like to use?

0 - Simple: One point per character
1 - Vowel Bonus: Vowels are worth 3 points
2 - Scrabble: Uses scrabble point system`);
  let scoringMethod = input.question("Enter 0, 1, or 2 : ");
  while (scoringMethod != "0" && scoringMethod != "1" && scoringMethod != "2") {
    console.log("Please enter a number 0, 1 or 2");
    scoringMethod = input.question("Enter 0, 1 or 2 : ");
  }
  console.log(
    "Score for '" +
      inputWord +
      "' : " +
      scoringAlgorithms[scoringMethod].scorerFunction(inputWord)
  );
  return scoringAlgorithms[scoringMethod];
}

function runProgram() {
  scorerPrompt();
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
  initialPrompt: initialPrompt,
  transform: transform,
  oldPointStructure: oldPointStructure,
  simpleScorer: simpleScorer,
  vowelBonusScorer: vowelBonusScorer,
  scrabbleScorer: scrabbleScorer,
  scoringAlgorithms: scoringAlgorithms,
  newPointStructure: newPointStructure,
  runProgram: runProgram,
  scorerPrompt: scorerPrompt
};
