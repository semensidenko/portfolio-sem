/*
  Бургер-меню для телефона й планшета (нижче 1100px, див. style.css).
  Кнопка відкриває й закриває список посилань; меню закривається по кліку
  на посилання, по Escape і коли вікно розширюється до десктопного розміру.
*/
const DESKTOP_QUERY = '(min-width: 1100px)';

export function initMenu() {
  const header = document.querySelector('.hero__header');
  const toggle = document.querySelector('[data-menu-toggle]');
  if (!header || !toggle) return;

  const setOpen = (open) => {
    header.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
  };

  toggle.addEventListener('click', () => {
    setOpen(toggle.getAttribute('aria-expanded') !== 'true');
  });

  header.querySelectorAll('.nav a').forEach((link) => {
    link.addEventListener('click', () => setOpen(false));
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setOpen(false);
      toggle.focus();
    }
  });

  window.matchMedia(DESKTOP_QUERY).addEventListener('change', (event) => {
    if (event.matches) setOpen(false);
  });
}
