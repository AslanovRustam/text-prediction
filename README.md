## Text Prediction with TensorFlow.js and React

This is a simple text prediction application built using React and TensorFlow.js. The app uses an LSTM model to predict the next word in a given text sequence. The model is trained on a small dataset of sentences and generates predictions based on a given seed text.

### Features

Text generation based on a starting sentence.

Built using React for the frontend and TensorFlow.js for training and inference.

The model is trained in the browser using a small dataset for demonstration purposes.

Supports dynamic text generation as the user types.

### Technologies Used

React: A JavaScript library for building user interfaces.

TensorFlow.js: A JavaScript library for training and running machine learning models directly in the browser.

JavaScript (ES6+)

## Setup Instructions

1.  Clone the repository

    ```bash
    git clone https://github.com/AslanovRustam/text-prediction.git
    cd text-prediction
    ```

2.  Install dependencies
    Make sure you have Node.js and npm installed. Then, run the following command to install the required dependencies:

    ```bash
    npm install
    ```

3.  Start the development server
    After the installation is complete, start the development server using the following command:
    ```bash
    npm run dev
    ```

Your app will be running on http://localhost:5173.

## How It Works

Training the Model:

A small dataset of text is tokenized, and the words are converted into numerical indices.

An LSTM model is used to predict the next word in a sentence based on previous words.

Text Prediction:

When the user types a starting sentence, the model predicts the next word in the sequence.

The model generates a prediction word by word until the desired length is reached.

Model Architecture:

Embedding Layer: Converts words into dense vectors.

LSTM Layer: Processes the sequence of words and learns patterns.

Dense Layer: Outputs a probability distribution for each word in the vocabulary.

## Example Use

Open the application at http://localhost:5173.

Type a sentence (e.g., "the cat") into the input field.

The app will generate and display a continuation of the sentence based on the trained model.
