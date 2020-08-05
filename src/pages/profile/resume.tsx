// Libs
import * as React from 'react';

// Types
import { IUser } from 'types/users';
import { IResume } from 'types/resume';

// Common
import { getName } from 'common/users';

// Services
import * as ResumeService from 'rest/resume';

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
  items?: IResume[];
}

export class Resume extends React.Component<IProps, IState> {
  public state: IState = { };
  
  public componentDidMount() {
    this.handleLoad();
  }

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

          {this.state.items && this.state.items.map(item => (
            <Item data={item} onChange={this.handleChange} />
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

  private handleLoad = () => {
    ResumeService.findItems({ student: this.props.user._id }).then(items => this.setState({ items }));
  };
  
  private handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    ResumeService.findItems({ student: this.props.user._id }).then(items => {
      Promise.all(items.map(item => item._id ? ResumeService.removeItem(item._id) : Promise.resolve())).then(() => {
        if (!this.state.items) {
          return;
        }

        Promise.all(this.state.items.map(item => ResumeService.addItem({ ...item, student: this.props.user._id }))).then(() => {
          this.handleLoad();
        });
      });
    });
  };

  private handleChange = (old: IResume, fresh: IResume) => {
    this.setState(state => ({ items: state.items && state.items.map(i => i === old ? fresh : i) }));
  };

  private handleAdd = () => {
    this.setState(state => ({ items: [ ...state.items || [], {
      name: '',
      salary: '',
      text: '',
    } ] }));
  };
}

interface IItemProps {
  data: IResume;

  onChange: (old: IResume, fresh: IResume) => void;
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
                placeholder="Желаемая должность"
                type="text"
              />
            </Column>
            
            <Column style={{ margin: '0 0 1.5rem 0' }}>
              <Input
                name="salary"
                value={data.salary}
                onChange={this.handleChange}
                placeholder="Желаемая зарплата"
                type="text"
              />
            </Column>

            <Column style={{ margin: '0 0 1.5rem 0' }}>
              <Input
                name="text"
                value={data.text}
                onChange={this.handleChange}
                placeholder="О себе"
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