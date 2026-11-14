/*
  Перемикач UA/EN. Тексти пишуться українською (вони ж лежать у HTML як запасний
  варіант), англійська версія — у словнику нижче. Вибір мови зберігається в
  localStorage.
*/

const STORAGE_KEY = 'lang';
const DEFAULT_LANG = 'uk';

const dictionary = {
  uk: {
    'meta.title': 'Семен Сіденко — UI/UX-дизайнер',
    'meta.description':
      'Проєктую дизайн лендінгів і сайтів, які з першого екрана виглядають так, що бізнесу довіряють.',
    'nav.label': 'Основна навігація',
    'menu.label': 'Меню',
    'nav.works': 'Роботи',
    'nav.packages': 'Пакети',
    'nav.process': 'Процес',
    'nav.about': 'Про мене',
    'nav.contact': 'Контакти',
    'about.name': 'Семен Сіденко',
    'about.role': '<strong>UI/UX-дизайнер, 2+</strong> років досвіду',
    'about.works': 'Дивитися роботи',
    'pitch.title': 'Дизайн сайтів для бізнесу',
    'pitch.body':
      'Проєктую дизайн лендінгів та сайтів для бізнесу, де вигляд визначає довіру клієнтів:<br />Так ваш бренд переконує вже з першого екрана.',
    'cta.label': 'Розповісти про проект',
    'case.fwd': 'FWD — сайт креативної студії',
    'case.aethra': 'AETHRA ONE — сайт електромобіля',
    'lang.button': 'UA',
    'lang.label': 'Змінити мову на англійську',
  },
  en: {
    'meta.title': 'Semen Sidenko — UI/UX designer',
    'meta.description':
      'I design landing pages and websites that look trustworthy from the very first screen.',
    'nav.label': 'Main navigation',
    'menu.label': 'Menu',
    'nav.works': 'Works',
    'nav.packages': 'Packages',
    'nav.process': 'Process',
    'nav.about': 'About me',
    'nav.contact': 'Contacts',
    'about.name': 'Semen Sidenko',
    'about.role': '<strong>UI/UX designer, 2+</strong> years of experience',
    'about.works': 'View works',
    'pitch.title': 'Website design for business',
    'pitch.body':
      'I design landing pages and websites for businesses where appearance builds client trust:<br />That way your brand convinces from the very first screen.',
    'cta.label': 'Discuss your project',
    'case.fwd': 'FWD — creative studio website',
    'case.aethra': 'AETHRA ONE — electric car website',
    'lang.button': 'EN',
    'lang.label': 'Switch language to Ukrainian',
  },
};

function readStoredLang() {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value in dictionary ? value : null;
  } catch {
    return null;
  }
}

function storeLang(lang) {
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    // localStorage може бути недоступним (приватний режим) — мова просто не збережеться
  }
}

function applyLang(lang) {
  const t = dictionary[lang];
  document.documentElement.lang = lang;
  document.title = t['meta.title'];
  document
    .querySelector('meta[name="description"]')
    ?.setAttribute('content', t['meta.description']);

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    el.textContent = t[el.dataset.i18n];
  });
  document.querySelectorAll('[data-i18n-html]').forEach((el) => {
    el.innerHTML = t[el.dataset.i18nHtml];
  });
  document.querySelectorAll('[data-i18n-alt]').forEach((el) => {
    el.setAttribute('alt', t[el.dataset.i18nAlt]);
  });
  document.querySelectorAll('[data-i18n-aria-label]').forEach((el) => {
    el.setAttribute('aria-label', t[el.dataset.i18nAriaLabel]);
  });

  const toggle = document.querySelector('[data-lang-toggle]');
  if (toggle) {
    toggle.textContent = t['lang.button'];
    toggle.setAttribute('aria-label', t['lang.label']);
  }
}

export function initI18n() {
  let lang = readStoredLang() ?? DEFAULT_LANG;
  applyLang(lang);

  document.querySelector('[data-lang-toggle]')?.addEventListener('click', () => {
    lang = lang === 'uk' ? 'en' : 'uk';
    storeLang(lang);
    applyLang(lang);
  });
}
