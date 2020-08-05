// Libs
import * as React from 'react';

// Types
import { IUser } from 'types/users';

// Includes
import { User } from './item';

// Services
import * as UsersService from 'rest/users';

// Components
import { Loading, EmptyList } from 'components/blocks';

interface IProps {
  type: string;
  user?: IUser;
}

interface IState {
  items?: IUser[];
}

export class Users extends React.Component<IProps, IState> {
  public state: IState = {};

  public componentDidMount() {
    this.handleLoad();
  }

  public render() {
    const { user } = this.props;
    
    return (
      <>
        {!this.state.items && (
          <Loading />
        )}

        {this.state.items && !this.state.items.length && (
          <EmptyList />
        )}

        {this.state.items && !!this.state.items.length && this.state.items.map(item => item._id !== (user && user._id) && <User small={true} item={item} user={user} /> )}
      </>
    );
  };

  private handleLoad = () => {
    UsersService.findItems({ type: this.props.type }).then(items => this.setState({ items }));
  };
}