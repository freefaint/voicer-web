// React
import * as React from 'react';

// Types
import { IUser } from 'types/users';

// Services
import * as UsersService from 'rest/users';

interface IUsersProps {
  type: string;
}

interface IUsersState {
  users?: IUser[];
}

export class Users extends React.Component<IUsersProps, IUsersState> {
  public state: IUsersState = {};

  public componentDidMount() {
    UsersService.getItems().then(users => this.handleFill(users));
  }

  public render() {
    return (
      <section>
        {this.state.users && this.state.users.map(user => (
          <>
            <div>
              {this.props.type === 'STUDENT' && (
                <>
                  <h3><a href="#">{user.companyName}</a></h3>
                  <p>Provide a brief description of your project. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatu.</p>             
                </>
              )}

              {this.props.type === 'COMPANY' && (
                <>
                  <h3><a href="#">{`${user.lastName} ${user.firstName} ${user.middleName}`}</a></h3>
                  <p>Provide a brief description of your project. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatu.</p>
                </>
              )}
            </div>
          </>
        ))}
      </section>
    )
  }

  private handleFill(users: IUser[]) {
    this.setState({ users: users.filter(i => i.type !== this.props.type) });
  }
}