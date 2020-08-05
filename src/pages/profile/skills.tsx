// Libs
import * as React from 'react';

// Types
import { IUser, ISkill } from 'types/users';

// Includes
import { Name } from './name';

// Components
import { Input } from 'components/input';
import { ColumnSpace } from 'components/blocks';
import { Row, Column, Button, Center } from 'components/styled';

interface IProps {
  me?: IUser;
  user: IUser;

  onUpdate: (user: IUser) => void;
}

interface IState {
  skills?: ISkill[];
}

export class Skills extends React.Component<IProps, IState> {
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

          {this.state.skills && this.state.skills.map(i => (
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

  private handleChange = (old: ISkill, fresh: ISkill) => {
    this.setState(state => ({ skills: state.skills && state.skills.map(i => i === old ? fresh : i) }));
  };

  private handleAdd = () => {
    this.setState(state => ({ skills: [ ...state.skills || [], {
      name: '',
    } ] }));
  };
}

interface IItemProps {
  data: ISkill;

  onChange: (old: ISkill, fresh: ISkill) => void;
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
                name="name"
                value={data.name}
                onChange={this.handleChange}
                placeholder="Название"
                type="text"
              />
            </Column>
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