import {levels} from './config.js';
import {length, map, speak, debug, getVoice} from './utils.js';

const DEBUG = false;

let _found, _loop, _over;
let state, lvl, pid, lvlIndex = -1;
let width, height;

let target, position, pointer;
let last = performance.now();
let goal, goalArea; let hotterSynth, colderSynth, clickSynth; const newTarget = () => [Math.random(), Math.random()]; const getPosition = ([x, y]) => [x * width, y * height]; export const init = ({found, loop, over}) => {
  _found = found;
  _loop = loop;
  _over = over;
  window.addEventListener('pointermove', pointerMove);
  window.addEventListener('pointerup', pointerUp);
  window.addEventListener('resize', resize);
  resize();
}

export const destroy = () => {
  window.removeEventListener('pointermove', pointerMove);
  window.removeEventListener('pointerup', pointerUp);
  window.removeEventListener('resize', resize);
}

export const start = async () => {
  if (lvl.intro) await speak(lvl.intro);
  if (!pid) pid = requestAnimationFrame(loop);
}

export const stop = () => {
  if (pid) pid = cancelAnimationFrame(pid);
}

export const hasNextLevel = () => {
  return lvlIndex + 1 < levels.length;
}

export const levelUp = () => {
  level(lvlIndex + 1)
}

export const level = (index) => {
  state = newState();
  target = newTarget();
  position = getPosition(target);
  lvlIndex = index;
  lvl = levels[index];
  goal = lvl.goal * Math.min(width, height)
  goalArea = lvl.goalArea * Math.min(width, height);
  hotterSynth = setupSynth(lvl.hotter, lvl);
  colderSynth = setupSynth(lvl.colder, lvl);
  clickSynth = setupSynth(lvl.click, {...lvl, pitch: [1], rate: [1]});
  resetCursor();
}

const setupSynth = (string, lvl) => {
  const synth = new SpeechSynthesisUtterance(string);
  const voice = getVoice(lvl.language)[0];
  synth.voice = voice;
  synth.pitch = lvl.pitch[0];
  synth.rate = lvl.rate[0];
  return synth;
}

const loop = time => {
  if (!pid) return;
  state.distance = length(position, pointer);
  if (state.distance <= goalArea) {
    const pitch = map(state.distance, goalArea, 0, lvl.pitch[0], lvl.pitch[1]);
    const rate = map(state.distance, goalArea, 0, lvl.rate[0], lvl.rate[1]);
    hotterSynth.pitch = colderSynth.pitch = pitch;
    hotterSynth.rate = colderSynth.rate = rate;
    state.inGoalArea = true;
    state.inGoal = state.distance <= goal;
  } else {
    state.inGoalArea = false;
  }

  if (lvl.hideCursor) {
    document.body.classList.add('hide')
    document.body.classList.remove('click');
  } else {
    state.inGoal 
      ? document.body.classList.add('click')
      : document.body.classList.remove('click');
  }

  const delta = time - last;
  if (delta > lvl.interval) {
    if (state.inGoal) {
      window.speechSynthesis.speak(clickSynth);
    } else if (state.distance < state.distanceLastInterval) {
      console.log('::Hotter');
      window.speechSynthesis.speak(hotterSynth);
    } else if (state.distance > state.distanceLastInterval) {
      console.log('::Colder');
      window.speechSynthesis.speak(colderSynth);
    }
    state.distanceLastInterval = state.distance;
    last = time;
  }

  if (DEBUG) debug(position, goal, goalArea);

  _loop(state, time);
  pid = requestAnimationFrame(loop);
}

const newState = index => ({
  distance: Infinity,
  inGoalArea: false,
  inGoal: false,
  distanceLastInterval: Infinity
});

const resetCursor = () => {
  document.body.classList.remove('hide');
  document.body.classList.remove('click');
}

const pointerMove = ({x, y}) => {
  pointer = [x, y];
}

const pointerUp = async () => {
  if (!pid) return;
  if (state.distance <= goal) {
    const next = lvlIndex + 1;
    stop();
    resetCursor();
    await speak(lvl.found);
    await _found(state, lvl, lvlIndex);
    if (next === levels.length) {
      _over(state, lvl);
    }
  }
}

const resize = () => {
  width = window.innerWidth;
  height = window.innerHeight;
  if (position) {
    goal = lvl.goal * Math.min(width, height)
    goalArea = lvl.goalArea * Math.min(width, height);
    position = getPosition(target);
  }
  if (DEBUG && position) debug(position, goal, goalArea);
}
