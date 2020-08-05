// Libs
import * as React from 'react';
import { Link } from 'react-router-dom';

// Types
import { IUser } from 'types/users';
import { IResume } from 'types/resume';

// Services
import * as UsersService from 'rest/users';
import * as ResumeService from 'rest/resume';

// Components
import { ColumnSpace } from 'components/blocks';
import { CenterRow, Column } from 'components/styled';

// Includes
import { Resume as ResumeItem } from './item';

// Assets
import { ReactComponent as IconMail } from 'assets/icons/icons-mail-blue.svg';

interface IProps {
  id: string;
  to?: string;
  user?: IUser;
}

interface IState {
  item?: IResume;
}

export class Resume extends React.Component<IProps, IState> {
  public state: IState = {};

  public componentDidMount() {
    ResumeService.getItem(this.props.id).then(item => this.setState({ item }));
  };

  public render() {
    return (
      <CenterRow>
        {this.state.item && (
          <ResumeItem item={this.state.item} user={this.props.user} />
        )}
      </CenterRow>
    );
  };
}