/* eslint-disable import/no-webpack-loader-syntax */
import React, { useEffect, useState } from 'react';
import './App.css';

import products from './prods.json';

interface Product {
  name: string;
  names: string[];
  img: string;
}

const refresh = async (): Promise<Product[]> => {
  return fetch('/products.json').then(resp => resp.json())
}

function App() {
  // const [ text, setText ] = useState<string | undefined>();
  const [ name, setName ] = useState<string>('');
  const [ img, setImg ] = useState<string>();
  const [ result, setResult ] = useState<string>('');
  const [ db, setDb ] = useState<Product[]>(products);
  const [ showText, setShowText ] = useState(true);

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

    setInterval(async () => {
      try {
        const data = await refresh();

        setDb(data);
      } catch (e) {
        console.log('no data');
      }
    }, 10000);
  }, []);

  useEffect(() => {
    const prod = db.find(i => i.names.find(j => result.indexOf(j) !== -1));

    if (prod) {
      setName(prod.name);
      setImg(prod.img);
    }
    
    if (result.indexOf('показать текст') !== -1) {
      setShowText(!showText);
    }

  }, [ result, db ])

  return  (
    <div className="App" style={{ backgroundImage: `url(${img})` }}>
      {showText ? name : ''}
    </div>
  );
}

export default App;
