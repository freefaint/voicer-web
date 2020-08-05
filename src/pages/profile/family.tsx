// Libs
import * as React from 'react';

// Types
import { IUser } from 'types/users';

// Common
import { getName } from 'common/users';

// Includes
import { Name } from './name';
import { Photos } from './photos';

// Components
import { H2 } from 'components/inline';
import { Input } from 'components/input';
import { ColumnSpace } from 'components/blocks';
import { Row, Column, Button, Center } from 'components/styled';

interface IProps {
  me?: IUser;
  user: IUser;

  onUpdate: (user: IUser) => void;
}

interface IState {

}

export class Family extends React.Component<IProps, IState> {
  public state: IState = { ...this.props.user };

  public render() {
    const { user, onUpdate } = this.props;

    const readOnly = user !== this.props.me;

    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <Row>
            <ColumnSpace>
              <Column>
                <Name user={user} />
              </Column>
            </ColumnSpace>

            <ColumnSpace>
              <Photos readOnly={readOnly} user={user} onUpdate={this.props.onUpdate} />
            </ColumnSpace>
          </Row>
        
          <Row>
            <ColumnSpace>
              <Column>
                <H2>Личные данные</H2>

                <Column>
                  <Column style={{ margin: '1.5rem 0 1.5rem 0' }}>
                    <Input
                      name="lastName"
                      readOnly={readOnly}
                      onChange={this.handleChange}
                      placeholder="Фамилия"
                      type="text"
                    />
                  </Column>
                </Column>
              </Column>
            </ColumnSpace>
          </Row>

          {!readOnly && (
            <Center>
              <ColumnSpace>
                <Button>
                  Сохранить
                </Button>
              </ColumnSpace>
            </Center>
          )}
        </form>
      </>
    );
  };
  
  private handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    this.props.onUpdate(this.state);
  };

  private handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;

    this.setState({ [name]: value });
  };
}