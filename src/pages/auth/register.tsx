// Libs
import * as React from 'react';

// Types
import { IUser } from 'types/users';

// Components
import { Input } from 'components/input';
import { FullCenter } from 'components/blocks';
import { H1, FadedTiny } from 'components/inline';
import { Column, Button, Error, Row } from 'components/styled';

interface IProps {
  fetching?: boolean;
  badCredentials?: boolean;
  onRegister: (user: IUser) => void;
}

interface IState {
  email?: string;
  phone?: string;
  password?: string;
  
  firstName?: string;
  lastName?: string;
  middleName?: string;

  companyName?: string;
}

export class Register extends React.Component<IProps, IState> {
  public state: IState = {};

  public render() {
    return (
      <>
        <FullCenter>
          <Column>
            <H1>Регистрация очень быстрая</H1>

            <form onSubmit={this.handleSubmit}>
              <Column style={{ textAlign: 'center' }}>
                <Column style={{ margin: '1.5rem 0 1.5rem 0' }}>
                  <Row>
                    <Column>
                      <Input
                        invalid={false}
                        name="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                        placeholder="Email"
                        type="text"
                      />
                    </Column>

                    <p style={{ lineHeight: '2.5rem', margin: '0 1rem' }}>или</p>

                    <Column>
                      <Input
                        name="phone"
                        invalid={false}
                        value={this.state.phone}
                        onChange={this.handleChange}
                        placeholder="Номер телефона"
                        type="text"
                      />
                    </Column>
                  </Row>
                </Column>


                <Column style={{ marginBottom: '1.5rem' }}>
                  <Input
                    name="password"
                    invalid={false}
                    value={this.state.password}
                    onChange={this.handleChange}
                    placeholder="Пароль"
                    type="password"
                  />

                  <FadedTiny>Если вы не укажете пароль, мы сами его сгенерируем</FadedTiny>
                </Column>

                {!!this.props.badCredentials && (
                  <Column>
                    <Error>Что-то не так</Error>
                  </Column>
                )}

                <Button disabled={!this.valid() || this.props.fetching}>Далее</Button>
              </Column>
            </form>
          </Column>
        </FullCenter>
      </>
    );
  };
  
  private valid = () => {
    return !!this.state.email || !!this.state.phone;
  };

  private handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;

    this.setState({ [name]: value });
  };

  private handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    this.props.onRegister({ ...this.state });
  };
}
