var userGuess;
var usedLettersArr = [];
var guessWordsArray = [
  "Paris",
  "Rome",
  "Madrid",
  "Prague",
  "London",
  "Lisbon",
  "Berlin",
  "Barcelona",
  "Vienna",
  "Amsterdam"
];

//stores value from the guessWordsArray
var guessWords;

var guessState;
var wonTheGame = false;
var computerGaveGuess = false;
var wrongGuesses = 0;
var wordsGuessed = 0;
var guessWordsCorrect = [];

var imageGallery = {
  Paris: "assets/images/paris.jpg",
  Rome: "assets/images/colosseum-690384_640.jpg",
  Madrid: "assets/images/madrid.jpg",
  Prague: "assets/images/prague.jpg",
  London: "assets/images/tower-bridge.jpg",
  Lisbon: "assets/images/lisbon.jpg",
  Berlin: "assets/images/brandenburger.jpg",
  Barcelona: "assets/images/sagrada-familia.jpg",
  Vienna: "assets/images/vienna.jpg",
  Amsterdam: "assets/images/amsterdam.jpg"
};

var playAgain = false;

$(document).keyup(function newGuess(event) {
  //checks for lowercase letters

  if (event.keyCode >= 65 && event.keyCode <= 90) {
    if (computerGaveGuess === false) {
      createGuessForGuessState();
    }

    userGuess = event.key;

    checkGuess(userGuess);
  } else {
  }
});

function createGuessForGuessState() {
  if (guessWordsArray.length > 0) {
    playSoundEffect();

    guessWords =
      guessWordsArray[Math.floor(Math.random() * guessWordsArray.length)];

    var index = guessWordsArray.indexOf(guessWords);

    if (index > -1) {
      guessWordsArray.splice(index, 1);
    }

    console.log(guessWords);
    console.log(guessWordsArray);
    guessState = [];

    for (i = 0; i < guessWords.length; i++) {
      guessState.push(" _ ");
    }
    computerGaveGuess = true;
  } else {
    reset(playAgain);
  }
}

function isMatching(element) {
  var capsComputerLetter = element.toUpperCase();
  var capsUserGuessLetter = userGuess.toUpperCase();

  if (capsComputerLetter == capsUserGuessLetter) {
    return true;
  } else {
    return false;
  }
}

//guess state is updated with user guess
function updateGuessState(index) {
  var guessWordsArray = guessWords.split("");
  guessState[index] = guessWordsArray[index];
  console.log(guessState);
}

function checkGuess(letter) {
  var guessWordsArray = guessWords.split("");
  var isMatched = false;
  var neverBeenGuessed = validateGuess(letter);

  //checks for remaining guesses
  if (wrongGuesses < 5) {
    for (j = 0; j < guessWords.length; j++) {
      if (isMatching(guessWordsArray[j])) {
        updateGuessState(j);
        isMatched = true;
      }
    }

    if (isMatched === false && neverBeenGuessed === false) {
      wrongGuesses = wrongGuesses + 1;
    }
    wonGame();
    updatePage();
  } else {
    wrongGuesses = wrongGuesses + 1;
    updatePage();
    reset(playAgain);
  }
}
//keeps track of user guessed letters
function validateGuess(element) {
  if (usedLettersArr.includes(element)) {
    return true;
  } else {
    usedLettersArr.push(userGuess);
    return false;
  }
}

//checks for a win, and creates new word
function wonGame() {
  if (guessWords === guessState.join("")) {
    wonTheGame = true;
    computerGaveGuess = false;
    console.log("You win!");
    guessWordsCorrect.push(guessWords);
    wordsGuessed = wordsGuessed + 1;
    usedLettersArr = [];
    updatePicture(guessWords);
    createGuessForGuessState();
  }
}

//update image
function updatePicture(element) {
  if (element in imageGallery) {
    $("#imageOfLastGuessed").attr("src", imageGallery[element]);
  }
}

function reset(someBoolean) {
   (someBoolean) 
    guessState = [];
    usedLettersArr = [];
    guessWordsArray = [
      "Paris",
      "Rome",
      "Madrid",
      "Prague",
      "London",
      "Lisbon",
      "Berlin",
      "Barcelona",
      "Vienna",
      "Amsterdam"
    ];
    wrongGuesses = 0;
    guessWordsCorrect = [];
    wordsGuessed = 0;
    computerGaveGuess = false;
    updatePage();
    $("#imageOfLastGuessed").attr(
      "src",
      "assets/images/winner-1548239_640.jpg"
    );
  }

//sound effects at initial game start and for game win
function playSoundEffect() {
  var audioElement = document.createElement("audio");
  audioElement.setAttribute("src", "assets/sounds/Firecrack.wav");
  audioElement.play();
}

function updatePage() {
  var displayGuesses = guessState.join("");
  var displayLettersGuessed = usedLettersArr.join(" ");
  var displayGuessCorrect = guessWordsCorrect.join(" ");
  var displayGuessesRemaining = 6 - wrongGuesses;

  $("#currentState").html(displayGuesses);
  $("#guessedByUser").html(displayLettersGuessed);
  $("#numberOfGuesses").html(displayGuessesRemaining);
  $("#wordsGuessed").html(wordsGuessed);
  $("#correctWords").html(displayGuessCorrect);
}
