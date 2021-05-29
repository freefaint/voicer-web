import { Dialog, DialogContent, Fab, Paper, TextField } from "@material-ui/core";
import { Autocomplete, AutocompleteRenderInputParams } from "@material-ui/lab";
import ExitIcon from '@material-ui/icons/ExitToAppRounded';
import { useEffect, useState } from "react";
import { IUser } from "../../types/users";
import * as UsersService from '../../rest/users';

export const Admin = ({ onLogout, onSelectUser }: { onLogout: () => void, onSelectUser: (id: string) => void }) => {
  const [ users, setUsers ] = useState<IUser[]>([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    UsersService.getItems().then(users => setUsers(users));
  }, []);

  return (
    <Dialog
      maxWidth="xl"
      fullWidth={true}
      open={true}
    >
      <Fab color="secondary" onClick={onLogout} style={{ position: "absolute", top: "1rem", right: "1rem"}}>
        <ExitIcon />
      </Fab>

      <Paper>
        <DialogContent>
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", margin: "1rem" }}>
            <Autocomplete
              options={users}
              disableClearable={true}
              getOptionLabel={i => i.login!}
              renderInput={(props: AutocompleteRenderInputParams) => <TextField placeholder="Выберите пользователя" {...props} />}
              onChange={(e, user) => onSelectUser(user._id!)}
            />
          </div>
        </DialogContent>
      </Paper>
    </Dialog>
  );
}
