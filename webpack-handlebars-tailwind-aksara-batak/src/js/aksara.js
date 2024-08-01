const SYLLABLE_REGEX = /[^aeiou]*[aeiou]([^aeiou]*$|ng(?=[^aeiou])|[^aeiou](?=[^aeiou]))?/gi;
const MULTI_CONSONANT_REGEX = /((ng|[^aeiou])?[aeiou](ng|[^aeiou])?)|[^aeiou]/gi;

const ANAK_NI_SURAT = {
  'i': '\\0069',
  'o': '\\006F',
  'e': '\\0065',
  'u': '\\203A',
  'ng': '\\005E'
}

const FUNCTUATION = {
  '\\': '\\005C',
  '\.': '\\002A'
}

const VOWEL_NO_VARIATION = {
  'a': '\\0061',
  'i': '\\0049',
  'u': '\\0055'
}

const VOWELS_WITH_VARIATION = {
  'a': '\\0061',
  'i': '\\0061 \\0069',
  'u': '\\0041',
  'o': '\\0061 \\006F',
  'e': '\\0061 \\0065'
}

const CONSONANTS_A = {
  'ha': '\\0068',
  'ka': '\\0068',
  'ma': '\\006D',
  'na': '\\006E',
  'ra': '\\0072',
  'ta': '\\0074',
  'sa': '\\0073',
  'da': '\\0064',
  'ga': '\\0067',
  'ja': '\\006A',
  'ba': '\\0062',
  'nga': '\\003C',
  'la': '\\006C',
  'pa': '\\0070',
  'wa': '\\0077',
  'ya': '\\0079',
}

const CONSONANTS_U = {
  'hu': '\\004B',
  'ku': '\\004B',
  'mu': '\\004D',
  'nu': '\\004E',
  'ru': '\\0052',
  'tu': '\\0054',
  'su': '\\0053',
  'du': '\\0044',
  'gu': '\\0047',
  'ju': '\\004A',
  'bu': '\\0042',
  'ngu': '\\003E',
  'lu': '\\004C',
  'pu': '\\0050',
  'wu': '\\0057',
  'yu': '\\0059'
}

const CONSONANTS_A_KEYS = Object.keys(CONSONANTS_A);
const CONSONANTS_U_KEYS = Object.keys(CONSONANTS_U);

function getSyllableUnicode(txt) {

  if (txt === '\.') {
    return FUNCTUATION['\.'];
  }

  // handle a, i, u
  if (Object.keys(VOWEL_NO_VARIATION).includes(txt)) {
    return VOWEL_NO_VARIATION[txt];
  }

  // handle e,o
  if (Object.keys(VOWELS_WITH_VARIATION).includes(txt)) {
    return VOWELS_WITH_VARIATION[txt];
  }

  // handle ang eng ong ...
  if (Object.keys(VOWELS_WITH_VARIATION).includes(txt.replace('ng', ''))) {
    return VOWELS_WITH_VARIATION[txt.replace('ng', '')] + ANAK_NI_SURAT['ng'];
  }

  // handle h,m,n ...
  if (CONSONANTS_A_KEYS.includes(txt + 'a')) {
    return CONSONANTS_A[txt + 'a'] + FUNCTUATION['\\'];
  }

  // handle ha ma na ...
  if (CONSONANTS_A_KEYS.includes(txt)) {
    return CONSONANTS_A[txt];
  }

  // handle hang mang nang ...
  if (CONSONANTS_A_KEYS.includes(txt.replace('ng', ''))) {
    return CONSONANTS_A[txt.replace('ng', '')] + ANAK_NI_SURAT['ng'];
  }

  // handle hu mu nu ...
  if (CONSONANTS_U_KEYS.includes(txt)) {
    return CONSONANTS_U[txt];
  }

  // handle hung mung nung ...
  if (CONSONANTS_U_KEYS.includes(txt.replace('ng', ''))) {
    return CONSONANTS_U[txt.replace('ng', '')] + ANAK_NI_SURAT['ng'];
  }

  // handle he me ne ...
  for (const ch of ['e', 'i', 'o']) {

    let key = txt.replace(ch, 'a');
    if (CONSONANTS_A_KEYS.includes(key)) {
      return CONSONANTS_A[key] + ANAK_NI_SURAT[ch];
    }

    key = key.replace('ng', '');
    if (txt.endsWith('ng') && CONSONANTS_A_KEYS.includes(key)) {
      return CONSONANTS_A[key] + ANAK_NI_SURAT[ch] + ANAK_NI_SURAT['ng'];
    }

  }

  // handle heng meng neng ...
  if (CONSONANTS_A_KEYS.includes(txt.replace('e', 'a'))) {
    return CONSONANTS_A[txt.replace('e', 'a')] + ANAK_NI_SURAT['ng'];
  }

  for (let i = 0; i < CONSONANTS_A_KEYS.length; i++) {
    for (let j = 0; j < CONSONANTS_A_KEYS.length; j++) {

      if (CONSONANTS_A_KEYS[i] + CONSONANTS_A_KEYS[j].slice(0, -1) === txt) {
        return CONSONANTS_A[CONSONANTS_A_KEYS[i]] + CONSONANTS_A[CONSONANTS_A_KEYS[j]] + FUNCTUATION['\\'];
      }

      for (const ch of ['e', 'i', 'o']) {
        if (CONSONANTS_A_KEYS[i].slice(0, -1) + ch + CONSONANTS_A_KEYS[j].slice(0, -1) === txt) {
          return CONSONANTS_A[CONSONANTS_A_KEYS[i]] + CONSONANTS_A[CONSONANTS_A_KEYS[j]] + ANAK_NI_SURAT[ch] + FUNCTUATION['\\'];
        }
      }

    }
  }

  for (let i = 0; i < CONSONANTS_A_KEYS.length; i++) {
      if ('a' + CONSONANTS_A_KEYS[i].slice(0, -1) === txt) {
        return VOWEL_NO_VARIATION['a'] + CONSONANTS_A[CONSONANTS_A_KEYS[i]] + FUNCTUATION['\\'];
      }
  }

  for (let i = 0; i < CONSONANTS_U_KEYS.length; i++) {
    if ('u' + CONSONANTS_U_KEYS[i].slice(0, -1) === txt) {
      return VOWEL_NO_VARIATION['a'] + CONSONANTS_U[CONSONANTS_U_KEYS[i]] + FUNCTUATION['\\'];
    }
}

  for (let i = 0; i < CONSONANTS_A_KEYS.length; i++) {
    for (const ch of ['e', 'i', 'o']) {
      if (ch + CONSONANTS_A_KEYS[i].slice(0, -1) === txt) {
        return VOWEL_NO_VARIATION['a'] + CONSONANTS_A[CONSONANTS_A_KEYS[i]] + ANAK_NI_SURAT[ch] + FUNCTUATION['\\'];
      }
    }
  }

  for (let i = 0; i < CONSONANTS_A_KEYS.length; i++) {
    for (let j = 0; j < CONSONANTS_U_KEYS.length; j++) {

      if (CONSONANTS_A_KEYS[i].slice(0, -1) + 'u' + CONSONANTS_U_KEYS[j].slice(0, -1) === txt) {
        return CONSONANTS_A[CONSONANTS_A_KEYS[i]] + CONSONANTS_U[CONSONANTS_U_KEYS[j]] + FUNCTUATION['\\'];
      }

    }
  }

  return txt;
}

function getSyllables(word) {
  let arr = [];
  word = word.trim().toLowerCase();
  let syllables = word.match(SYLLABLE_REGEX);


  if (syllables === null) {
    syllables = word.match(MULTI_CONSONANT_REGEX);
    if (syllables === null) {
      return arr;
    }
  }


  syllables.forEach(syllable => {
    let multiConsonants = syllable.match(MULTI_CONSONANT_REGEX);

    if (multiConsonants.length === 1) {
      arr.push(syllable);
    } else {
      arr = arr.concat(multiConsonants);
    }

  });

  return arr;
}

function convert(str) {

  var result = [];

  if (str) {
    let words = str.split(/\s*\b\s*/);

    words.forEach((word) => {
      let unicodes = [];
      let syllables = getSyllables(word);

      syllables.forEach(syllable => {
        let input = {};
        input[syllable] = getSyllableUnicode(syllable);
        unicodes.push(input);
      })

      result.push({ word, unicodes });

    });

  }

  return result;
}

function getUnicode(str) {
  let unicodes = [];

  if (str) {
    let words = str.split(/\s*\b\s*/);
    words.forEach((word) => {
      let syllables = getSyllables(word);

      syllables.forEach(syllable => {
        unicodes += getSyllableUnicode(syllable);
      })

      unicodes += ' ';
    });

  }

  return unicodes;
}

function convertToAksaraBatak(inputTxt, outputEl) {
  if (inputTxt && outputEl) {
    inputTxt = inputTxt.replaceAll('-', '');
    let lines = inputTxt.split(/\r?\n/);
    outputEl.innerHTML = '';


    for (let i = 0; i < lines.length; i++) {

      let aksaraLine = document.createElement('div');
      aksaraLine.classList.add("aksara-line");

      let result = convert(lines[i]);
      for (let j = 0; j < result.length; j++) {

        let aksaraBox = document.createElement('div');
        aksaraBox.classList.add("flex");
        aksaraBox.classList.add("flex-wrap");
        aksaraBox.classList.add("font-batak");

        let aksaraText = document.createElement('div');
        aksaraText.classList.add("aksara-text");
        aksaraText.innerHTML = result[j].word;

        let aksaraWord = document.createElement('div');
        aksaraWord.classList.add("aksara-word");
        aksaraWord.append(aksaraBox);
        aksaraWord.append(aksaraText);

        aksaraLine.append(aksaraWord);

        for (let k = 0; k < result[j].unicodes.length; k++) {
          let unicode = result[j].unicodes[k];
          for (const [key, value] of Object.entries(unicode)) {
            let aksaraGlyph = document.createElement('span');
            aksaraGlyph.style.setProperty('--content', `'${value}'`);
            
            if(key === value){
              aksaraGlyph.classList.add("aksara-notexist");
            }else{
              aksaraGlyph.classList.add("font-batak");
              aksaraGlyph.classList.add("text-2xl");
            }

            aksaraBox.append(aksaraGlyph);
          }
        }
      }

      outputEl.append(aksaraLine);
    }

  }
}

module.exports = {
  convertToAksaraBatak,
  getUnicode
}
