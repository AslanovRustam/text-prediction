export function tokenize(texts) {
  const wordIndex = {};
  let index = 1;

  texts.forEach((text) => {
    const words = text.split(" ");
    words.forEach((word) => {
      if (!(word in wordIndex)) {
        wordIndex[word] = index++;
      }
    });
  });

  return wordIndex;
}

export function prepareData(texts, wordIndex) {
  const X = [];
  const y = [];

  texts.forEach((text) => {
    const words = text.split(" ");
    for (let i = 0; i < words.length - 1; i++) {
      X.push([wordIndex[words[i]]]);
      y.push(wordIndex[words[i + 1]]);
    }
  });

  return { X, y };
}
