import './App.css';

import products from './products.json';

import { Shop } from './components/shop';

import { CartProvider } from './contexts/cart.context';
import { ShopProvider } from './contexts/shop.context';
import { SpeechProvider } from './contexts/speech.context';

import { useDB } from './hooks/useDB';

import { Product } from './types/product';

function App() {
  const db = useDB<Product>(products);

  return (
    <SpeechProvider>
      <CartProvider>
        <ShopProvider products={db}>
          <Shop />
        </ShopProvider>
      </CartProvider>
    </SpeechProvider>
  );
}

export default App;
