// * **index.js**: The file containing the logic for the course of the game, which depends on `Word.js` and:
//   * Randomly selects a word and uses the `Word` constructor to store it
//   * Prompts the user for each guess and keeps track of the user's remaining guesses

var prompt = require('prompt')
var Word = require("./word.js")
prompt.start()
var wordArray = ['audi', 'bmw', 'bugatti', 'bentley', 'ferrari', 'mclaren']
var currentWord, wordChoice
var previousGuess = []

var roundsLeft = 8

chooseWord()
currentWord.printWord()
playRound()

function playRound() {
    prompt.get([{
            name: 'guess',
            description: 'Pick a letter from A-Z',
            type: 'string',
            pattern: /^[^a-z]*([a-z])[^a-z]*$/i, 
            message: 'Please use one letter at a time',
            required: true
        }],
        function (e, result) {
        if (e) {
            console.log(e)
        }
        
        // if the user Loses provide a message
        if (roundsLeft == 1) {
            console.log("Sorry!!!! Too bad!! The word was " + currentWord.chosenTerm + "!")
            return
        }
        
        // determine if the letter chosen is in the word
        if (!currentWord.findMatches(result.guess)) {
            roundsLeft--
        }
        
        // if the user already guessed the letter provide a message
        if (previousGuess.includes(result.guess)) {
            console.log("You already guessed that!")
        }
        
        previousGuess.push(result.guess)
        currentWord.printWord()
        
        // Win Condition
        if (userWin()) {
            console.log("Good Job!  You got it!")
            return
        }
        
        console.log("Guesses left: " + roundsLeft + "\n")
        playRound()
    })
}

function chooseWord() {
    wordChoice = wordArray[Math.floor(Math.random() * wordArray.length)]
    
    console.log("Category: Exotic Car Brands")
    console.log("Guess the word! The word has " + wordChoice.length + " letters.")
    
    // create word object
    currentWord = new Word.Word(wordChoice.toLowerCase())
    currentWord.generateLetters()
    return
}

function userWin() {
    let verdict = true
    
    for (var i = 0; i < currentWord.stringSize; i++) {
        if (currentWord.letters[i].guessedCorrectly == false) {
            verdict = false
        }
    }
    
    return verdict
}