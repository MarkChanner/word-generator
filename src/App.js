import React, { useState } from 'react';
import './App.css';
import HTTP from './apis/http-common';

const App = () => {
  const wikiBaseUrl = 'https://en.wikipedia.org/wiki/';
  const [wikiUrl, setWiki] = useState(wikiBaseUrl);
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

  const setWikiUrl = () => {
    if (word) {
      const underscoreWord = word.replace(/ /g, '_');
      setWiki(`${wikiBaseUrl}${underscoreWord}`);
    }
  };

  return (
    <div className="app">
      <div className="container">
        <header></header>
        <main>
          <div>
            <button className="ui brown massive button" onClick={fetchWord}>New Word</button>
            <h1 onClick={setWikiUrl}>
              <a href={wikiUrl} rel="noopener noreferrer" target="_blank">
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
