import React, { useState } from 'react';
import './App.css';
import HTTP from './apis/http-common';

const App = () => {
  const googleBaseUrl = 'https://google.com/search?q=';
  const [googleUrl, setGoogle] = useState(googleBaseUrl);
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

  const setGoogleUrl = () => {
    let underscoreWord;
    if (word) {
      if (word.includes('robot genius')) {
        setGoogle('https://www.linkedin.com/in/keithmarshall/?originalSubdomain=uk')
      } else {
        underscoreWord = word.replace(/ /g, '+');
        setGoogle(`${googleBaseUrl}${underscoreWord}`);
      }
    }
  };

  return (
    <div className="app">
      <div className="container">
        <header></header>
        <main>
          <div>
            <button className="ui brown massive button" onClick={fetchWord}>New Word</button>
            <h1 onClick={setGoogleUrl}>
              <a href={googleUrl} rel="noopener noreferrer" target="_blank">
                {word}
              </a>
            </h1>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
