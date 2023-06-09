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

function createArray(count) {
  const numbersArray = [];
  for (let i = 1; i <= (count * count) / 2; i++) {
    numbersArray.push(i);
    numbersArray.push(i);
  }
  return numbersArray;
}

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

function startGame(cardValues, size) {
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
  let viewport_width = window.innerWidth;

  let cards = document.querySelectorAll(".card-container");
  cards.forEach((card) => {
    if (size == 10 || size == 8) {
      if (viewport_width < 375) {
        card.style.width = '0.8em';
        card.style.height = '0.8em';
      } else if (viewport_width < 900) {
        card.style.width = '1.7em';
        card.style.height = '1.7em';
      } else if (viewport_width < 1400) {
        card.style.width = '2.25em';
        card.style.height = '2.25em';
      } else if (viewport_width < 1600) {
        card.style.width = '3.25em';
        card.style.height = '3.25em';
      }
    } else if (size == 6) {
      if (viewport_width < 1024) {
        card.style.width = '2.75em';
        card.style.height = '2.75em';
      } else if (viewport_width < 1400) {
        card.style.width = '3.25em';
        card.style.height = '3.25em';
      }
    }
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
  moves.innerHTML = `<span>Moves: </span> ${movesCount}`;
  initializer();
});

stopButton.addEventListener(
  "click",
  (stopGame = () => {
    controlBox.classList.remove("hide");
    gameBox.classList.add("hide");
    gameForm.startButton.classList.remove("hide");
    clearInterval(interval);
  })
);

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