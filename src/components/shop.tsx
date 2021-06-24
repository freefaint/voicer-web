import { useCallback, useContext, useEffect, useMemo, useState } from 'react';

import * as OrderService from '../rest/order';

import { ShopContext } from '../contexts/shop.context';
import { CartContext } from '../contexts/cart.context';

import { ProductList } from './product/list';
import { CartList } from './cart/list';
import { ProductCard } from './product/card';
import { Cart } from './cart/cart';
import { Result } from './cart/result';
import { Product } from '../types/product';
import { Demo } from './demo';

interface Props {
  onLogout: () => void;
  onClearSelectedUser?: () => void;
  admin?: boolean;
}

export const Shop = ({ admin, onLogout, onClearSelectedUser }: Props) => {
  const [openedCart, setOpenedCart] = useState(false);
  const [openedReady, setOpenedReady] = useState<number>();

  const shop = useContext(ShopContext);
  const cart = useContext(CartContext);

  const current = useMemo(() => shop?.products.find(i => i._id === shop?.currentId), [shop?.products, shop?.currentId]);

  const [fresh, setFresh] = useState<Product>();

  const handleAdd = useCallback(() => {
    setFresh({
      "name": "",
      "cost": "",
      "weight": "",
      "category": "",
      "age": "",
      "id": "",
      "description": "",
      "textcolor": "",
      "names": [],
      "img": ""
    });
  }, [setFresh]);

  const handleClose = useCallback(() => {
    shop?.close();
    setFresh(undefined);
  }, [shop, setFresh]);

  const handleSave = useCallback((product: Product) => {
    if (product._id) {
      shop?.editDB(product);
    } else {
      shop?.addDB(product);
    }
  }, [shop]);

  const handleOpenCart = useCallback(() => {
    setOpenedCart(true);
  }, [setOpenedCart]);

  const handleCloseCart = useCallback(() => {
    setOpenedCart(false);
  }, [setOpenedCart]);

  const handleCLoseReady = useCallback(() => {
    setOpenedReady(undefined);
  }, [setOpenedReady]);

  const handleOrder = useCallback((ssoboi?: boolean) => {
    const date = new Date().toISOString();
    const orderNumber = parseInt(new Date().valueOf().toString().substr(6, 4), 10);

    const data = cart?.products.map(i => ({ product: shop?.products.filter(j => j._id === i.id)[0], count: i.count }));
    const total = data?.map(i => i.count * parseInt(i.product!.cost)).reduce((a, b) => a + b, 0);

    if (!data?.length) {
      return;
    }

    OrderService.addItem({
      orderNumber,
      date,
      total: total || 0,
      products: data!.map(i => ({
        ...i.product!,
        cost: parseInt(i.product!.cost, 10),
        count: i.count
      }))
    }).then(() => {
      shop?.clear();

      setOpenedReady(orderNumber);

      fetch('https://voice.be-at.ru/mail.php', { method: 'post', body: JSON.stringify({ order: orderNumber, data, total, ssoboi: ssoboi ? 1 : 0 }) });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(cart?.products)]);

  useEffect(() => {
    if (!cart?.products.length) {
      setOpenedCart(false);
    }
  }, [cart, cart?.products]);

  if (!shop || !cart) {
    return null;
  }

  return (
    <div style={{ display: "flex", height: "100vh", padding: "2rem 0 2rem 2rem", boxSizing: "border-box", backgroundColor: "#eee" }}>
      {(current || fresh) && !openedCart && !openedReady && !shop.demo && (
        <ProductCard
          admin={admin}
          cart={cart?.products}
          onCount={shop?.count}
          onBuy={(id, count) => shop?.add(id, count)}
          onRemove={id => shop?.remove(id)}
          onDelete={product => shop?.removeDB(product)}
          onClose={handleClose}
          onSave={handleSave}
          product={(fresh || current)!}
        />
      )}

      <ProductList
        style={{ display: !current && !fresh && !openedCart && !shop.demo && !openedReady ? "flex" : "none" }}
        onCommand={shop.resetDemoTimer}
        onSelectProduct={shop.setCurrentId}
        products={shop.products}
        admin={admin}
        onLogout={onClearSelectedUser || onLogout}
        onAdd={handleAdd}
        onUpload={shop.uploadDB}
        onRemove={shop.removeDB}
        onClear={shop.clearDB}
      />

      {openedCart && !openedReady && !shop.demo && (
        <Cart
          cart={cart.products.map(i => ({ product: shop.products.filter(j => j._id === i.id)[0], count: i.count }))}
          products={shop.products}
  
          onRemove={shop.remove}
          onCount={shop.count}
          onOrder={handleOrder}
          onClear={shop.clear}
          onClose={handleCloseCart}
        />
      )}

      {!!cart.products.length && !openedCart && !openedReady && !shop.demo && (
        <CartList
          onClear={shop.clear}
          onOrder={handleOpenCart}
          cart={cart.products.map(i => ({ product: shop.products.filter(j => j._id === i.id)[0], count: i.count }))}
        />
      )}

      {!!openedReady && !shop.demo && (
        <Result
          code={openedReady + ''}
          onClose={handleCLoseReady}
        />
      )}

      {!!shop.demo && (
        <Demo onClick={shop.resetDemoTimer} />
      )}
    </div>
  )
}
