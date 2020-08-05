// Libs
import * as React from 'react';

// Components
import { H1 } from 'components/inline';
import { Input } from 'components/input';
import { FullCenter } from 'components/blocks';
import { Column, Button, Error } from 'components/styled';

interface IProps {
  onLogin: (data: { login: string; password: string }) => void;
  badCredentials?: boolean;
  fetching?: boolean;
}

interface IState {
  login: string;
  password: string;
}

export class Login extends React.Component<IProps, IState> {
  public state: IState = { login: '', password: '' };

  public render() {
    return (
      <FullCenter>
        <Column>
          <H1>Вход в систему</H1>

          <form onSubmit={this.handleLogin}>
            <Column>
              <Column style={{ margin: '1.5rem 0 1.5rem 0' }}>
                <Input
                  invalid={this.props.badCredentials}
                  name="login"
                  value={this.state.login}
                  onChange={this.handleChange}
                  placeholder="Логин, Email, Телефон"
                  type="text"
                />
              </Column>

              <Column style={{ marginBottom: '1.5rem' }}>
                <Input
                  name="password"
                  invalid={this.props.badCredentials}
                  value={this.state.password}
                  onChange={this.handleChange}
                  placeholder="Пароль"
                  type="password"
                />
              </Column>

              {this.props.badCredentials && (
                <Column style={{ marginBottom: '1.5rem' }}>
                  <Error>Неверный логин или пароль. Укажите корректный логин и пароль и попробуйте снова.</Error>
                </Column>
              )}

              <Button disabled={!this.state.login || !this.state.password || this.props.fetching}>
                Войти
              </Button>
            </Column>
          </form>
        </Column>
      </FullCenter>
    );
  }

  private handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    this.props.onLogin(this.state);
  };

  private handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;

    this.setState(state => ({ ...state, [name]: value }));
  };
}
