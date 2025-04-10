import React, { useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import { tokenize, prepareData } from "./utils/tokenize";

const texts = [
  "the cat sat on the mat",
  "the dog sat on the log",
  "the bird flew over the trees",
  "the cat chased the mouse",
];

function App() {
  const [model, setModel] = useState(null);
  const [generatedText, setGeneratedText] = useState("");

  useEffect(() => {
    async function loadModel() {
      const wordIndex = tokenize(texts);
      const { X, y } = prepareData(texts, wordIndex);

      // Data verification
      console.log("X:", X);
      console.log("y:", y);

      // Transforming data into tensors
      const X_tensor = tf.tensor2d(X, [X.length, 1]); // Convert to 2D
      const y_tensor = tf.tensor2d(y, [y.length, 1]); // Convert to 2D

      // Creating a model
      const model = tf.sequential();
      model.add(
        tf.layers.embedding({
          inputDim: Object.keys(wordIndex).length + 1,
          outputDim: 64,
          inputLength: 1,
        })
      );
      model.add(tf.layers.lstm({ units: 8 })); // Reducing the number of neurons
      model.add(
        tf.layers.dense({
          units: Object.keys(wordIndex).length + 1,
          activation: "softmax",
        })
      );

      model.compile({
        optimizer: "adam",
        loss: "sparseCategoricalCrossentropy",
        metrics: ["accuracy"],
      });

      try {
        // Model training
        await model.fit(X_tensor, y_tensor, { epochs: 5 });
        setModel(model);
        console.log("The model is trained!");
      } catch (error) {
        console.error("Error while training the model:", error);
      }
    }

    loadModel();
  }, []);

  const generateText = (seedText, numWords) => {
    if (!model) return;

    const wordIndex = tokenize(texts); // Using a dictionary to transform
    let inputSeq = seedText.split(" ").map((word) => wordIndex[word]);
    let generatedText = seedText;

    for (let i = 0; i < numWords; i++) {
      const inputTensor = tf.tensor(inputSeq);
      const prediction = model.predict(inputTensor);
      const predictedIndex = prediction.argMax(-1).dataSync()[0];

      // Find a word by index
      const predictedWord = Object.keys(wordIndex).find(
        (key) => wordIndex[key] === predictedIndex
      );

      generatedText += " " + predictedWord;
      inputSeq.push(predictedIndex);
    }

    setGeneratedText(generatedText);
  };

  return (
    <div className="App">
      <h1>Text Generation with TensorFlow.js</h1>
      <input
        type="text"
        id="inputText"
        placeholder="Введите начальный текст"
        onChange={(e) => generateText(e.target.value, 5)}
      />
      <p>Generated text:</p>
      <p>{generatedText}</p>
    </div>
  );
}

export default App;
