import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

import { Product } from '../../types/product';
import { Grid, Typography } from '@material-ui/core';

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

export const CartItem = ({ product, count }: { product: Product, count: number }) => {
  const classes = useStyles();

  return (
    <>
      <Grid spacing={1} xs={1}>
        <Avatar style={{ margin: "8px 0 8px 0"}} alt="Remy Sharp" src={product.img} className={classes.small} />
      </Grid>
      <Grid xs={6}>
        <Typography variant="body2" component="p">
          {product.name}
        </Typography>
      </Grid>
      <Grid xs={2}>
        <Typography align="right" variant="body2" component="p">
          x{count}
        </Typography>
      </Grid>
      <Grid xs={3}>
        <Typography align="right" color="error" variant="body2" component="p">
          {product.cost}
        </Typography>
      </Grid>
    </>
  );
}
