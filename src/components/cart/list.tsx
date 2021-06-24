import { createStyles, Fab, Grid, makeStyles, Theme, Typography } from "@material-ui/core";
import { ClearRounded, ShoppingCart } from "@material-ui/icons";
import { useCommand } from "../../hooks/useCommand";

import { Product } from "../../types/product";

import { CartItem } from "./item";


const useButtonStyles = makeStyles((theme: Theme) =>
  createStyles({
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  }),
);

interface Props {
  cart: { product: Product, count: number }[];
  onOrder: () => void;
  onClear: () => void;
}

export const CartList = ({ cart, onClear, onOrder }: Props) => {
  const buttonClasses = useButtonStyles();

  useCommand('Заказать', onOrder);

  return (
    <div style={{ width: "400px", minWidth: "400px", padding: "0 2rem", display: "flex", flexDirection: "column" }}>
      <Typography gutterBottom variant="h2" component="h2">
        Корзина
      </Typography>

      <div style={{ display: "flex", overflow: "auto" }}>
        <Grid alignItems="center" container>
          <Grid item xs={1} />
          <Grid item xs={6}>
            <Typography style={{ marginBottom: "8px" }} variant="body2" component="p">
              Название
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography style={{ marginBottom: "8px" }} align="right" variant="body2" component="p">
              Кол-во
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography style={{ marginBottom: "8px" }} align="right" color="error" variant="body2" component="p">
              Цена
            </Typography>
          </Grid>

          {cart.map(item => (
            <CartItem key={item.product._id} {...item} />
          ))}

          <Grid item xs={12}>
            <Typography style={{ marginTop: "8px" }} align="right" color="error" variant="body2" component="p">
              Итого {cart.map(i => i.count * parseInt(i.product.cost)).reduce((a, b) => a + b, 0)} руб
            </Typography>
          </Grid>
        </Grid>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "2rem" }}>
        <Fab color="secondary" variant="extended" onClick={onOrder}>
          <ShoppingCart className={buttonClasses.extendedIcon} />
          Заказать
        </Fab>

        <Fab color="primary" variant="extended" onClick={onClear}>
          <ClearRounded className={buttonClasses.extendedIcon} />
          Очистить
        </Fab>
      </div>
    </div>
  )
}