

const controlBox = document.querySelector('.controls-box');
const gameBox = document.querySelector('.game-box');

const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');

const moves = document.getElementById("moves-count");
const timeValue = document.getElementById("time-count");
const result = document.getElementById('result');

const gameContainer = document.querySelector('.game-container');

let interval;

let movesCount = 0,
  winCount = 0;

let seconds = 0,
  minutes = 0;

function createForm() {
  let formDescr = document.createElement('p');
  let form = document.createElement('form');
  let input = document.createElement('input');
  let startButton = document.createElement('button');

  formDescr.classList.add('form-descr');
  formDescr.textContent = 'Enter the even number from 2 to 10 for rows and cols (4 by default)';
  form.classList.add('form');
  input.classList.add('input-number');
  input.placeholder = 'Enter the number: ';
  startButton.classList.add('btn-reset', 'btn');
  startButton.getAttribute('id', 'start');
  startButton.textContent = 'Start Game';
  form.append(formDescr);
  form.append(input);
  form.append(startButton);

  return {
    form,
    input,
    startButton,
  };
}

let gameForm = createForm();
controlBox.append(gameForm.form);

const timeGenerator = () => {
  seconds++;
  if (seconds >= 60) {
    minutes++;
    seconds = 0;
  }
  let secondsValue = seconds < 10 ? `0${seconds}` : seconds;
  let minutesValue = minutes < 10 ? `0${minutes}` : minutes;
  timeValue.innerHTML = `<span>Time: </span>${minutesValue}:${secondsValue}`;
};

const movesCounter = () => {
  movesCount++;
  moves.innerHTML = `<span>Moves:</span>${movesCount}`;
};

// Этап 1. Создайте функцию, генерирующую массив парных чисел. Пример массива, который должна возвратить функция: [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8].count - количество пар.

function createArray(count) {
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
  let firstCard = false;
  let secondCard = false;

  gameContainer.innerHTML = "";
  for (let i = 0; i < size * size; i++) {
    gameContainer.innerHTML += `
     <div class="card-container" data-card-value="${cardValues[i]}">
        <div class="card-before">?</div>
        <div class="card-after">${cardValues[i]}</div>
     </div>
     `;
  }
  gameContainer.style.gridTemplateColumns = `repeat(${size},auto)`;

  let cards = document.querySelectorAll(".card-container");
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      if (!card.classList.contains("matched")) {
        card.classList.add("flipped");
        if (!firstCard) {
          firstCard = card;
          firstCardValue = card.getAttribute("data-card-value");
        } else {
          movesCounter();
          secondCard = card;
          let secondCardValue = card.getAttribute("data-card-value");
          if (firstCardValue == secondCardValue) {
            firstCard.classList.add("matched");
            secondCard.classList.add("matched");
            firstCard = false;
            winCount++;
            if (winCount == Math.floor(cardValues.length / 2)) {
              result.innerHTML = `<h2>You Won!</h2>
            <h4>Moves: ${movesCount}</h4>
            <p>Try again?</p>`;
              stopGame();
            }
          } else {
            let [tempFirst, tempSecond] = [firstCard, secondCard];
            firstCard = false;
            secondCard = false;
            let delay = setTimeout(() => {
              tempFirst.classList.remove("flipped");
              tempSecond.classList.remove("flipped");
            }, 500);
          }
        }
      }
    });
  });
}



gameForm.form.addEventListener('submit', function (e) {
  e.preventDefault();
  movesCount = 0;
  seconds = 0;
  minutes = 0;
  controlBox.classList.add("hide");
  gameBox.classList.remove("hide");
  gameForm.startButton.classList.add("hide");
  timeValue.innerHTML = `<span>Time: </span> 00:00`;
  interval = setInterval(timeGenerator, 1000);
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
    clearInterval(interval);
  })
);

//Initialize values and func calls
const initializer = () => {
  result.innerText = "";
  winCount = 0;
  let count = gameForm.input.value;
  if (count == '' || count % 2 || count < 2 || count > 10) count = 4;
  let numberArray = createArray(count);
  console.log(numberArray);
  shuffleArray(numberArray);
  console.log(numberArray);
  startGame(numberArray, count);
};