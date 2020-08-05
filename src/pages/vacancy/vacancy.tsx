// Libs
import * as React from 'react';
import { Link } from 'react-router-dom';

// Types
import { IUser } from 'types/users';
import { IVacancy } from 'types/vacancy';

// Services
import * as UsersService from 'rest/users';
import * as VacancyService from 'rest/vacancy';

// Components
import { ColumnSpace } from 'components/blocks';
import { CenterRow, Column } from 'components/styled';

// Includes
import { Vacancy as VacancyItem } from './item';

// Assets
import { ReactComponent as IconMail } from 'assets/icons/icons-mail-blue.svg';

interface IProps {
  id: string;
  to?: string;
  user?: IUser;
}

interface IState {
  item?: IVacancy;
}

export class Vacancy extends React.Component<IProps, IState> {
  public state: IState = {};

  public componentDidMount() {
    VacancyService.getItem(this.props.id).then(item => this.setState({ item }));
  };

  public render() {
    return (
      <CenterRow>
        {this.state.item && (
          <VacancyItem item={this.state.item} user={this.props.user} />
        )}
      </CenterRow>
    );
  };
}