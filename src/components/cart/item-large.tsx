import React, { useCallback } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

import { Product } from '../../types/product';
import { Grid, Typography } from '@material-ui/core';
import { Count } from '../count';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    large: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
  }),
);

interface Props {
  product: Product;
  count: number;
  onRemove: (id: string) => void;
  onCount: (id: string, count: number) => void;
};

export const CartItemLarge = ({ product, onCount, onRemove, count }: Props) => {
  const classes = useStyles();

  const handleCount = useCallback((count: number) => {
    if (!count) {
      return onRemove(product.id);
    }
    onCount(product.id, count);
  }, [ product ]);

  return (
    <>
      <Grid spacing={1} xs={1}>
        <Avatar style={{ margin: "8px 0 8px 0"}} alt="Remy Sharp" src={product.img} className={classes.large} />
      </Grid>
      <Grid xs={6}>
        <Typography variant="h5" component="p">
          {product.name}
        </Typography>
      </Grid>
      <Grid xs={2}>
        <Typography align="right" variant="h5" component="p">
          <Count count={count} onChange={handleCount} />
        </Typography>
      </Grid>
      <Grid xs={3}>
        <Typography align="right" color="error" variant="h5" component="p">
          {product.cost}
        </Typography>
      </Grid>
    </>
  );
}
