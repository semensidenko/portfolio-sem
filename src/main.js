import '@fontsource/inter/500.css';
import '@fontsource/inter/700.css';
import '@fontsource/urbanist/400.css';
import './style.css';
import { initI18n } from './i18n.js';
import { initTyping } from './typing.js';
import { initMenu } from './menu.js';
import { initCases } from './cases.js';
import { initEffects } from './effects.js';

initI18n();
initMenu();
initCases();
initTyping();
initEffects();
