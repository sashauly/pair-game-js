(function () {
  function createGameTitle(title) {
    let appTitle = document.createElement('h1');
    appTitle.classList.add('game-title');
    appTitle.innerHTML = title;
    return appTitle;
  }

  function createPairGame() {
    let container = document.createElement('div');
    container.classList.add('container');
    document.body.append(container);

    let gameTitle = createGameTitle('Pair Game');

    container.append(gameTitle);

    document.body.append(container);
  };
  createPairGame();
})();