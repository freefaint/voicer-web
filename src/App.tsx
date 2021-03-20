/* eslint-disable import/no-webpack-loader-syntax */
import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

import products from './prods.json';

const check = (results: string[]) => {
  
}

function App() {
  // const [ text, setText ] = useState<string | undefined>();
  const [ name, setName ] = useState<string>('');
  const [ img, setImg ] = useState<string>(logo);
  const [ result, setResult ] = useState<string>('');

  useEffect(() => {
    // @ts-ignore
    const voice = new webkitSpeechRecognition();

    voice.lang = 'ru-RU';
    voice.continious = true;
    voice.interimResults = true;

    voice.onerror = (err: any) => {
      console.log('error', err);
    }

    voice.onresult = (e: any) => {
      const results = Object.keys(e.results[0]).filter(i => parseInt(i, 10).toString() === i).map(i => e.results[0][i].transcript);
      
      // check(results);
      setResult(results[0]);
      console.log(results);
    }

    voice.onend = () => {
      console.log('end');

      setTimeout(() => voice.start(), 100);
    }

    voice.start();
  }, []);

  useEffect(() => {
    const prod = products.find(i => i.names.find(j => result.indexOf(j) !== -1));

    if (prod) {
      setName(prod.name);
      setImg(prod.img);
    }

  }, [ result ])

  return (
    <div className="App">
      <header className="App-header">
        <img src={img} className="App-logo" alt="logo" />
        <pre>
          {name}
        </pre>
      </header>
    </div>
  );
}

export default App;
