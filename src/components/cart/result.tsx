import { Fab, Paper, Typography } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/CloseRounded';
import { useEffect } from "react";
import { useCommand } from "../../hooks/useCommand";

interface Props {
  code: string;
  onClose: () => void;
}

export const Result = ({ code, onClose }: Props) => {
  useCommand('Закрыть', onClose);

  useEffect(() => {
    setTimeout(onClose, 30000);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Paper style={{ width: "calc(100% - 2rem", position: "relative", display: "flex" }}>
      <Fab color="secondary" onClick={onClose} style={{ position: "absolute", top: "1rem", right: "1rem"}}>
        <CloseIcon />
      </Fab>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flexGrow: 1 }}>
        <Typography gutterBottom variant="h1" component="h2">
          Спасибо! Код заказа {code}
          <br />
          Подойдите для оплаты на кассу
        </Typography>
      </div>
    </Paper>
  )
}