import { Checkbox, createStyles, Fab, FormControlLabel, Grid, makeStyles, Paper, Theme, Typography } from "@material-ui/core";
import { ClearRounded, ShoppingCart } from "@material-ui/icons";
import CloseIcon from '@material-ui/icons/CloseRounded';
import { useCallback, useState } from "react";
import { useCommand } from "../../hooks/useCommand";

import { Product } from "../../types/product";

import { CartItemLarge } from "./item-large";


const useButtonStyles = makeStyles((theme: Theme) =>
  createStyles({
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  }),
);

interface Props {
  cart: { product: Product, count: number }[];
  products: Product[];

  onRemove: (id: string) => void;
  onCount: (id: string, count: number) => void;
  onOrder: (ssoboi?: boolean) => void;
  onClear: () => void;
  onClose: () => void;
}

export const Cart = ({ cart, onClear, onCount, onRemove, onClose, onOrder }: Props) => {
  const buttonClasses = useButtonStyles();

  const [ssoboi, setSsoboi] = useState(false);

  const handleOrder = useCallback(() => {
    console.log('EXPORT', ssoboi);
    onOrder(ssoboi);
  }, [ssoboi, onOrder]);

  useCommand('Отправить', handleOrder);
  useCommand('Оформить заказ', handleOrder);

  return (
    <Paper style={{ width: "calc(100% - 2rem)", display: "flex", position: "relative" }}>
      <Fab color="secondary" onClick={onClose} style={{ position: "absolute", top: "1rem", right: "1rem" }}>
        <CloseIcon />
      </Fab>

      <div style={{ display: "flex", flexDirection: "column", flexGrow: 1, alignItems: "center", margin: "2rem" }}>
        <Typography gutterBottom variant="h2" component="h2">
          Корзина
        </Typography>

        <div style={{ display: "flex", overflow: "auto", flexGrow: 1 }}>
          <div style={{ width: "100%" }}>
            <Grid alignItems="center" container>
              <Grid item xs={1} />
              <Grid item xs={6}>
                <Typography style={{ marginBottom: "8px" }} variant="h5" component="p">
                  Название
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography style={{ marginBottom: "8px" }} align="center" variant="h5" component="p">
                  Кол-во
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography style={{ marginBottom: "8px" }} align="right" color="error" variant="h5" component="p">
                  Цена
                </Typography>
              </Grid>

              {cart.map(item => (
                <CartItemLarge
                  key={item.product.id}
                  {...item}
                  onCount={onCount}
                  onRemove={onRemove}
                />
              ))}

              <Grid item xs={12}>
                <Typography style={{ marginTop: "8px" }} align="right" color="error" variant="h5" component="p">
                  Итого {cart.map(i => i.count * parseInt(i.product.cost)).reduce((a, b) => a + b, 0)} руб
                </Typography>
              </Grid>
            </Grid>
          </div>
        </div>

        <FormControlLabel
          control={
            <Checkbox checked={ssoboi} onChange={() => setSsoboi(bool => !bool)} />
          }
          label="Заказ заберу с собой"
        />

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "2rem" }}>
          <Fab color="secondary" variant="extended" onClick={handleOrder}>
            <ShoppingCart className={buttonClasses.extendedIcon} />
            Оформить заказ
          </Fab>

          <Fab color="primary" variant="extended" onClick={onClose} style={{ margin: "0 1rem" }}>
            <ClearRounded className={buttonClasses.extendedIcon} />
            Назад к покупкам
          </Fab>

          <Fab color="primary" variant="extended" onClick={onClear}>
            <ClearRounded className={buttonClasses.extendedIcon} />
            Очистить корзину
          </Fab>
        </div>
      </div>
    </Paper>
  )
}