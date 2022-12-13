import chalk from "chalk";
import inquirer from "inquirer";
import words from "../words.js";
import Word from "./Word.js";

export default class Game {
  constructor() {
    this.guessesLeft = 0;
  }

  // Sets the guesses to 10 and gets the next word
  play() {
    this.guessesLeft = 10;
    this.nextWord();
  }

  // Creates a new Word object using a random word from the array, asks the user for their guess
  nextWord() {
    const randWord = words[Math.floor(Math.random() * words.length)];
    this.currentWord = new Word(randWord);
    console.info("\n" + this.currentWord.toString() + "\n");
    this.makeGuess();
  }

  // Uses inquirer to prompt the user for their guess
  makeGuess() {
    this.askForLetter().then(() => {
      // If the user has no guesses remaining after this guess, show them the word, ask if they want to play again
      if (this.guessesLeft < 1) {
        console.info(
          'No guesses left! Word was: "' +
            this.currentWord.getSolution() +
            '"\n'
        );
        this.askToPlayAgain();

        // If the user guessed all letters of the current word correctly, reset guessesLeft to 10 and get the next word
      } else if (this.currentWord.isWordGuessed()) {
        console.info("You got it right! Next word!");
        this.guessesLeft = 10;
        this.nextWord();

        // Otherwise prompt the user to guess the next letter
      } else {
        this.makeGuess();
      }
    });
  }

  // Asks the user if they want to play again after running out of guessesLeft
  async askToPlayAgain() {
    const { choice } = await inquirer.prompt([
      {
        type: "confirm",
        name: "choice",
        message: "Play Again?",
      },
    ]);

    if (choice) {
      this.play();
    } else {
      this.quit();
    }
  }

  // Prompts the user for a letter
  async askForLetter() {
    const letter = await inquirer.prompt([
      {
        type: "input",
        name: "choice",
        message: "Guess a letter!",
        // The users guess must be a number or letter
        validate: (val) => /[a-z1-9]/gi.test(val),
      },
    ]);

    // If the user's guess is in the current word, log that they chose correctly
    const didGuessCorrectly = this.currentWord.isLetterFound(letter.choice);
    if (didGuessCorrectly) {
      console.info(chalk.green("\nCORRECT!!!\n"));

      // Otherwise decrement `guessesLeft`, and let the user know how many guesses they have left
    } else {
      this.guessesLeft--;
      console.info(chalk.red("\nINCORRECT!!!\n"));
      console.info(this.guessesLeft + " guesses remaining!!!\n");
    }

    console.info(this.currentWord.toString() + "\n");
  }

  // Logs goodbye and exits the node app
  quit() {
    console.info("\nGoodbye!");
    process.exit(0);
  }
}
