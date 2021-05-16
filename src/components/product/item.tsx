import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import { Product } from "../../types/product";

const useStyles = makeStyles({
  media: {
    height: 160,
  },
});

export const ProductItem = ({ product }: { product: Product }) => {
  const classes = useStyles();

  return (
    <div style={{ margin: "0 2rem 2rem 0" }}>
      <Card>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={product.img}
            title={product.name}
          />
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