const gameContainer = document.getElementById("game");
const scoreNumber = document.getElementById("score");
const reset = document.getElementById("reset");
const start = document.getElementById("start");
const highScoreNumber = document.getElementById("highScore");
const cards = document.getElementsByTagName("div");

reset.addEventListener("click", function () {
  document.location.reload();
});

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  //Declare cardNumber

  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}
//declare global variables
let card1 = null;
let card2 = null;
let cardCount = 0;
let card1Value = "";
let card2Value = "";
let score = 0;
let highScore = 0;
let gameStart = false;

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  //console.log("you just clicked", event.target);
  //set card color and current card to either card 1 or 2
  currentCard = event.target;
  if (!card1 || !card2) {
    if (!card1) {
      //console.log("I went");
      card1 = currentCard;
      card1Value = card1.className;
      card1.style.backgroundColor = card1Value;
      card1.classList.add("flipped");
    } else {
      //console.log("I went2");
      card2 = currentCard;
      card2Value = card2.className;
      card2.style.backgroundColor = card2Value;
      card2.classList.add("flipped");
    }
  }
  // console.log(cards.length + 1);
  // console.log(cardCount);
  //console.log(card2Value);
  //check if card1 and card 2 are same color
  if (card1 && card2) {
    if (card1Value === card2Value) {
      card1.removeEventListener("click", handleCardClick);
      card2.removeEventListener("click", handleCardClick);
      card1 = "";
      card2 = "";
      //update score
      score += 1;
      scoreNumber.innerText = score;
      cardCount += 2;
      //if not equal, set card color and flipped state back to null
    } else
      setTimeout(function () {
        card1.style.backgroundColor = "";
        card1.classList.remove("flipped");
        card2.style.backgroundColor = "";
        card2.classList.remove("flipped");
        card1 = "";
        card2 = "";
        //update score
        score += 1;
        scoreNumber.innerText = score;
      }, 1000);
    //check if total flipped card count is equal to amount of cards on the page and set high score to local storage
    if (cardCount == cards.length - 1) {
      alert("You finished!");
      highScore = score;
      localStorage.setItem("highScore", highScore);
    }
  }
}

// when the DOM loads
//starts game when start button is pressed
start.addEventListener("click", function () {
  if (!gameStart) createDivsForColors(shuffledColors);
  gameStart = true;
});

//load high score from local storage and sets it if it exists
highScoreTemp = localStorage.getItem("highScore");
if (highScoreTemp !== null) {
  highScore = highScoreTemp;
}
highScoreNumber.innerText = highScore;
//sets initial score of 0
scoreNumber.innerText = score;
