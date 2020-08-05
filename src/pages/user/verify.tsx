// Libs
import * as React from 'react';

// Components
import { H1 } from 'components/inline';
import { Input } from 'components/input';
import { FullCenter } from 'components/blocks';
import { Column, Button, Error } from 'components/styled';

interface IProps {
  onVerify: (data: { code: string }) => void;
  badCredentials?: boolean;
  fetching?: boolean;
}

interface IState {
  code: string;
}

export class Verify extends React.Component<IProps, IState> {
  public state: IState = { code: '' };

  public render() {
    return (
      <FullCenter>
        <Column>
          <H1>Введите четырехзначный код из СМС или письма</H1>

          <form onSubmit={this.handleVerify}>
            <Column>
              <Column style={{ margin: '1.5rem 0 1.5rem 0' }}>
                <Input
                  invalid={this.props.badCredentials}
                  name="code"
                  value={this.state.code}
                  onChange={this.handleChange}
                  placeholder="Код"
                  type="text"
                />
              </Column>

              {this.props.badCredentials && (
                <Column style={{ marginTop: '1.5rem' }}>
                  <Error>Неверный код</Error>
                </Column>
              )}

              <Button disabled={!this.state.code || this.state.code.length < 4}>
                Войти
              </Button>
            </Column>
          </form>
        </Column>
      </FullCenter>
    );
  }

  private handleVerify = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    this.props.onVerify(this.state);
  };

  private handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;

    this.setState(state => ({ ...state, [name]: value }));
  };
}
