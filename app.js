const wordEl = document.querySelector("#word");
const wrongLettersEl = document.querySelector("#wrong-letters");
const playAgainBtn = document.querySelector("#play-button");
const popup = document.querySelector("#popup-container");
const notification = document.querySelector("#notification-container");
const finalMessage = document.querySelector("#final-message");

const figureParts = document.querySelectorAll(".figure-part");

const movies = ["avengers end game", "inception", "the dark knight", "rush hour", "star wars", "mission impossible"];

// Array of words
const tvShows = ["friends", "heroes", "angel", "titans", "brooklyn nine nine", "breaking bad", "fresh prince of bel air", "suits", "house of cards", "stranger things", "the umbrella academy", "the witcher", "smallville"];

let words = [];

function array() {
  words = movies;
}

array();

console.log(words);

// Generate random word from the words array
let randomWord = words[Math.floor(Math.random() * words.length)];

let correctLetters = []; // Users Guess
let wrongLetters = []; // Users Guess
let gameOver = false;

/* Show hidden word - 
set wordEl's inner html to the random word -> 
.split to turn word into array -> 
.map the array with function to create the span element -> 
tenery operator to chack if the "mapped letter" is in the correctLetters/users guess array
if the tenery operator comes back true then return the "mapped letter" or an empty string
.join to turn the array back into a string
*/
function displayWord() {
  wordEl.innerHTML = `  
    ${randomWord
      .split("")
      .map(
        (letter) => `
        <span class="${letter !== " " ? "letter" : "empty-space"}">
          ${correctLetters.includes(letter) ? letter : ""} 
        </span>
      `
      )
      .join("")}
  `;

  const innerWord = wordEl.innerText.replace(/\n/g, "");
  const randomWordClean = randomWord.replace(/\s/g, "");

  if (innerWord === randomWordClean) {
    finalMessage.innerText = "Congratulation You Won!";
    popup.style.display = "flex";
    gameOver = true;
  }
}

// Show Notification Function to show the notice that a key/letter has already been pressed or guessed
function showNotification() {
  notification.classList.add("show");

  setTimeout(() => {
    notification.classList.remove("show");
  }, 3000);
}

/* Update the wrong letters DOM element -
If wrong letters array has item then show the "Wrong Letters" text ->
.map the wrong letters array to display each letter ->
*/
function updateWrongLettersEl() {
  wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? "<p>Wrong Letters<p>" : ""}
    ${wrongLetters.map((letter) => `<span>${" " + letter}<span>`)}
  `;

  /* Show the figure part when a "wrong letter" has been guessed -
  iterate through the figure part array ->
  Get the length of wrong letters array and store in errors variable ->
  check the "forEach index" is less then the errors variable, if so then set display of "part" to block
  */
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;
    if (index < errors) {
      part.style.display = "block";
    } else {
      part.style.display = "none";
    }
  });

  /* Check if lost the game -> 
  show final message -> 
  set gameOver variable to true which will not execute the code block with the keydown event funtion
  */
  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = "Sorry you lost";
    popup.style.display = "flex";
    gameOver = true;
  }
}

/* Event for when a letter is pressed -
Event Listener keydown for when a key is pressed ->
following code only runs when "gameOver" is true (!gameOver = true)
store the pressed key letter into a variable ->
check if pressed letter is in the random word and then check if it doesn't exist within the correctLetters array ->
if letter in not in the correctLetters array then push ->
call the display function ->

if the letter in not included in the random word then check if the letter is in the wrongLetter array->
if letter is not in the wrongLetter array then push ->
call function updateWrongLettersEl
*/
window.addEventListener("keydown", (e) => {
  if (!gameOver) {
    const letter = e.key;
    if (randomWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);
        displayWord();
      } else {
        showNotification();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);

        updateWrongLettersEl();
      } else {
        showNotification();
      }
    }
  }
});

/* Play again button -
reset everything, generate new word
*/

playAgainBtn.addEventListener("click", () => {
  correctLetters = [];
  wrongLetters = [];

  popup.style.display = "none";

  randomWord = words[Math.floor(Math.random() * words.length)];

  displayWord();
  updateWrongLettersEl();

  gameOver = false;
});

displayWord();
