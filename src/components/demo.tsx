import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';

import backgroundImgSrc from '../assets/HD.svg';

import { Product } from 'types/product';
import { useTimeout } from 'hooks/useTimeout';
import { useEffect, useMemo, useState } from 'react';
import { ProductCard } from './product/card';

interface Props {
  products: Product[];
  onClick: () => void;
}

const useImageStyles = makeStyles({
  media: {
    height: "100%",
    display: "flex",
    width: "100%"
  }
});

export const Demo = ({ onClick, products }: Props) => {
  const classes = useImageStyles();

  const [currentDemoProduct, setCurrentDemoProduct] = useState<number>();

  const { seconds, reset } = useTimeout(10);

  useEffect(() => {
    if (!seconds) {
      const rand = Math.round(Math.random() * products.length);
      console.log(rand);

      setCurrentDemoProduct(rand);

      reset();
    }
  }, [products.length, reset, seconds]);

  const demoProduct = useMemo(() => currentDemoProduct !== undefined ? products[currentDemoProduct] : undefined, [products, currentDemoProduct]);

  return (
    <Card onClick={onClick} style={{ width: "calc(100% - 2rem)", display: "flex", position: "relative" }}>
      {!!demoProduct && (
        <ProductCard
          // TODO fix this
          key={currentDemoProduct}
          onCount={() => void 0}
          onBuy={() => void 0}
          onRemove={() => void 0}
          onDelete={() => void 0}
          onClose={() => void 0}
          onSave={() => void 0}
          product={demoProduct}
        />
      )}

      {!demoProduct && (
        <CardMedia
          style={{ backgroundSize: "contain" }}
          className={classes.media}
          image={backgroundImgSrc}
        />
      )}
    </Card>
  );
}
