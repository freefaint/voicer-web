import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Fab, PaperProps } from '@material-ui/core';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import CloseIcon from '@material-ui/icons/CloseRounded';
import RemoveIcon from '@material-ui/icons/Delete';

import { Product } from "../../types/product";
import { useCallback, useMemo, useState } from 'react';
import { Count } from '../count';

const useImageStyles = makeStyles({
  media: {
    height: 540,
  },
});

const useButtonStyles = makeStyles((theme: Theme) =>
  createStyles({
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  }),
);


interface Props {
  product: Product;
  cart?: { id: string, count: number }[];
  onBuy: (id: string, count: number) => void;
  onRemove: (id: string) => void;
  onCount: (id: string, count: number) => void;
  onClose?: () => void;
  onSave: (product: Product) => void;
}

export const ProductCard = ({ product, onBuy, onRemove, onCount, onClose, onPointerMove, cart, ref, ...rest }: Props & PaperProps) => {
  const [ countToAdd, setCountToAdd ] = useState(1);

  const imageClasses = useImageStyles();
  const buttonClasses = useButtonStyles();
  
  const handleBuy = useCallback(() => onBuy(product.id, countToAdd), [onBuy, product.id, countToAdd]);
  const handleRemove = useCallback(() => onRemove(product.id), [onRemove, product.id]);

  const countInCart = useMemo(() => cart?.find(i => i.id === product.id)?.count, [cart, product.id]);

  const setCount = useCallback((i: number) => {
    if (countInCart) {
      if (!i) {
        return onRemove(product.id);
      }

      onCount(product.id, i);
    } else {
      setCountToAdd(i);
    }
  }, [countInCart, onCount, product.id, onRemove]);

  return (
    <div {...rest} style={{ ...rest.style, margin: "2rem" }}>
      <Card>
        <CardMedia
          className={imageClasses.media}
          image={product.img}
          title={product.name}
          style={{
            padding: "20px",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Fab color="secondary" onClick={onClose}>
            <CloseIcon />
          </Fab>
        </CardMedia>
        
        <CardContent style={{ margin: "2rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ display: "flex", flexDirection: "column", flexBasis: "80%" }}>
              <Typography gutterBottom variant="h2" component="h1">
                {product.name}
              </Typography>
              <Typography variant="h6" component="p">
                {product.description}
              </Typography>
              <div style={{ marginTop: "16px" }}>
                <Typography variant="h4" color="error" component="span">
                  {product.cost}
                </Typography>
                <Typography variant="h4" color="textSecondary" component="span">
                  &nbsp;({product.weight})
                </Typography>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", alignItems: "flex-end", flexBasis: "20%" }}>
              <Typography variant="h6" component="p">
                {countInCart ? "У вас в корзине" : "Укажите количество"}
              </Typography>

              <Count count={countInCart || countToAdd} lockOnOne={!countInCart} onChange={setCount} />

              {!!countInCart && (
                <Fab color="secondary" variant="extended" onClick={handleRemove}>
                  <RemoveIcon className={buttonClasses.extendedIcon} />
                  Удалить
                </Fab>
              )}

              {!countInCart && (
                <Fab color="primary" variant="extended" onClick={handleBuy}>
                  <AddShoppingCartIcon className={buttonClasses.extendedIcon} />
                  Добавить
                </Fab>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
