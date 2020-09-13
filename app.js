const wordEl = document.querySelector("#word");
const wrongLettersEl = document.querySelector("#wrong-letters");
const playAgainBtn = document.querySelector("#play-button");
const popup = document.querySelector("#popup-container");
const notification = document.querySelector("#notification-container");
const finalMessage = document.querySelector("#final-message");
const moviesBtn = document.querySelector("#movies-category");
const tvBtn = document.querySelector("#tv-category");
const gamesBtn = document.querySelector("#games");
const musicArtistBtn = document.querySelector("#music-artist-category");
const categoryName = document.querySelector("#category-name");

const figureParts = document.querySelectorAll(".figure-part");

// Array of Movies
const movies = ["avengers end game", "inception", "the dark knight", "rush hour", "star wars", "mission impossible", "the equalizer", "deadpool", "terminator", "sherlock holmes", "bad boys", "the big short", "the nice guys", "die hard"];

// Array of Tv Shows
const tvShows = ["friends", "heroes", "angel", "titans", "brooklyn nine nine", "breaking bad", "fresh prince of bel air", "suits", "house of cards", "stranger things", "the umbrella academy", "the witcher", "smallville", "altered carbon"];

// Array of Tv Shows
const musicArtist = ["michael jackson", "ed sheeran", "pentatonix", "linkin park", "adele", "dua lipa", "justin timberlake", "the weekend", "timberland", "sam smith", "kasabian", "chris brown", "bruno mars", "jason derulo"];

// Array of Games
const games = ["destiny", "anthem", "call of duty", "darksiders", "battlefront", "god of war", "ghost of tsushima", "final fantasy 7", "spiderman", "world of warcraft", "resident evil", "fortnight", "max payne", "star wars jedi knight"];

let correctLetters = []; // Users Guess
let wrongLetters = []; // Users Guess
let gameOver = false;

// Function to reset the game
function reset() {
  correctLetters = [];
  wrongLetters = [];
  popup.style.display = "none";
  gameOver = false;
}

// Movies button function to play game with movies category
moviesBtn.addEventListener("click", (e) => {
  randomWord = movies[Math.floor(Math.random() * movies.length)];
  displayWord();

  categoryName.innerHTML = e.target.innerText;

  playAgainBtn.addEventListener("click", () => {
    reset();
    randomWord = movies[Math.floor(Math.random() * movies.length)];
    displayWord();
    updateWrongLettersEl();
  });
});

// Tv button function to play game with tv shows category
tvBtn.addEventListener("click", (e) => {
  randomWord = tvShows[Math.floor(Math.random() * tvShows.length)];
  displayWord();

  categoryName.innerHTML = e.target.innerText;

  playAgainBtn.addEventListener("click", () => {
    reset();
    randomWord = tvShows[Math.floor(Math.random() * tvShows.length)];
    displayWord();
    updateWrongLettersEl();
  });
});

// Music Artists button function to play game with Music Artist category
musicArtistBtn.addEventListener("click", (e) => {
  randomWord = musicArtist[Math.floor(Math.random() * musicArtist.length)];
  displayWord();

  categoryName.innerHTML = e.target.innerText;

  playAgainBtn.addEventListener("click", () => {
    reset();
    randomWord = musicArtist[Math.floor(Math.random() * musicArtist.length)];
    displayWord();
    updateWrongLettersEl();
  });
});

// Games button function to play game with movies category
gamesBtn.addEventListener("click", (e) => {
  randomWord = games[Math.floor(Math.random() * games.length)];
  displayWord();

  categoryName.innerHTML = e.target.innerText;

  playAgainBtn.addEventListener("click", () => {
    reset();
    randomWord = games[Math.floor(Math.random() * games.length)];
    displayWord();
    updateWrongLettersEl();
  });
});

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
