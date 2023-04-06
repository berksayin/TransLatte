// TODO: Debounce ve Throttle araştırılacak, uygun olana göre yapılacak.

import { apiCheck } from './API.js';
import { translateTheText } from './API.js';

// * ATAMALAR
const mainTextArea = document.getElementById('language-first');
const translatedTextArea = document.getElementById('language-second');
const switchLanguagesButton = document.getElementById('swap');
const languagesFirsts = document.getElementById('translate-from');
const languagesSeconds = document.getElementById('translate-to');

const languageList = [
  {
    languageAbbr: 'en',
    languageName: 'English',
    mainlanguageType: 'English',
  },
  {
    languageAbbr: 'tr',
    languageName: 'Turkish',
    mainlanguageType: 'Türkçe',
  },
];

// Selectbox dolduruluyor
languageList.map((languages, assignToSelectbox) => {
  const select = document.createElement('option');
  select.setAttribute('value', languages.languageAbbr);
  select.innerText = languages.languageName;
  languagesFirsts.append(select);
  languagesSeconds.innerHTML = languagesFirsts.innerHTML;
});

fixTheLanguages(); // * Başlangıçta diller aynı olmasın diye fonksiyon çağrılıyor.

// * EVENTLER
mainTextArea.addEventListener('input', getMainText);
switchLanguagesButton.addEventListener('click', switchLanguages);
languagesFirsts.addEventListener('change', fixTheLanguages);

// * FONKSİYONLAR

// * Fonksiyonla yaptım böylelikle önceden tanımlamam gerekmedi.
function getMainText(context) {
  // * context aslında 'e'.
  let mainText = context.target.value;
  console.log('mainText :>> ', mainText);

  updateDebounceText(mainText);

  //   apiCheck();
}

function debounce(cb, delay = 1000) {
  let timeout;

  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      cb(...args);
    }, delay);
  };
}

const updateDebounceText = debounce((text) => {
  translateTheText(text, languagesSeconds.value, languagesFirsts.value);
  translatedTextArea.value = translatedText;
}, 500);

// * Diller aynı olmasın diye sol ve sağı ayırıyor.
function fixTheLanguages() {
  languagesFirsts.value === 'en'
    ? (languagesSeconds.value = 'tr')
    : (languagesSeconds.value = 'en');

  // if (languagesFirsts.value === 'en') {
  //   languagesSeconds.value = 'tr';
  // } else {
  //   languagesSeconds.value = 'en';
  // }
}

// * Ortadaki değiştirme tuşu için
function switchLanguages() {
  let temp = languagesFirsts.value;
  languagesFirsts.value = languagesSeconds.value;
  languagesSeconds.value = temp;
}
