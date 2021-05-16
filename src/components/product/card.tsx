import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Fab, IconButton, PaperProps } from '@material-ui/core';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

import { Product } from "../../types/product";
import { useCallback } from 'react';

const useStyles = makeStyles({
  media: {
    height: 540,
  },
});

export const ProductCard = ({ product, onBuy, ref, ...rest }: { product: Product, onBuy: (id: string) => void} & PaperProps) => {
  const classes = useStyles();
  
  const handleBuy = useCallback(() => onBuy(product.id), [ onBuy ]);

  return (
    <div {...rest} style={{ ...rest.style, margin: "2rem" }}>
      <Card>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={product.img}
            title={product.name}
          />
          <CardContent style={{ margin: "2rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Typography gutterBottom variant="h2" component="h1">
                {product.name}
              </Typography>
              <Fab color="primary" aria-label="add to shopping cart" onClick={handleBuy}>
                <AddShoppingCartIcon />
              </Fab>
            </div>
            <Typography variant="h6" component="p">
              {product.description}
            </Typography>
            <div style={{ display: "flex", marginTop: "16px", justifyContent: "space-between" }}>
              <Typography variant="h4" color="error" component="p">
                {product.cost}
              </Typography>
              <Typography variant="h4" color="textSecondary" component="p">
                {product.weight}
              </Typography>
            </div>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
}