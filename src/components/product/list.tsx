import { Grid, Typography } from "@material-ui/core";
import { useRef } from "react";
import { useCommand } from "../../hooks/useCommand";

import { Product } from "../../types/product";

import { ProductItem } from "./item";

interface Props extends React.HTMLProps<HTMLDivElement> {
  products: Product[];
  onCommand: () => void;
  onSelectProduct: (id: string) => void;
}

export const ProductList = ({ products, style, onCommand, onSelectProduct }: Props) => {
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
            <Grid key={product.id} xs={3}>
              <ProductItem product={product} onSelect={onSelectProduct} />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  )
}