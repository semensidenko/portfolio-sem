/*
  Слово «design.» з'являється по одній літері, ніби його друкують.
  Літери лишаються на своїх місцях (opacity, а не display), тому розкладка не стрибає.
  Без JS або з prefers-reduced-motion слово просто видно відразу.
*/
export function initTyping() {
  const word = document.querySelector('.hero__word');
  if (!word) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const text = word.textContent.trim();
  word.textContent = '';
  [...text].forEach((char, i) => {
    const span = document.createElement('span');
    span.className = 'hero__letter';
    span.style.setProperty('--i', i);
    span.textContent = char;
    word.appendChild(span);
  });
}
