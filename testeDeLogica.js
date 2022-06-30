const { createInterface } = require("readline");
const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

rl.question("Digite um texto breve: \n", (text) => {
  const phraseArray = text.split(" ");
  let answer = "";
  let count = 0;

  const containSpecialCharacter = (word) => {
    const specialCaracteres = new RegExp(/[^\w\s]/gi);
    return specialCaracteres.test(word);
  }; // Checa se há caracteres especiais na frase

  const containOnlyLowercase = (word) => {
    const textToArray = word.split(" ");
    let containsUppercase = false;
    for (let i in textToArray) {
      if (textToArray[i].match(/[A-Z]/)) {
        containsUppercase = true;
        break;
      }
    }
    return !containsUppercase;
  }; // Checa se há apenas letras minúsculas na frase

  const containMoreThanOneWord = (word) => {
    const textToArray = word.split(" ");
    return textToArray.length > 1;
  }; // Checa se há mais de uma palavra na frase

  const refectorPhrase = (phrase) => {
    for (let i in phraseArray) {
      let singleLetter = [];
      const word = phraseArray[i];
      let isDuplicated = true;
      for (let i in word) singleLetter.push(word.substring(word.length, i));
      for (let i in singleLetter) {
        if (word.split(singleLetter[i]).length - 1 == 2) {
          isDuplicated = true;
          let newWord = word.substring(0, word.length - singleLetter[i].length);
          answer !== "" ? (answer += ` ${newWord}`) : (answer = newWord);
          break;
        } else isDuplicated = false;
      }
      isDuplicated && count++;
    }
  };

  if (
      containSpecialCharacter(text)
      || containOnlyLowercase(text) === false
      || containMoreThanOneWord(text) === false
  ) {
    console.log(`Não foi possível refazer a frase.\nSaída: ${text}`);
  } else {
    refectorPhrase(phraseArray),
      (count !== phraseArray.length
        ? (answer = text += ".")
        : (answer = answer += "."),
      console.log(`A nova frase é:\n${answer}`));
  }

  rl.close();
});
