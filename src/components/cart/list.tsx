import { Grid, Hidden, Typography } from "@material-ui/core";

import { Cart } from "../../types/cart";
import { Product } from "../../types/product";

import { CartItem } from "./item";

export const CartList = ({ products }: { products: { product: Product, count: number }[] }) => {
  return (
    <div style={{ width: !products.length ? 0 : "320px", minWidth: !products.length ? 0 : "320px", marginRight: !products.length ? "0" : "2rem", opacity: !products.length ? 0 : 1, transition: "all 200ms ease-out", display: "flex", flexDirection: "column" }}>
      <Typography gutterBottom variant="h2" component="h2">
        Корзина
      </Typography>

      <div style={{ display: "flex", overflow: "auto" }}>
        <Grid alignItems="center" container>
          <Grid xs={3} />
          <Grid xs={5}>
            <Typography gutterBottom variant="body2" component="p">
              Название
            </Typography>
          </Grid>
          <Grid xs={2}>
            <Typography gutterBottom variant="body2" component="p">
              Кол-во
            </Typography>
          </Grid>
          <Grid xs={2}>
            <Typography gutterBottom align="right" color="error" variant="body2" component="p">
              Цена
            </Typography>
          </Grid>

          {products.map(item => (
            <CartItem {...item} />
          ))}

          <Grid xs={12}>
            <Typography gutterBottom align="right" color="error" variant="body2" component="p">
              Итого {products.map(i => i.count * parseInt(i.product.cost)).reduce((a,b) => a + b, 0)} руб
            </Typography>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}