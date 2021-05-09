import { useContext, useMemo, useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';

import { useCommand } from '../hooks/useCommand';

import { ShopContext } from '../contexts/shop.context';
import { CartContext } from '../contexts/cart.context';

import { ProductCard as OldProductCard } from './old/product-card';
import { ProductList } from './product/list';
import { CartList } from './cart/list';
import { ProductCard } from './product/card';

export const Shop = () => {
  const [ oldShop, setOldShop ] = useState(true);

  const shop = useContext(ShopContext);
  const cart = useContext(CartContext);

  useCommand('старый вариант', () => {
    setOldShop(true);
  });

  useCommand('новый вариант', () => {
    setOldShop(false);
  });

  const paper = useMemo(() => shop?.current ? <ProductCard product={shop.current} /> : <></>, [ shop?.current ]);

  if (!shop || !cart) {
    return null;
  }

  if (oldShop) {
    return shop.current ? (
      <OldProductCard product={shop.current} showText={oldShop} />
    ) : null;
  }
  
  return (
    <>
      <div style={{ display: "flex", height: "100vh", padding: "2rem 0 2rem 2rem", boxSizing: "border-box", backgroundColor: "#eee", transition: "all 200ms ease-out", filter: shop.current ? "blur(20px)" : "none" }}>
        <ProductList products={shop.products} />
        
        <CartList products={cart.products.map(i => ({ product: shop.products.filter(j => j.id === i.id)[0], count: i.count }))} />
      </div>
        
      <Dialog
        fullWidth={true}
        maxWidth="xl"
        open={!!shop.current}
        onClose={shop.clear}
        PaperComponent={() => paper}
        aria-labelledby="max-width-dialog-title"
      />
    </>
  )
}
