// * **Word.js**: Contains a constructor, Word that depends on the Letter constructor. This is used to create an object representing the current word the user is attempting to guess. That means the constructor should define:
//   * An array of `new` Letter objects representing the letters of the underlying word
//   * A function that returns a string representing the word. This should call the function on each letter object (the first function defined in `Letter.js`) that displays the character or an underscore and concatenate those together.
//   * A function that takes a character as an argument and calls the guess function on each letter object (the second function defined in `Letter.js`)

var Letter = require("./letter.js")

function Word(chosenTerm) {
    
    this.letters = []
    this.chosenTerm = chosenTerm
    this.stringSize = chosenTerm.length
}

Word.prototype = {
    printWord: function() {
        for (var i = 0; i < this.stringSize; i++) {
            this.letters[i].printGuessStatus()
        }
        
        process.stdout.write("\n")
    },
    
    findMatches: function(guess) {
        let verdict = false
        
        for (var i = 0; i < this.stringSize; i++) {
            if (this.letters[i].evaluateGuess(guess)) {
                verdict = true
            }
        }
        
        process.stdout.write("\n")
        return verdict
    },
    
    generateLetters: function() {
        var currentCharacter
        
        for (var i = 0; i < this.stringSize; i++) {
            currentCharacter = new Letter.Letter(this.chosenTerm[i])
            
            this.letters.push(currentCharacter)
        }
            
        return this.letters
    }
}

module.exports = {
	Word: Word
}
