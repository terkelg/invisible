export function map (value, start1, stop1, start2, stop2) {
  let v = ((value - start1) / (stop1 - start1)) * (stop2 - start2) + start2
  return clamp(v, start2, stop2);
}

export function clamp (v, min, max) {
  return Math.min(max, Math.max(min, v))
}

export function length ([x1, y1], [x2, y2]) {
  let a = x1 - x2;
  let b = y1 - y2;
  return Math.sqrt(a ** 2 + b ** 2);
}

export function debug ([x, y], goal, goalArea) {
  let outer = document.querySelector(`.debug`);
  outer.style.width = `${goalArea * 2}px`;
  outer.style.height = `${goalArea * 2}px`;
  outer.style.left = `${x}px`;
  outer.style.top = `${y}px`;

  let inner = document.querySelector(`.debug .inner`);
  inner.style.width = `${goal * 2}px`;
  inner.style.height = `${goal * 2}px`;
}

export const getVoice = (lang) => {
  return window.speechSynthesis.getVoices().filter(v => v.lang === lang)
}

export const speak = (string, lang = `en-US`) => new Promise(resolve => {
  const utterThis = new SpeechSynthesisUtterance(string);
  const voice = getVoice(lang)[0];
  utterThis.addEventListener('end', resolve);
  utterThis.voice = voice;
  window.speechSynthesis.speak(utterThis);
});
