import { Grid, Typography } from "@material-ui/core";

import { Product } from "../../types/product";

import { ProductItem } from "./item";

export const ProductList = ({ products }: { products: Product[] }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Typography gutterBottom variant="h2" component="h2">
        Наше меню
      </Typography>

      <div style={{ display: "flex", overflow: "auto" }}>
        <Grid container spacing={0} style={{ margin: "none" }}>
          {products.map(product => (
            <Grid xs={3}>
              <ProductItem product={product} />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  )
}