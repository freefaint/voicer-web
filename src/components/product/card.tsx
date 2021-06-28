import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Button, Fab, FormControl, TextField } from '@material-ui/core';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import CloseIcon from '@material-ui/icons/CloseRounded';
import RemoveIcon from '@material-ui/icons/Delete';

import { Product } from "../../types/product";
import { ChangeEvent, FormEvent, useCallback, useMemo, useState } from 'react';
import { Count } from '../count';

const useImageStyles = makeStyles({
  media: {
    height: "100%",
    display: "flex",
    flexBasis: "67%",
  }
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
  admin?: boolean;
  cart?: { id: string, count: number }[];
  onBuy: (id: string, count: number) => void;
  onRemove: (id: string) => void;
  onDelete: (product: Product) => void;
  onCount: (id: string, count: number) => void;
  onClose?: () => void;
  onSave: (product: Product) => void;
}

export const ProductCard = ({ admin, product: prod, onSave, onDelete, onBuy, onRemove, onCount, onClose, cart }: Props) => {
  const [product, setProduct] = useState(prod);
  const [countToAdd, setCountToAdd] = useState(1);

  const imageClasses = useImageStyles();
  const buttonClasses = useButtonStyles();

  const handleBuy = useCallback(() => onBuy(product._id!, countToAdd), [onBuy, product._id, countToAdd]);
  const handleRemove = useCallback(() => onRemove(product._id!), [onRemove, product._id]);

  const countInCart = useMemo(() => cart?.find(i => i.id === product._id)?.count, [cart, product._id]);

  const setCount = useCallback((i: number) => {
    if (countInCart) {
      if (!i) {
        return onRemove(product._id!);
      }

      onCount(product._id!, i);
    } else {
      setCountToAdd(i);
    }
  }, [countInCart, onCount, product._id, onRemove]);

  const handleSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();

    onSave({ ...product, names: product.names.map(i => i.trim()).filter(i => i) });
  }, [onSave, product]);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;

    setProduct(item => ({ ...item, [name]: name === "names" ? value.split(";") : value }));
  }, [setProduct]);

  return (
    <Card style={{ width: "calc(100% - 2rem)", display: "flex", position: "relative" }}>
      <Fab color="secondary" style={{ position: "absolute", right: "1rem", top: "1rem" }} onClick={onClose}>
        <CloseIcon />
      </Fab>

      <CardMedia
        className={imageClasses.media}
        image={`/files/mirror?url=${product.img}`}
        title={product.name}
      />

      {admin && (
        <form onSubmit={handleSubmit}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ display: "flex", flexGrow: 1, flexDirection: "column" }}>
              <FormControl>
                <TextField label="Название" name="name" value={product.name} onChange={handleChange} />
              </FormControl>

              <FormControl>
                <TextField label="Описание" name="description" value={product.description} onChange={handleChange} />
              </FormControl>

              <FormControl>
                <TextField label="Артикул" name="id" value={product.id} onChange={handleChange} />
              </FormControl>

              <FormControl>
                <TextField label="URL Картинки" name="img" value={product.img} onChange={handleChange} />
              </FormControl>

              <FormControl>
                <TextField label="Вес" name="weight" value={product.weight} onChange={handleChange} />
              </FormControl>

              <FormControl>
                <TextField label="Цена" name="cost" value={product.cost} onChange={handleChange} />
              </FormControl>

              <FormControl>
                <TextField label="Слова поиска" name="names" value={product.names.join(';')} onChange={handleChange} />
              </FormControl>
            </div>

            <Button disabled={JSON.stringify(product) === JSON.stringify(prod)} type="submit">Сохранить</Button>
            <Button disabled={!product._id} onClick={() => onDelete(product)}>Удалить</Button>
          </div>
        </form>
      )}

      {!admin && (
        <div style={{ display: "flex", justifyContent: "space-between", flexDirection: "column", margin: "4rem", flexBasis: "33%", textAlign: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", flexBasis: "80%" }}>
            <Typography gutterBottom variant="h2" component="h1">
              {product.name}
            </Typography>
            <Typography variant="h6" component="p">
              {product.description}
            </Typography>
            {/* <Typography variant="h6" color="error" component="p">
              {product.id}
            </Typography> */}
            <div style={{ marginTop: "16px" }}>
              <Typography variant="h4" color="error" component="span">
                {product.cost}
              </Typography>
              <Typography variant="h4" color="textSecondary" component="span">
                &nbsp;({product.weight})
              </Typography>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", alignItems: "center", flexBasis: "20%", margin: "50px 0 0 0" }}>
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
      )}
    </Card>
  );
}
