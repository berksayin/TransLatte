export async function translateTheText(text, targetLanguage, language) {
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

  try {
    const response = await fetch(
      'https://google-translate1.p.rapidapi.com/language/translate/v2',
      options
    );
    const data = await response.json();
    const translatedText = data.data.translations[0].translatedText;
    console.log('newData :>> ', translatedText);
  } catch (err) {
    console.log('err :>> ', err);
  }
}

export function setTheTranslatedText() {
  // TODO: Buraya yazılan fonksiyon ile değer atanıp gönderilecek.
}

// TODO: Async Await'e uygun hale getirilecek
// TODO: Dönen değer ikinci kısma yazdırılacak, değeri alamıyorum.
