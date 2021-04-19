import { useEffect, useState } from 'react';
import './App.css';
import { useDB } from './hooks/useDB';
import { useSpeech } from './hooks/useSpeech';

import products from './products.json';

interface Product {
  id: string;
  name: string;
  cost: string;
  weight: string;
  category: string;
  age: string;
  description: string;
  textcolor: string;
  names: string[];
  img: string;
}

function App() {
  const [ showText, setShowText ] = useState(true);

  const speech = useSpeech();
  const db = useDB<Product>(products);

  const data: Product[] = products || db;

  const [ product, setProduct ] = useState<Product>(products[0]);

  useEffect(() => {
    console.log(speech);
    const target = data.find(i => i.names.find(j => speech?.results.find(k => k.indexOf(j) !== -1)));

    if (target) {
      setProduct(target);
    }
    
    if (speech?.final && speech?.results.find(i => i.indexOf('показать название') !== -1)) {
      setShowText(showText => !showText);
    }

  }, [ speech, db, setShowText, data ])

  return  (
    <div className="Block Column JustifySpace App" style={{ backgroundImage: `url(${product.img})` }}>
      {showText && (
        <>
          <div className="Block Column">
            <div className="Block JustifySpace">
              <div className="Block Name">{product.name}</div>
              <div className="Block Eighteen">18+</div>
            </div>
            
            <div className="Block JustifyEnd">
              <div className="Block Price">{product.cost}</div>
            </div>
          </div>

          <div className="Block JustifySpace AlignCenter">
            <div className="Block Desc">{product.description}</div>
            <div className="Block Weight">{product.weight}</div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
