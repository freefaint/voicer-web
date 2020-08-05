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
import { Input, Radio } from 'components/input';
import { H2, FadedTiny } from 'components/inline';
import { ColumnSpace, ColumnGrow } from 'components/blocks';
import { Row, Column, Button, Center } from 'components/styled';

interface IProps {
  me?: IUser;
  user: IUser;

  onUpdate: (user: IUser) => void;
}

interface IState {
  sex?: string;
  lastName?: string;
  firstName?: string;
  middleName?: string;
  nick?: string;
  birthDay?: string;
  address?: string;
  email?: string;
  phone?: string;
  workPhone?: string;
  webSite?: string;
}

export class Profile extends React.Component<IProps, IState> {
  public state: IState = { ...this.props.user };

  public render() {
    const { user, onUpdate } = this.props;
    const title = getName(user);

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
            <ColumnGrow>
              <ColumnSpace small={true}>
                <Column>
                  <H2>Личные данные</H2>

                  <Column>
                    <Column style={{ margin: '0.5rem 0 1.5rem 0' }}>
                      <Input
                        name="lastName"
                        readOnly={readOnly}
                        value={this.state.lastName}
                        onChange={this.handleChange}
                        placeholder="Фамилия"
                        type="text"
                      />
                    </Column>

                    <Column style={{ marginBottom: '1.5rem' }}>
                      <Input
                        name="firstName"
                        readOnly={readOnly}
                        value={this.state.firstName}
                        onChange={this.handleChange}
                        placeholder="Имя"
                        type="text"
                      />
                    </Column>

                    <Column style={{ marginBottom: '1.5rem' }}>
                      <Input
                        name="middleName"
                        readOnly={readOnly}
                        value={this.state.middleName}
                        onChange={this.handleChange}
                        placeholder="Отчество"
                        type="text"
                      />
                    </Column>

                    <Column style={{ marginBottom: '1.5rem' }}>
                      <Input
                        name="birthDay"
                        readOnly={readOnly}
                        value={this.state.birthDay}
                        onChange={this.handleChange}
                        placeholder="Дата рожджения"
                        type="text"
                      />
                    </Column>

                    <Column style={{ marginBottom: '1.5rem' }}>
                      <Input
                        name="nick"
                        readOnly={readOnly}
                        value={this.state.nick}
                        onChange={this.handleChange}
                        placeholder="Название страницы"
                        type="text"
                      />
                    </Column>

                    <Column style={{ marginBottom: '1.5rem' }}>
                      <FadedTiny>Пол</FadedTiny>

                      <Row>
                        <Radio
                          name="sex"
                          value="MALE"
                          readOnly={readOnly}
                          checked={this.state.sex === 'MALE'}
                          onChange={this.handleChange}
                          placeholder="Мужской"
                        />

                        <Radio
                          name="sex"
                          value="FEMALE"
                          readOnly={readOnly}
                          checked={this.state.sex === 'FEMALE'}
                          onChange={this.handleChange}
                          placeholder="Женский"
                        />
                      </Row>
                    </Column>
                  </Column>
                </Column>
              </ColumnSpace>
            </ColumnGrow>

            <ColumnGrow>
              <ColumnSpace small={true}>
                <Column>
                  <H2>Контактные данные</H2>
                  
                  <Column style={{ margin: '0.5rem 0 1.5rem 0' }}>
                    <Input
                      name="address"
                      readOnly={readOnly}
                      value={this.state.address}
                      onChange={this.handleChange}
                      placeholder="Место проживания"
                      type="text"
                    />
                  </Column>

                  <Row>
                    <ColumnGrow style={{ marginRight: "1rem" }}>
                      <Column style={{ margin: '0.5rem 0 1.5rem 0' }}>
                        <Input
                          name="email"
                          readOnly={readOnly}
                          value={this.state.email}
                          onChange={this.handleChange}
                          placeholder="Электронная почта"
                          type="text"
                        />
                      </Column>

                      <Column style={{ marginBottom: '1.5rem' }}>
                        <Input
                          name="webSite"
                          readOnly={readOnly}
                          value={this.state.webSite}
                          onChange={this.handleChange}
                          placeholder="Веб-сайт"
                          type="text"
                        />
                      </Column>
                    </ColumnGrow>

                    <ColumnGrow style={{ marginLeft: "1rem" }}>
                      <Column style={{ margin: '0.5rem 0 1.5rem 0' }}>
                        <Input
                          name="phone"
                          readOnly={readOnly}
                          value={this.state.phone}
                          onChange={this.handleChange}
                          placeholder="Телефон"
                          type="text"
                        />
                      </Column>

                      <Column style={{ marginBottom: '1.5rem' }}>
                        <Input
                          name="workPhone"
                          readOnly={readOnly}
                          value={this.state.workPhone}
                          onChange={this.handleChange}
                          placeholder="Рабочий телефон"
                          type="text"
                        />
                      </Column>
                    </ColumnGrow>
                  </Row>
                </Column>
              </ColumnSpace>
            </ColumnGrow>
          </Row>

          {!readOnly && (
            <Center>
              <ColumnSpace small={true}>
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

  private handleToggleSex = (sex: string) => {
    this.setState({ sex });
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