function createGameTitle() {
  const gameTitle = document.createElement('h1');
  gameTitle.classList.add('game-title');
  gameTitle.textContent = 'Pair Game';
  return gameTitle;
}

function createGameBox() {
  const gameBox = document.createElement('div');
  gameBox.classList.add('game-box', 'hide');

  const statsContainer = document.createElement('div');
  statsContainer.classList.add('stats-container');
  const movesCount = document.createElement('p');
  movesCount.setAttribute('id', 'moves-count');
  const timeCount = document.createElement('p');
  timeCount.setAttribute('id', 'time-count');
  const gameContainer = document.createElement('div');
  statsContainer.append(movesCount, timeCount);
  gameContainer.classList.add('game-container');

  const stopButton = document.createElement('button');
  stopButton.classList.add('btn-reset', 'btn');
  stopButton.setAttribute('id', 'stop');
  stopButton.textContent = 'Stop Button';

  gameBox.append(statsContainer, gameContainer, stopButton);
  return { gameBox, gameContainer, stopButton };
}

function createControlBox() {
  const controlBox = document.createElement('div');
  controlBox.classList.add('control-box');
  const result = document.createElement('div');
  result.setAttribute('id', 'result');
  const gameForm = createForm();
  controlBox.append(result, gameForm.form);

  return { controlBox, gameForm, result };
}

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
  form.append(formDescr, input, startButton);

  return {
    form,
    input,
    startButton,
  };
}

function checkViewport(card, size, viewport_width) {
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
};

(() => {
  const container = document.createElement('div');
  container.classList.add('container');
  const wrapper = document.createElement('div');
  wrapper.classList.add('wrapper');

  const gameTitle = createGameTitle();
  const gameBox = createGameBox();
  const controlBox = createControlBox();
  let gameCopyright = document.createElement('p');
  gameCopyright.classList.add('form-descr');
  gameCopyright.innerHTML = 'pair-game-js &copy; 2023 sashauly';

  wrapper.append(gameTitle, gameBox.gameBox, controlBox.controlBox, gameCopyright);
  container.append(wrapper);
  document.body.append(container);

  const moves = document.getElementById("moves-count");
  const timeValue = document.getElementById("time-count");

  let interval;
  let movesCount = 0;
  let winCount = 0;
  let seconds = 0;
  let minutes = 0;

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

  function startGame(cardValues, size = 4) {
    let firstCard = false;
    let secondCard = false;

    gameBox.gameContainer.innerHTML = "";
    for (let i = 0; i < size * size; i++) {
      gameBox.gameContainer.innerHTML += `
     <div class="card-container flipped" data-card-value="${cardValues[i]}">
        <div class="card-before">?</div>
        <div class="card-after">${cardValues[i]}</div>
     </div>
     `;
    }
    gameBox.gameContainer.style.gridTemplateColumns = `repeat(${size},auto)`;
    let viewport_width = window.innerWidth;

    let cards = document.querySelectorAll(".card-container");
    let startDelay = `${size}` * 1000;
    cards.forEach((card) => {
      checkViewport(card, size, viewport_width);

      setTimeout(() => {
        card.classList.remove("flipped");
        card.addEventListener("click", () => {
          if (!card.classList.contains("matched")) {
            card.classList.add("flipped");
            if (!firstCard) {
              firstCard = card;
              firstCardValue = card.getAttribute("data-card-value");
            } else {
              movesCount++;
              moves.innerHTML = `<span>Moves: </span>${movesCount}`;
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
      }, startDelay);
    });
  }

  controlBox.gameForm.form.addEventListener('submit', function (e) {
    e.preventDefault();
    movesCount = 0;
    seconds = 0;
    minutes = 0;
    controlBox.controlBox.classList.add("hide");
    gameBox.gameBox.classList.remove("hide");
    controlBox.gameForm.startButton.classList.add("hide");
    moves.innerHTML = `<span>Moves: </span> ${movesCount}`;
    timeValue.innerHTML = `<span>Time: </span> 00:00`;
    interval = setInterval(timeGenerator, 1000);
    initializer();
  });

  gameBox.stopButton.addEventListener(
    "click",
    (stopGame = () => {
      controlBox.controlBox.classList.remove("hide");
      gameBox.gameBox.classList.add("hide");
      controlBox.gameForm.startButton.classList.remove("hide");
      clearInterval(interval);
    })
  );

  const initializer = () => {
    result.innerText = "";
    winCount = 0;
    let count = controlBox.gameForm.input.value;
    if (count == '' || count % 2 || count < 2 || count > 10) count = 4;
    const numberArray = createArray(count);
    shuffleArray(numberArray);
    startGame(numberArray, count);
  };
})();