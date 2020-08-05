// Libs
import * as React from 'react';

// Types
import { IUser } from 'types/users';

// Includes
import { H1 } from 'components/inline';
import { Input } from 'components/input';
import { FullCenter } from 'components/blocks';
import { Column, Button } from 'components/styled';

interface IProps {
  user: IUser;
  onUpdate: (data: IUser) => void;
}

interface IState {
  firstName?: string;
  lastName?: string;
  middleName?: string;
  companyName?: string;
}

export class Name extends React.Component<IProps, IState> {
  public state: IState = { ...this.props.user };

  public render() {
    return (
      <FullCenter>
        <Column>
          {this.props.user.type === 'COMPANY' && (
            <>
              <H1>Как называется ваша компания?</H1>

              <form onSubmit={this.handleVerify}>
                <Column>
                  <Column style={{ margin: '1.5rem 0 1.5rem 0' }}>
                    <Input
                      name="companyName"
                      value={this.state.companyName}
                      onChange={this.handleChange}
                      placeholder="Название компании"
                      type="text"
                    />
                  </Column>

                  <Button>Готово</Button>
                </Column>
              </form>
            </>
          )}

          {this.props.user.type !== 'COMPANY' && (
            <>
              <H1>Как вас зовут?</H1>

              <form onSubmit={this.handleVerify}>
                <Column>
                  <Column style={{ margin: '1.5rem 0 1.5rem 0' }}>
                    <Input
                      name="lastName"
                      value={this.state.lastName}
                      onChange={this.handleChange}
                      placeholder="Фамилия"
                      type="text"
                    />
                  </Column>
    
                  <Column style={{ margin: '0 0 1.5rem 0' }}>
                    <Input
                      name="firstName"
                      value={this.state.firstName}
                      onChange={this.handleChange}
                      placeholder="Имя"
                      type="text"
                    />
                  </Column>
    
                  <Column style={{ margin: '0 0 1.5rem 0' }}>
                    <Input
                      name="middleName"
                      value={this.state.middleName}
                      onChange={this.handleChange}
                      placeholder="Отчество"
                      type="text"
                    />
                  </Column>
    
                  <Button>Готово</Button>
                </Column>
              </form>
            </>
          )}
        </Column>
      </FullCenter>
    );
  }

  private handleVerify = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    this.props.onUpdate(this.state);
  };

  private handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;

    this.setState(state => ({ ...state, [name]: value }));
  };
}
