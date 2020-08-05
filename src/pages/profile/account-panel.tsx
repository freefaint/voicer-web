// Libs
import * as React from 'react';

// Types
import { IUser } from 'types/users';

// Includes
import { Panel } from './panel';

// Services
import * as UsersService from 'rest/users';

interface IProps {
  url: string;
  id: string;
  page?: string;
  user?: IUser;
}

interface IState {
  user?: IUser;
}

export class AccountPanel extends React.Component<IProps, IState> {
  public state: IState = {};

  public componentDidMount() {
    UsersService.getItem(this.props.id).then(user => this.setState({ user }));
  };

  public render() {
    return (
      <>
        {this.state.user && (
          <Panel me={this.props.user} page={this.props.page} url={this.props.url} user={this.state.user} onUpdate={() => null} />
        )}
      </>
    );
  };
}