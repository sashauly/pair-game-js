(function () {
  function createGameTitle(title) {
    let appTitle = document.createElement('h1');
    appTitle.classList.add('game-title');
    appTitle.innerHTML = title;
    return appTitle;
  }

  function createStartScreen() {
    let controlsContainer = document.createElement('div');
    controlsContainer.classList.add('controls-container');

    let form = document.createElement('form');
    let input = document.createElement('input');
    let startButton = document.createElement('button');

    form.classList.add('input-group');
    input.classList.add('form-control');
    input.placeholder = 'Enter the number of cards vertically/horizontally';
    startButton.classList.add('btn');
    startButton.textContent = 'Start Game';

    form.append(input);
    form.append(startButton);

    // let result = document.createElement('p');
    // result.setAttribute('id', 'result');
    // controlsContainer.append(result);
    controlsContainer.append(form);

    return controlsContainer;
  }

  function createGameScreen() {
    let wrapper = document.createElement('div');
    wrapper.classList.add('wrapper');

    let statsBox = document.createElement('div');
    let movesCount = document.createElement('div');
    let timeCount = document.createElement('div');
    statsBox.classList.add('stats-box');
    movesCount.setAttribute('id', 'moves-count');
    timeCount.setAttribute('id', 'time-count');
    statsBox.append(movesCount);
    statsBox.append(timeCount);
    wrapper.append(statsBox);

    let gameBox = document.createElement('div');
    gameBox.classList.add('game-container');
    wrapper.append(gameBox);

    let stopButton = document.createElement('button');
    stopButton.textContent = 'Stop Game';
    stopButton.classList.add('hide');
    stopButton.setAttribute('id', 'stop');
    wrapper.append(stopButton);

    return wrapper;
  }

  // Этап 1. Создайте функцию, генерирующую массив парных чисел. Пример массива, который должна возвратить функция: [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8].count - количество пар.

  function createNumbersArray(count) {
    const numbersArray = [];
    for (let i = 1; i <= count; i++) {
      numbersArray.push(i);
      numbersArray.push(i);
    }
    return numbersArray;
  }

  // Этап 2. Создайте функцию перемешивания массива.Функция принимает в аргументе исходный массив и возвращает перемешанный массив. arr - массив чисел

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  // Этап 3. Используйте две созданные функции для создания массива перемешанными номерами. На основе этого массива вы можете создать DOM-элементы карточек. У каждой карточки будет свой номер из массива произвольных чисел. Вы также можете создать для этого специальную функцию. count - количество пар.

  function startGame(count) {

  }

  function createPairGame() {
    let container = document.createElement('div');
    container.classList.add('container');
    document.body.append(container);

    let gameTitle = createGameTitle('Pair Game');
    let startScreen = createStartScreen();
    let gameScreen = createGameScreen();

    container.append(gameTitle);
    container.append(startScreen);
    container.append(gameScreen);

    let timeValue = document.getElementById('time-count');
    let movesValue = document.getElementById('moves-count');

    let seconds = 0, minutes = 0;
    let movesCount = 0;

    const timeGenerator = () => {
      seconds += 1;
      if (seconds >= 60) {
        minutes += 1;
        seconds = 0;
      }
      let secondsValue = seconds < 10 ? `0${seconds}` : seconds;
      let minutesValue = minutes < 10 ? `0${minutes}` : minutes;
      timeValue.innerHTML = `<span>Time: </span>${minutesValue}:${secondsValue}`;
    };

    const movesCounter = () => {
      movesCount += 1;
      movesValue.innerHTML = `<span>Moves: </span>${movesCount}`;
    };

    const numbersArray = createNumbersArray(8);
    console.log(numbersArray);
    shuffle(numbersArray);
    console.log(numbersArray);

  };
  createPairGame();

})();
