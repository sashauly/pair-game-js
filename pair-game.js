

const controlBox = document.querySelector('.controls-box');
const gameBox = document.querySelector('.game-box');

const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');

const moves = document.getElementById("moves-count");
const timeValue = document.getElementById("time-count");
const result = document.getElementById('result');

const gameContainer = document.querySelector('.game-container');

let cards;
let interval;
let firstCard = false;
let secondCard = false;

function createForm() {
  let form = document.createElement('form');
  let input = document.createElement('input');
  let startButton = document.createElement('button');

  form.classList.add('form');
  input.classList.add('input-number');
  input.placeholder = 'Enter the number of cards vertically/horizontally';
  startButton.classList.add('btn-reset', 'btn');
  startButton.getAttribute('id', 'start');
  startButton.textContent = 'Start Game';
  form.append(input);
  form.append(startButton);

  return {
    form,
    input,
    startButton,
  };
}



let movesCount = 0,
  winCount = 0;

const timeGenerator = () => {
  let seconds = 0,
    minutes = 0;
  timer = setInterval(() => {
    if (seconds >= 60) {
      minutes += 1;
      seconds = 0;
    }
    let secondsValue = seconds < 10 ? `0${seconds}` : seconds;
    let minutesValue = minutes < 10 ? `0${minutes}` : minutes;
    timeValue.innerHTML = `<span>Time: </span>${minutesValue}:${secondsValue}`;
    seconds++;
  }, 1000);
};

//For calculating moves
const movesCounter = () => {
  movesCount += 1;
  moves.innerHTML = `<span>Moves:</span>${movesCount}`;
};

// Этап 1. Создайте функцию, генерирующую массив парных чисел. Пример массива, который должна возвратить функция: [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8].count - количество пар.

function createArray(count = 4) {
  const numbersArray = [];
  for (let i = 1; i <= (count * count) / 2; i++) {
    numbersArray.push(i);
    numbersArray.push(i);
  }
  return numbersArray;
}

// Этап 2. Создайте функцию перемешивания массива.Функция принимает в аргументе исходный массив и возвращает перемешанный массив. arr - массив чисел

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

// Этап 3. Используйте две созданные функции для создания массива перемешанными номерами. На основе этого массива вы можете создать DOM-элементы карточек. У каждой карточки будет свой номер из массива произвольных чисел. Вы также можете создать для этого специальную функцию. count - количество пар.

function startGame(cardValues, size = 4) {
  gameContainer.innerHTML = "";
  for (let i = 0; i < size * size; i++) {
    gameContainer.innerHTML += `
     <div class="card-container" data-card-value="${cardValues[i]}">
        <div class="card-before">?</div>
        <div class="card-after">${cardValues[i]}</div>
     </div>
     `;
  }
  //Grid
  gameContainer.style.gridTemplateColumns = `repeat(${size},auto)`;

  //Cards
  cards = document.querySelectorAll(".card-container");
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      //If selected card is not matched yet then only run (i.e already matched card when clicked would be ignored)
      if (!card.classList.contains("matched")) {
        //flip the cliked card
        card.classList.add("flipped");
        //if it is the firstcard (!firstCard since firstCard is initially false)
        if (!firstCard) {
          //so current card will become firstCard
          firstCard = card;
          //current cards value becomes firstCardValue
          firstCardValue = card.getAttribute("data-card-value");
        } else {
          //increment moves since user selected second card
          movesCounter();
          //secondCard and value
          secondCard = card;
          let secondCardValue = card.getAttribute("data-card-value");
          if (firstCardValue == secondCardValue) {
            //if both cards match add matched class so these cards would beignored next time
            firstCard.classList.add("matched");
            secondCard.classList.add("matched");
            //set firstCard to false since next card would be first now
            firstCard = false;
            //winCount increment as user found a correct match
            winCount += 1;
            //check if winCount ==half of cardValues
            if (winCount == Math.floor(cardValues.length / 2)) {
              result.innerHTML = `<h2>You Won</h2>
            <h4>Moves: ${movesCount}</h4>`;
              stopGame();
            }
          } else {
            //if the cards dont match
            //flip the cards back to normal
            let [tempFirst, tempSecond] = [firstCard, secondCard];
            firstCard = false;
            secondCard = false;
            let delay = setTimeout(() => {
              tempFirst.classList.remove("flipped");
              tempSecond.classList.remove("flipped");
            }, 900);
          }
        }
      }
    });
  });
}

let gameForm = createForm();
controlBox.append(gameForm.form);

gameForm.form.addEventListener('submit', function (e) {
  e.preventDefault();
  if (!gameForm.input.value) {
    return;
  }
  movesCount = 0;
  controlBox.classList.add("hide");
  gameBox.classList.remove("hide");
  gameForm.startButton.classList.add("hide");
  timeGenerator();
  moves.innerHTML = `<span>Moves:</span> ${movesCount}`;
  initializer();
});

// Stop game
stopButton.addEventListener(
  "click",
  (stopGame = () => {
    controlBox.classList.remove("hide");
    gameBox.classList.add("hide");
    gameForm.startButton.classList.remove("hide");
    clearInterval(timer);
  })
);

//Initialize values and func calls
const initializer = () => {
  result.innerText = "";
  winCount = 0;
  let count = gameForm.input.value;
  let numberArray = createArray(count);
  console.log(numberArray);
  shuffleArray(numberArray);
  console.log(numberArray);
  startGame(numberArray, count);
};