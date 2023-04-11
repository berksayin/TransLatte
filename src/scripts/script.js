// TODO: Debounce ve Throttle araştırılacak, uygun olana göre yapılacak.

import { translateTheText, currentTranslatedText } from './services/translateService.js';
import { languageList, defaultDebounceTime } from '../constants/constants.js';

// * ATAMALAR
const mainTextArea = document.getElementById('language-first');
const translatedTextArea = document.getElementById('language-second');
const switchLanguagesButton = document.getElementById('swap');
const languagesFirsts = document.getElementById('translate-from');
const languagesSeconds = document.getElementById('translate-to');
// * EVENTLER
mainTextArea.addEventListener('input', getMainText);
switchLanguagesButton.addEventListener('click', switchLanguages);
languagesFirsts.addEventListener('change', fixTheLanguages);

// * Diller aynı olmasın diye sol ve sağı ayırıyor.
function fixTheLanguages() {
  languagesFirsts.value === 'en' ? (languagesSeconds.value = 'tr') : (languagesSeconds.value = 'en');
}
// Selectbox dolduruluyor
languageList.map((languages) => {
  const select = document.createElement('option');
  select.setAttribute('value', languages.languageAbbr);
  select.innerText = languages.languageName;
  languagesFirsts.append(select);
  languagesSeconds.innerHTML = languagesFirsts.innerHTML;
});

(() => {
  fixTheLanguages();
})();
// * Fonksiyonla yaptım böylelikle önceden tanımlamam gerekmedi.
function getMainText(element) {
  const mainText = element.target.value;
  updateDebounceText(mainText);
}

function debounce(cb, delay = defaultDebounceTime) {
  let timeout;

  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      cb(...args);
    }, delay);
  };
}

const updateDebounceText = debounce(async (text) => {
  await translateTheText(text, languagesSeconds.value, languagesFirsts.value);
  translatedTextArea.value = currentTranslatedText; // TODO
}, 500);

// * Ortadaki değiştirme tuşu için
function switchLanguages() {
  let temp = languagesFirsts.value;
  languagesFirsts.value = languagesSeconds.value;
  languagesSeconds.value = temp;
}
