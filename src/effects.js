/*
  Ефекти від руху мишки на першому екрані (лише для миші й тачпада,
  вимкнені при prefers-reduced-motion):
  - літери слова «design.» піднімаються хвилею біля курсору;
  - фото трохи нахиляється в бік курсору.
*/
export function initEffects() {
  const hero = document.querySelector('.hero');
  const word = document.querySelector('.hero__word');
  const portrait = document.querySelector('.portrait');
  if (!hero || !word || !portrait) return;

  const canHover = window.matchMedia('(hover: hover) and (pointer: fine)');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!canHover.matches || reduceMotion.matches) return;

  const wideLayout = window.matchMedia('(min-width: 1100px)');

  const reset = () => {
    word.querySelectorAll('.hero__letter').forEach((letter) => (letter.style.top = ''));
    portrait.style.transform = '';
  };

  const onMove = (event) => {
    if (event.pointerType !== 'mouse') return;
    const { clientX: x, clientY: y } = event;

    // Хвиля літер: найвище піднімається літера найближча до курсору
    const wordRect = word.getBoundingClientRect();
    const size = parseFloat(getComputedStyle(word).fontSize);
    const insideWord = y > wordRect.top + size * 0.15 && y < wordRect.bottom;
    word.querySelectorAll('.hero__letter').forEach((letter) => {
      const rect = letter.getBoundingClientRect();
      const distance = Math.abs(x - (rect.left + rect.width / 2)) / (size * 0.55);
      const lift = insideWord ? Math.max(0, 1 - distance) : 0;
      letter.style.top = lift ? `${-lift * lift * size * 0.07}px` : '';
    });

    // Нахил фото (на вузьких екранах фото маленьке, тож без нахилу)
    if (wideLayout.matches) {
      const nx = (x / window.innerWidth) * 2 - 1;
      const ny = (y / window.innerHeight) * 2 - 1;
      portrait.style.transform = `perspective(900px) rotateY(${nx * 9}deg) rotateX(${-ny * 9}deg)`;
    } else {
      portrait.style.transform = '';
    }
  };

  window.addEventListener('pointermove', onMove);
  document.addEventListener('pointerleave', reset);
}
