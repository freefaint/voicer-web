import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Dialog, makeStyles, PaperProps } from '@material-ui/core';

import { ShopContext } from '../contexts/shop.context';
import { CartContext } from '../contexts/cart.context';

import { ProductList } from './product/list';
import { CartList } from './cart/list';
import { ProductCard } from './product/card';
import { Cart } from './cart/cart';
import { Result } from './cart/result';

const useDialogStyles = makeStyles({
  dialog: {
    position: 'absolute',
    right: '450px',
    width: 'calc(100vw - 520px)',
    boxSizing: 'border-box'
  }
});

export const Shop = () => {
  const [ openedCart, setOpenedCart ] = useState(false);
  const [ openedReady, setOpenedReady ] = useState<string>();

  const shop = useContext(ShopContext);
  const cart = useContext(CartContext);

  const classes = useDialogStyles();

  const current = useMemo(() => shop?.products.find(i => i.id === shop?.currentId), [ shop?.products, shop?.currentId ]);

  const Paper = useMemo(() => {
    return current && shop ? (props: PaperProps) => (
      <ProductCard
        {...props}
        cart={cart?.products}
        onCount={shop?.count}
        onBuy={(id, count) => shop?.add(id, count)}
        onRemove={id => shop?.remove(id)}
        onClose={shop?.close}
        product={current}
      />
    ) : () => <></>
  }, [current, cart, shop]);

  const handleOpenCart = useCallback(() => {
    setOpenedCart(true);
  }, [ setOpenedCart ]);

  const handleCloseCart = useCallback(() => {
    setOpenedCart(false);
  }, [ setOpenedCart ]);

  const handleCLoseReady = useCallback(() => {
    setOpenedReady(undefined);
  }, [setOpenedReady]);

  const handleOrder = useCallback(() => {
    const orderNumber = new Date().valueOf().toString().substr(6, 4);

    const data = cart?.products.map(i => ({ product: shop?.products.filter(j => j.id === i.id)[0], count: i.count }));
    const total = data?.map(i => i.count * parseInt(i.product!.cost)).reduce((a,b) => a + b, 0);

    fetch('/mail.php', { method: 'post', body: JSON.stringify({ order: orderNumber, data, total }) });

    shop?.clear();

    setOpenedReady(orderNumber);
  }, [ shop, cart ]);

  useEffect(() => {
    if (!cart?.products.length) {
      setOpenedCart(false);
    }
  }, [cart, cart?.products]);

  const dialog = useMemo(() => cart && shop && (
    <Dialog
      fullWidth={true}

      classes={{
        paper: cart.products.length ? classes.dialog : undefined
      }}
      
      maxWidth="xl"
      open={!!current}
      onClose={shop.close}
      PaperComponent={props => Paper(props)}
    />
  ), [cart, shop, classes.dialog, current, Paper]);

  const cartDialog = useMemo(() => cart && shop && (
    <Dialog
      fullWidth={true}
      maxWidth="xl"
      open={!!openedCart}
      onClose={handleCloseCart}
    >
      <Cart
        cart={cart.products.map(i => ({ product: shop.products.filter(j => j.id === i.id)[0], count: i.count }))}
        products={shop.products}

        onRemove={shop.remove}
        onCount={shop.count}
        onOrder={handleOrder}
        onClear={shop.clear}
        onClose={handleCloseCart}
      />
    </Dialog>
  ), [cart, shop, openedCart, handleCloseCart, handleOrder]);

  const readyDialog = useMemo(() => (
    <Dialog
      fullWidth={true}
      maxWidth="xl"
      open={!!openedReady}
      onClose={handleCLoseReady}
    >
      <Result
        code={openedReady + ''}
        onClose={handleCLoseReady}
      />
    </Dialog>
  ), [openedReady, handleCLoseReady]);

  if (!shop || !cart) {
    return null;
  }
  
  return (
    <>
      <div style={{ display: "flex", height: "100vh", padding: "2rem 0 2rem 2rem", boxSizing: "border-box", backgroundColor: "#eee" }}>
        <ProductList
          onCommand={shop.resetDemoTimer}
          onSelectProduct={shop.setCurrentId}
          style={{ transition: "all 200ms ease-out", filter: current || openedCart ? "blur(10px)" : "none" }}
          products={shop.products}
        />
        
        <CartList
          onClear={shop.clear}
          onOrder={handleOpenCart}
          style={{ transition: "all 200ms ease-out", filter: openedCart ? "blur(10px)" : "none" }}
          cart={cart.products.map(i => ({ product: shop.products.filter(j => j.id === i.id)[0], count: i.count }))}
        />
      </div>
        
      {dialog}
      {cartDialog}
      {readyDialog}
    </>
  )
}
