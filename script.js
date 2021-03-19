"use strict";

const scoreValues = {
  1: 15,
  2: 12,
  3: 10,
  4: 9,
  5: 8,
};

const appContainer = document.querySelector(".app-container");
const goButton = document.querySelector(".go-button");
const numPlayersInput = document.querySelector(".number-players");
const playersRequest = document.querySelector(".players-request");

class App {
  constructor() {
    this.players = [];
    if (localStorage.getItem("players")) {
      const players = JSON.parse(localStorage.getItem("players"));
      this.players = players;
      this.renderPlayers();
    }
    goButton.addEventListener("click", () => {
      const numPlayers = numPlayersInput.value;
      this.renderGetNames(numPlayers);
    });
  }

  renderGetNames(numPlayers) {
    const button = `<div class="play-button button">
      <span class="button-text"> Play!</span>
      </div>`;

    const html = `
      <div>
      <span> Enter name for Player</span><input class="name-input">
      </div>`;

    playersRequest.innerHTML = "";

    for (let i = 0; i < numPlayers; i++) {
      playersRequest.insertAdjacentHTML("beforeend", html);
    }

    playersRequest.insertAdjacentHTML("beforeend", button);

    const playButton = document.querySelector(".play-button");

    playButton.addEventListener("click", () => {
      console.log("hi");
      this.savePlayers();
      this.renderPlayers();
    });
  }

  savePlayers() {
    const nameInputs = document.querySelectorAll(".name-input");

    nameInputs.forEach((input, i) => {
      this.players.push(new Player(input.value));
    });
  }

  renderPlayers() {
    playersRequest.innerHTML = "";

    const button = `
    <div class="race-button button">
      <span class="button-text"> Race!</span>
    </div>`;

    this.players.forEach((player) => {
      const html = `
      <div class="player-div">
        <span class="player-name">${player.name}</span><span class="player-score">Score: ${player.score}</span>
      </div>`;

      playersRequest.insertAdjacentHTML("beforeend", html);
    });

    playersRequest.insertAdjacentHTML("beforeend", button);

    const raceButton = document.querySelector(".race-button");

    raceButton.addEventListener("click", this.raceResult.bind(this));
  }

  raceResult() {
    playersRequest.innerHTML = "";
    const button = `
    <div class="commit-button button">
      <span class="button-text"> Commit Results</span>
    </div>`;

    this.players.forEach((player) => {
      const html = `
      <div class="player-div">
        <span class="player-name">${player.name}</span><span class="result-display"><select class="result">
        <option value="1">1st</option>
        <option value="2">2nd</option>
        <option value="3">3rd</option>
        <option value="4">4th</option>
        <option value="5">5th</option>
      </select></span>
      </div>`;
      playersRequest.insertAdjacentHTML("beforeend", html);
    });

    playersRequest.insertAdjacentHTML("beforeend", button);

    const commitButton = document.querySelector(".commit-button");
    const results = document.querySelectorAll(".result");
    const resultsArr = [];

    commitButton.addEventListener("click", () => {
      results.forEach((result) => {
        resultsArr.push(result.value);
      });
      this.calculateScores(resultsArr);
      this.renderPlayers();
      window.localStorage.setItem("players", JSON.stringify(this.players));
    });
  }

  calculateScores(resultsArr) {
    resultsArr.forEach((place, i) => {
      this.players[i].score += scoreValues[place];
    });
  }
}

class Player {
  constructor(name) {
    this.name = name;
    this.score = 0;
  }
}

const game = new App();
