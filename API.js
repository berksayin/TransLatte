export function apiCheck() {
  console.log('API called!');
}

export function translateTheText(text, targetLanguage, language) {
  const encodedParams = new URLSearchParams();
  encodedParams.append('q', text);
  encodedParams.append('target', targetLanguage);
  encodedParams.append('source', language);

  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'Accept-Encoding': 'application/gzip',
      'X-RapidAPI-Key': '0624dce8dbmsh1d87739cb145dffp160ae2jsn0fe66216d8f1',
      'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com',
    },
    body: encodedParams,
  };

  const translatedText = fetch('https://google-translate1.p.rapidapi.com/language/translate/v2', options)
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));

  console.log('translatedText :>> ', translatedText);
}

// TODO: Async Await'e uygun hale getirilecek
// TODO: Dönen değer ikinci kısma yazdırılacak, değeri alamıyorum.
