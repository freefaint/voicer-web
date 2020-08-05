// Libs
import * as React from 'react';

// Types
import { IUser, IEducation } from 'types/users';

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
  education?: IEducation[];
}

export class Education extends React.Component<IProps, IState> {
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
          </Row>

          {this.state.education && this.state.education.map(i => (
            <Item data={i} onChange={this.handleChange} />
          ))}

          {!readOnly && (
            <Center>
              <Row>
                <ColumnSpace>
                  <Button type="button" onClick={this.handleAdd}>
                    Добавить
                  </Button>
                </ColumnSpace>

                <ColumnSpace>
                  <Button type="submit">
                    Сохранить
                  </Button>
                </ColumnSpace>
              </Row>
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

  private handleChange = (old: IEducation, fresh: IEducation) => {
    this.setState(state => ({ education: state.education && state.education.map(i => i === old ? fresh : i) }));
  };

  private handleAdd = () => {
    this.setState(state => ({ education: [ ...state.education || [], {
      institute: '',
      facultete: '',
      startYear: '',
      finishYear: ''
    } ] }));
  };
}

interface IItemProps {
  data: IEducation;

  onChange: (old: IEducation, fresh: IEducation) => void;
}

export class Item extends React.Component<IItemProps> {
  public render() {
    const { data } = this.props;

    return (
      <>
        <Row>
          <ColumnSpace>
            <Column style={{ margin: '0 0 1.5rem 0' }}>
              <Input
                name="institute"
                value={data.institute}
                onChange={this.handleChange}
                placeholder="ВУЗ"
                type="text"
              />
            </Column>

            <Row>
              <Column style={{ margin: '0 0 1.5rem 0' }}>
                <Input
                  name="facultete"
                  value={data.facultete}
                  onChange={this.handleChange}
                  placeholder="Факультет"
                  type="text"
                />
              </Column>

              <Column style={{ margin: '0 0 1.5rem 1.5rem' }}>
                <Input
                  name="speciality"
                  value={data.speciality}
                  onChange={this.handleChange}
                  placeholder="Специализация"
                  type="text"
                />
              </Column>
            </Row>

            <Row>
              <Column style={{ margin: '0 0 1.5rem 0' }}>
                <Input
                  name="startYear"
                  value={data.startYear}
                  onChange={this.handleChange}
                  placeholder="Год начала"
                  type="text"
                />
              </Column>

              <Column style={{ margin: '0 0 1.5rem 1.5rem' }}>
                <Input
                  name="finishYear"
                  value={data.finishYear}
                  onChange={this.handleChange}
                  placeholder="Год окончания"
                  type="text"
                />
              </Column>
            </Row>
          </ColumnSpace>
        </Row>
      </>
    );
  };

  private handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;

    this.props.onChange(this.props.data, { ...this.props.data, [name]: value });
  };
}