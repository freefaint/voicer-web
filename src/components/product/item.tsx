import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/CloseRounded';

import { Product } from "../../types/product";
import { SyntheticEvent, useCallback } from 'react';
import { Fab } from '@material-ui/core';

const useStyles = makeStyles({
  media: {
    height: 160,
  },
});

export const ProductItem = ({ product, admin, onRemove, onSelect }: { admin?: boolean; product: Product, onRemove: (product: Product) => void; onSelect: (id: string) => void }) => {
  const classes = useStyles();

  const handleClick = useCallback(() => onSelect(product._id!), [onSelect, product._id]);

  const handleRemove = useCallback((e: SyntheticEvent) => {
    e.stopPropagation();
    onRemove(product);
  }, [onRemove, product]);

  return (
    <div style={{ margin: "0 2rem 2rem 0" }}>
      <Card>
        <CardActionArea onClick={handleClick}>
          <CardMedia
            className={classes.media}
            image={product.img}
            title={product.name}
          >
            {admin && (
              <Fab color="secondary" onClick={handleRemove} style={{ position: "absolute", top: "1rem", right: "1rem" }}>
                <CloseIcon />
              </Fab>
            )}
          </CardMedia >
          <CardContent>
            <Typography gutterBottom variant="body2" component="h2">
              {product.name}
            </Typography>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="body2" color="error" component="p">
                {product.cost}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {product.weight}
              </Typography>
            </div>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
}