import { useContext, useMemo } from 'react';
import { Dialog, makeStyles, PaperProps } from '@material-ui/core';

import { ShopContext } from '../contexts/shop.context';
import { CartContext } from '../contexts/cart.context';

import { ProductList } from './product/list';
import { CartList } from './cart/list';
import { ProductCard } from './product/card';

const useDialogStyles = makeStyles({
  dialog: {
    position: 'absolute',
    paddingRight: '430px',
    boxSizing: 'border-box'
  }
});

export const Shop = () => {
  const shop = useContext(ShopContext);
  const cart = useContext(CartContext);

  const classes = useDialogStyles();

  const current = useMemo(() => shop?.products.find(i => i.id === shop?.currentId), [ shop?.products, shop?.currentId ]);

  const Paper = useMemo(() => {
    return current ? (props: PaperProps) => <ProductCard {...props} onBuy={id => shop?.add(id)} product={current} /> : () => <></>
  }, [ current?.id, shop?.add ]);

  if (!shop || !cart) {
    return null;
  }

  const dialog = useMemo(() => (
    <Dialog
      fullWidth={true}

      classes={{
        paper: cart.products.length ? classes.dialog : undefined
      }}
      
      maxWidth="xl"
      open={!!current}
      onClose={shop.close}
      PaperComponent={props => Paper(props)}
      aria-labelledby="max-width-dialog-title"
    />
  ), [ current?.id, cart.products.length ]);
  
  return (
    <>
      <div style={{ display: "flex", height: "100vh", padding: "2rem 0 2rem 2rem", boxSizing: "border-box", backgroundColor: "#eee" }}>
        <ProductList onCommand={shop.resetDemoTimer} style={{ transition: "all 200ms ease-out", filter: current ? "blur(10px)" : "none" }} products={shop.products} />
        
        <CartList products={cart.products.map(i => ({ product: shop.products.filter(j => j.id === i.id)[0], count: i.count }))} />
      </div>
        
      {dialog}
    </>
  )
}
