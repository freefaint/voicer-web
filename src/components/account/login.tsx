import { Button, Dialog, DialogContent, Paper, TextField } from "@material-ui/core";
import { FormEvent, useCallback, useState } from "react";

export const Login = ({ onLogin }: { onLogin: (user: { login: string, password: string }) => void }) => {
  const [ login, setLogin ] = useState("");
  const [ password, setPassword] = useState("");

  const handleSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();

    onLogin({ login, password });
  }, [ onLogin, login, password ]);

  return (
    <Dialog
      maxWidth="xl"
      open={true}
    >
      <Paper>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", margin: "4rem" }}>
              <TextField label="Логин" value={login} onChange={(e) => setLogin(e.currentTarget.value)} />
              <TextField label="Пароль" value={password} onChange={(e) => setPassword(e.currentTarget.value)} />
              
              <Button disabled={!login || !password} type="submit">Вход</Button>
            </div>
          </form>
        </DialogContent>
      </Paper>
    </Dialog>
  );
}
