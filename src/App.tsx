import { useEffect, useState } from 'react';
import './App.css';
import { useDB } from './hooks/useDB';
import { useSpeech } from './hooks/useSpeech';

import products from './products.json';

// interface Product {
//   name: string;
//   names: string[];
//   img: string;
// }

function App() {
  const [ name, setName ] = useState<string>('');
  const [ img, setImg ] = useState<string>();
  const [ showText, setShowText ] = useState(true);

  const speech = useSpeech();
  const db = useDB(products)

  const data = products || db;

  useEffect(() => {
    console.log(speech);
    const prod = data.find(i => i.names.find(j => speech?.results.find(k => k.indexOf(j) !== -1)));

    if (prod) {
      setName(prod.name);
      setImg(prod.img);
    }
    
    if (speech?.results.find(i => i.indexOf('показать текст') !== -1)) {
      setShowText(showText => !showText);
    }

  }, [ speech, db, setShowText, data ])

  return  (
    <div className="App" style={{ backgroundImage: `url(${img})` }}>
      {showText ? name : ''}
    </div>
  );
}

export default App;
