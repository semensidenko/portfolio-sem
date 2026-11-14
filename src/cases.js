/*
  Карусель кейсів на першому екрані.
  Видно по 2 кейси (на телефоні по 1), крок — один кейс. У треку 3 справжні
  картки й 2 клони на початку циклу, тому прокрутка безкінечна: після
  останнього кейса знову йде перший без «перемотки».
  Керування: автозміна кожні 5 с (пауза при наведенні/фокусі, вимкнена при
  prefers-reduced-motion), свайп або перетягування, крапки.
*/
const COUNT = 3;
const AUTOPLAY_MS = 5000;
const SWIPE_PX = 50;

export function initCases() {
  const root = document.querySelector('[data-cases]');
  const track = root?.querySelector('[data-cases-track]');
  if (!root || !track) return;

  const dots = [...root.querySelectorAll('[data-cases-dot]')];
  let index = 0; // 0..COUNT; COUNT — це клон першого кейса
  let timer = null;

  const render = () => {
    track.style.setProperty('--i', index);
    dots.forEach((dot, i) => {
      const active = i === index % COUNT;
      dot.classList.toggle('is-active', active);
      dot.setAttribute('aria-current', String(active));
    });
  };

  // Миттєво (без анімації) перестрибнути на еквівалентну позицію
  const jump = (value) => {
    track.classList.add('is-instant');
    index = value;
    render();
    void track.offsetWidth; // застосувати стиль до того, як повернемо анімацію
    track.classList.remove('is-instant');
  };

  const goTo = (value) => {
    index = value;
    render();
  };

  const next = () => goTo(index + 1);
  const prev = () => {
    if (index === 0) jump(COUNT);
    goTo(index - 1);
  };

  track.addEventListener('transitionend', (event) => {
    if (event.target === track && index >= COUNT) jump(index - COUNT);
  });

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      goTo(i);
      restart();
    });
  });

  // ---- Автозміна ----
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const stop = () => {
    clearInterval(timer);
    timer = null;
  };
  const start = () => {
    if (reduceMotion.matches || timer || document.hidden) return;
    timer = setInterval(next, AUTOPLAY_MS);
  };
  const restart = () => {
    stop();
    start();
  };

  root.addEventListener('pointerenter', stop);
  root.addEventListener('pointerleave', start);
  root.addEventListener('focusin', stop);
  root.addEventListener('focusout', start);
  document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));

  // ---- Свайп / перетягування ----
  let startX = null;
  let moved = false;

  track.addEventListener('pointerdown', (event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    startX = event.clientX;
    moved = false;
  });

  track.addEventListener('pointerup', (event) => {
    if (startX === null) return;
    const dx = event.clientX - startX;
    startX = null;
    if (Math.abs(dx) < SWIPE_PX) return;
    moved = true;
    if (dx < 0) next();
    else prev();
    restart();
  });

  track.addEventListener('pointercancel', () => (startX = null));

  // Після свайпу не переходимо за посиланням картки
  track.addEventListener(
    'click',
    (event) => {
      if (moved) {
        event.preventDefault();
        moved = false;
      }
    },
    true,
  );

  render();
  start();
}
