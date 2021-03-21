import { useEffect, useState } from 'react';
import './App.css';

import products from './prods.json';

interface Product {
  name: string;
  names: string[];
  img: string;
}

function useSpeech() {
  const [ result, setResult ] = useState<{ results: string[], final: boolean }>();

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
      
      setResult({ results, final: e.results[0].isFinal });
      console.log(results);
    }

    voice.onend = () => {
      console.log('end');

      setTimeout(() => voice.start(), 100);
    }

    voice.start();
  }, []);

  return result;
}

function useServicePulse() {
  const [ db, setDb ] = useState<Product[]>();

  useEffect(() => {
    setInterval(async () => {
      try {
        setDb(await fetch('/products.json').then(resp => resp.json()));
      } catch (e) {
        console.log('no data');
      }
    }, 10000);
  }, []);

  return db;
}

function App() {
  const [ name, setName ] = useState<string>('');
  const [ img, setImg ] = useState<string>();
  const [ showText, setShowText ] = useState(true);

  const speech = useSpeech();
  const db = useServicePulse()

  const data = products || db;

  useEffect(() => {
    console.log(speech);
    const prod = data.find(i => i.names.find(j => speech?.results.find(k => k.indexOf(j) !== -1)));

    if (prod) {
      setName(prod.name);
      setImg(prod.img);
    }
    
    if (speech?.results.find(i => i.indexOf('показать текст') !== -1)) {
      setShowText(!showText);
    }

  }, [ speech, db ])

  return  (
    <div className="App" style={{ backgroundImage: `url(${img})` }}>
      {showText ? name : ''}
    </div>
  );
}

export default App;
