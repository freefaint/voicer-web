// Libs
import * as React from 'react';

// Types
import { IUser } from 'types/users';
import { IResume } from 'types/resume';

// Services
import * as UsersService from 'rest/users';
import * as ResumeService from 'rest/resume';

// Includes
import { Resume } from './item';

// Components
import { Input } from 'components/input';
import { Tiny } from 'components/inline';
import { Column, Row, Button } from 'components/styled';
import { Loading, EmptyList, ColumnSpace } from 'components/blocks';

interface IProps {
  item?: IResume;
  user?: IUser;
}

interface IState {
  items?: IResume[];
  search?: string;
}

export class Resumes extends React.Component<IProps, IState> {
  public state: IState = {};

  public componentDidMount() {
    this.handleLoad();
  }

  public render() {
    const { user } = this.props;
    
    return (
      <>
        <form onSubmit={this.handleSend}>
          <ColumnSpace small={true}>
            <Row style={{ marginTop: "1rem" }}>
              <Column style={{ flexGrow: 1, marginRight: "1rem" }}>
                <Input autoFocus={true} name="msg" value={this.state.search} placeholder={"Поиск сотрудников"} onChange={this.handleChange}></Input>
              </Column>
              
              <Button>Поиск</Button>
            </Row>
          </ColumnSpace>
        </form>
        
        {!this.state.items && (
          <Loading />
        )}

        {this.state.items && !this.state.items.length && (
          <EmptyList />
        )}

        {this.state.items && !!this.state.items.length && this.state.items.map(item => item.user && item.user._id !== (user && user._id) && (
          <Resume item={item} user={this.props.user} />
        ))}
      </>
    );
  };
  
  private handleSend = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    this.handleLoad();
  };

  private handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({ search: e.currentTarget.value });
  };

  private handleLoad = () => {
    ResumeService.findItems({ name: this.state.search }).then(items => this.setState({ items }));
  };
}