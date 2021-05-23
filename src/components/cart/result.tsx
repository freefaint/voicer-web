import { createStyles, DialogContent, Fab, Grid, Hidden, makeStyles, Paper, Theme, Typography } from "@material-ui/core";
import { ClearRounded, ShoppingCart } from "@material-ui/icons";
import CloseIcon from '@material-ui/icons/CloseRounded';

import { Product } from "../../types/product";

import { CartItemLarge } from "./item-large";


const useButtonStyles = makeStyles((theme: Theme) =>
  createStyles({
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  }),
);

interface Props {
  code: string;
  onClose: () => void;
}

export const Result = ({ code, onClose }: Props) => {
  const buttonClasses = useButtonStyles();

  return (
    <Paper>
      <Fab color="secondary" onClick={onClose} style={{ position: "absolute", top: "1rem", right: "1rem"}}>
        <CloseIcon />
      </Fab>

      <DialogContent>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", margin: "8rem 0" }}>
          <Typography gutterBottom variant="h1" component="h2">
            Спасибо! Код заказа {code}
          </Typography>
        </div>
      </DialogContent>
    </Paper>
  )
}