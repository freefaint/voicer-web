import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import { Product } from "../../types/product";

const useStyles = makeStyles({
  media: {
    height: 540,
  },
});

export const ProductCard = ({ product }: { product: Product }) => {
  const classes = useStyles();

  return (
    <div style={{ margin: "2rem" }}>
      <Card>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={product.img}
            title={product.name}
          />
          <CardContent style={{ margin: "2rem" }}>
            <Typography gutterBottom variant="h2" component="h1">
              {product.name}
            </Typography>
            <Typography variant="h6" component="p">
              {product.description}
            </Typography>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h4" color="error" component="p">
                {product.cost}
              </Typography>
              <Typography variant="h4" color="textSecondary" component="p">
                {product.cost}
              </Typography>
            </div>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
}