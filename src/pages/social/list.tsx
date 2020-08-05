// Libs
import * as React from 'react';

// Types
import { IUser } from 'types/users';

// Includes
import { User } from '../profile/item';

// Services
import * as MessagesService from 'rest/messages';

// Components
import { Loading, EmptyList } from 'components/blocks';

interface IProps {
  user: IUser;
}

interface IState {
  items?: IUser[];
}

export class Chats extends React.Component<IProps, IState> {
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

        {this.state.items && !!this.state.items.length && this.state.items.map(item => <User item={item} user={user} to={`/social/${item._id}`} small={true} /> )}
      </>
    );
  };

  private handleLoad = () => {
    MessagesService.getDialogs().then(items => this.setState({ items }));
  };
}