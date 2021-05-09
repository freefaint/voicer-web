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
      <Grid xs={3}>
        <Avatar alt="Remy Sharp" src={product.img} className={classes.large} />
      </Grid>
      <Grid xs={5}>
        <Typography gutterBottom variant="body2" component="p">
          {product.name}
        </Typography>
      </Grid>
      <Grid xs={2}>
        <Typography gutterBottom variant="body2" component="p">
          x{count}
        </Typography>
      </Grid>
      <Grid xs={2}>
        <Typography gutterBottom align="right" color="error" variant="body2" component="p">
          {product.cost}
        </Typography>
      </Grid>
    </>
  );
}
