import * as Game from './game.js';

const readyBtn = document.querySelector(`.button--start`);
const againBtn = document.querySelector(`.button--end`);
const introDialog = document.querySelector(`.dialog--intro`);
const endDialog = document.querySelector(`.dialog--end`);

const found = (state, level) => {
  if (Game.hasNextLevel()) {
    Game.levelUp();
    Game.start();
  }
}

const loop = (state, level, time) => {
  // Do logic here if you want to
}

const over = () => {
  endDialog.classList.add(`visible`);
}

readyBtn.addEventListener(`click`, event => {
  event.preventDefault();
  introDialog.classList.remove(`visible`);
  Game.level(0);
  Game.start();
});

againBtn.addEventListener(`click`, event => {
  event.preventDefault();
  endDialog.classList.remove(`visible`);
  Game.level(0);
  Game.start();
});

Game.init({found, over, loop})
