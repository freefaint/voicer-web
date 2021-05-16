import { Grid, Typography } from "@material-ui/core";
import { useEffect, useRef } from "react";
import { useCommand } from "../../hooks/useCommand";

import { Product } from "../../types/product";

import { ProductItem } from "./item";

export const ProductList = ({ products, style, onCommand }: { products: Product[], onCommand: () => void } & React.HTMLProps<HTMLDivElement>) => {
  const container = useRef<HTMLDivElement | null>(null);

  useCommand('вниз', () => {
    if (!container.current) {
      return;
    }

    onCommand();
    container.current.scrollTop = container.current.clientHeight + container.current.scrollTop;
  });

  useCommand('вверх', () => {
    if (!container.current) {
      return;
    }
    
    onCommand();
    container.current.scrollTop = container.current.scrollTop - container.current.clientHeight;
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", ...style }}>
      <Typography gutterBottom variant="h2" component="h2">
        Наше меню
      </Typography>

      <div ref={container} style={{ display: "flex", overflow: "auto", scrollBehavior: "smooth" }}>
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