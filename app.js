const wordEl = document.querySelector("#word");
const wrongLettersEl = document.querySelector("#wrong-letters");
const playAgainBtn = document.querySelector("#play-again");
const popup = document.querySelector("#popup-container");
const notification = document.querySelector("#notification-container");
const finalMessage = document.querySelector("#final-message");

const figureParts = document.querySelectorAll(".figure-part");

// Array of words
const words = ["friends", "heroes", "angel", "titans"];

// Generate random word from the words array
let randomWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = ["f", "r", "i", "e", "n", "d", "s"]; // Users Guess
const wrongLetters = []; // Users Guess

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
        <span class="letter">
          ${correctLetters.includes(letter) ? letter : ""} 
        </span>
      `
      )
      .join("")}
  `;

  const innerWord = wordEl.innerText.replace(/\n/g, "");

  if (innerWord === randomWord) {
    finalMessage.innerText = "Congratulation You Won!";
    popup.style.display = "flex";
  }
}

displayWord();
