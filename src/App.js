import React, { useState } from 'react';
import './App.css';
import HTTP from './apis/http-common';

const App = () => {
  const [word, setWord] = useState('');
  const [usedWords, setUsedWords] = useState([]);

  const fetchWord = () => {
    HTTP.get()
      .then(response => {
        const newWord = response.data;

        if (usedWords.includes(newWord)) {
          fetchWord();
        } else {
          setWord(newWord);
          setUsedWords([...usedWords, newWord]);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div className="app">
      <div className="container">
        <header></header>
        <main>
          <div>
            <button onClick={fetchWord}>New Word</button>
            <h1>{word}</h1>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
