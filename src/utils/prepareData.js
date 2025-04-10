export function prepareData(texts, wordIndex) {
  const X = [];
  const y = [];

  texts.forEach((text) => {
    const words = text.split(" ");
    for (let i = 0; i < words.length - 1; i++) {
      X.push(wordIndex[words[i]]);
      y.push(wordIndex[words[i + 1]]);
    }
  });

  return { X, y };
}
