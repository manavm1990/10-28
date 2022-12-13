export default class Letter {
  #char;
  constructor(char) {
    // If a character is not a number or a letter, make it visible right away
    // Save the underlying character
    this.isVisible = !/[a-z1-9]/i.test(char);
    this.#char = char;
  }

  // Returns either an underscore or the underlying character depending on `this.visible`
  //    because we call this function toString, when we call `this.letters.join` in
  //    Word.js, JavaScript automatically uses the value we return here
  toString() {
    if (this.isVisible === true) {
      return this.#char;
    }

    return "_";
  }

  get char() {
    return this.#char;
  }

  // Accepts a user's guess
  guess(charGuess) {
    if (charGuess.toUpperCase() === this.char.toUpperCase()) {
      this.isVisible = true;
      return true;
    }

    // Otherwise return false
    return false;
  }
}
