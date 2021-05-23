import { createStyles, Fab, Grid, Hidden, makeStyles, Theme, Typography } from "@material-ui/core";
import { ClearRounded, ShoppingCart } from "@material-ui/icons";

import { Product } from "../../types/product";

import { CartItem } from "./item";


const useButtonStyles = makeStyles((theme: Theme) =>
  createStyles({
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  }),
);

interface Props extends React.HTMLProps<HTMLDivElement> {
  cart: { product: Product, count: number }[];
  onOrder: () => void;
  onClear: () => void;
}

export const CartList = ({ cart, style, onClear, onOrder }: Props) => {
  const buttonClasses = useButtonStyles();

  return (
    <div style={{ ...style, width: !cart.length ? 0 : "400px", minWidth: !cart.length ? 0 : "400px", marginRight: !cart.length ? "0" : "2rem", opacity: !cart.length ? 0 : 1, transition: "all 200ms ease-out", display: "flex", flexDirection: "column" }}>
      <Typography gutterBottom variant="h2" component="h2">
        Корзина
      </Typography>

      <div style={{ display: "flex", overflow: "auto" }}>
        <Grid alignItems="center" container>
          <Grid xs={1} />
          <Grid xs={6}>
            <Typography style={{ marginBottom: "8px" }} variant="body2" component="p">
              Название
            </Typography>
          </Grid>
          <Grid xs={2}>
            <Typography style={{ marginBottom: "8px" }} align="right" variant="body2" component="p">
              Кол-во
            </Typography>
          </Grid>
          <Grid xs={3}>
            <Typography style={{ marginBottom: "8px" }} align="right" color="error" variant="body2" component="p">
              Цена
            </Typography>
          </Grid>

          {cart.map(item => (
            <CartItem key={item.product.id} {...item} />
          ))}

          <Grid xs={12}>
            <Typography style={{ marginTop: "8px" }} align="right" color="error" variant="body2" component="p">
              Итого {cart.map(i => i.count * parseInt(i.product.cost)).reduce((a,b) => a + b, 0)} руб
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