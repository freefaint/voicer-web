// Libs
import * as React from 'react';

// Types
import { IUser } from 'types/users';

// Common
import { getName } from 'common/users';

// Includes
import { Docs } from './docs';
import { Name } from './name';
import { Photos } from './photos';

// Components
import { H2 } from 'components/inline';
import { Input, TextArea } from 'components/input';
import { ColumnSpace, ColumnGrow } from 'components/blocks';
import { Row, Column, Button, Center } from 'components/styled';

interface IProps {
  me?: IUser;
  user: IUser;

  onUpdate: (user: IUser) => void;
}

interface IState {
  nick?: string;
  email?: string;
  webSite?: string;

  companyName?: string;
  companyUrName?: string;
  companySize?: string;
  companyINN?: string;
  companyUrAddress?: string;
  companyPhone?: string;
  companyBankAccount?: string;
  companyBankKPP?: string;
  companyBankBIK?: string;
  companyDescription?: string;

  sphere?: string;
}

export class Company extends React.Component<IProps, IState> {
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
                  <H2>Описание</H2>

                  <Column>
                    <Column style={{ margin: '0.5rem 0 1.5rem 0' }}>
                      <Input
                        name="companyName"
                        readOnly={readOnly}
                        value={this.state.companyName}
                        onChange={this.handleChange}
                        placeholder="Официальное наименование"
                        type="text"
                      />
                    </Column>

                    <Column style={{ marginBottom: '1.5rem' }}>
                      <Input
                        name="companyINN"
                        readOnly={readOnly}
                        value={this.state.companyINN}
                        onChange={this.handleChange}
                        placeholder="ИНН"
                        type="text"
                      />
                    </Column>
                  </Column>
                </Column>
              </ColumnSpace>

              <ColumnSpace small={true}>
                <Column>
                  <H2>Контактные данные</H2>

                  <Column style={{ margin: '0.5rem 0 1.5rem 0' }}>
                    <Input
                      name="companyPhone"
                      readOnly={readOnly}
                      value={this.state.companyPhone}
                      onChange={this.handleChange}
                      placeholder="Телефон"
                      type="text"
                    />
                  </Column>
                </Column>
              </ColumnSpace>

              <ColumnSpace small={true}>
                <Column>
                  <H2>Банковские реквизиты</H2>

                  <Column>
                    <Column style={{ margin: '0.5rem 0 1.5rem 0' }}>
                      <Input
                        name="companyBankAccount"
                        readOnly={readOnly}
                        value={this.state.companyBankAccount}
                        onChange={this.handleChange}
                        placeholder="Корреспондентский счет"
                        type="text"
                      />
                    </Column>
                  </Column>
                </Column>
              </ColumnSpace>

              <ColumnSpace small={true}>
                <Column>
                  <H2>Компания</H2>

                  <Column style={{ margin: '0.5rem 0 1.5rem 0' }}>
                    <Input
                      name="sphere"
                      readOnly={readOnly}
                      value={this.state.sphere}
                      onChange={this.handleChange}
                      placeholder="Сфера деятельности"
                      type="text"
                    />
                  </Column>
                  
                  <Column style={{ marginBottom: '1.5rem' }}>
                    <Input
                      name="companySize"
                      readOnly={readOnly}
                      value={this.state.companySize}
                      onChange={this.handleChange}
                      placeholder="Количество сотрудников"
                      type="text"
                    />
                  </Column>
                </Column>
              </ColumnSpace>
            </ColumnGrow>

            <ColumnGrow>
              <ColumnSpace small={true}>
                <Column>
                  <H2>&nbsp;</H2>
                  
                  <Column style={{ margin: '0.5rem 0 1.5rem 0' }}>
                    <Input
                      name="companyUrName"
                      readOnly={readOnly}
                      value={this.state.companyUrName}
                      onChange={this.handleChange}
                      placeholder="Наименование юридического лица"
                      type="text"
                    />
                  </Column>

                  <Row>
                    <ColumnGrow style={{ margin: "0 1rem 1.5rem 0" }}>
                      <Input
                        name="nick"
                        readOnly={readOnly}
                        value={this.state.nick}
                        onChange={this.handleChange}
                        placeholder="Название страницы"
                        type="text"
                      />
                    </ColumnGrow>

                    <ColumnGrow>
                      <Input
                        name="webSite"
                        readOnly={readOnly}
                        value={this.state.webSite}
                        onChange={this.handleChange}
                        placeholder="Веб-сайт"
                        type="text"
                      />
                    </ColumnGrow>
                  </Row>
                </Column>
              </ColumnSpace>

              <ColumnSpace small={true}>
                <Column>
                  <H2>&nbsp;</H2>
                  
                  <Column style={{ margin: '0.5rem 0 1.5rem 0' }}>
                    <Input
                      name="companyUrAddress"
                      readOnly={readOnly}
                      value={this.state.companyUrAddress}
                      onChange={this.handleChange}
                      placeholder="Юридический адрес"
                      type="text"
                    />
                  </Column>
                </Column>
              </ColumnSpace>

              <ColumnSpace small={true}>
                <Column>
                  <H2>&nbsp;</H2>

                  <Row style={{ margin: '0.5rem 0 1.5rem 0' }}>
                    <ColumnGrow style={{ marginRight: "1rem" }}>
                      <Input
                        name="companyBankKPP"
                        readOnly={readOnly}
                        value={this.state.companyBankKPP}
                        onChange={this.handleChange}
                        placeholder="КПП"
                        type="text"
                      />
                    </ColumnGrow>

                    <ColumnGrow>
                      <Input
                        name="companyBankBIK"
                        readOnly={readOnly}
                        value={this.state.companyBankBIK}
                        onChange={this.handleChange}
                        placeholder="БИК"
                        type="text"
                      />
                    </ColumnGrow>
                  </Row>
                </Column>
              </ColumnSpace>

              <ColumnSpace small={true}>
                <Column>
                  <H2>&nbsp;</H2>

                  <Column style={{ margin: '0.5rem 0 1.5rem 0' }}>
                    <TextArea
                      name="companyDescription"
                      readOnly={readOnly}
                      value={this.state.companyDescription}
                      onChange={this.handleChange}
                      placeholder="Описание компании"
                      type="text"
                    />
                  </Column>
                </Column>
              </ColumnSpace>
            </ColumnGrow>
          </Row>

          <Row>
            <ColumnGrow>
              <ColumnSpace small={true}>
                <Docs user={user} readOnly={readOnly} onUpdate={onUpdate} />
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
  
  private handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    this.props.onUpdate(this.state);
  };

  private handleChange = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.currentTarget;

    this.setState({ [name]: value });
  };
}