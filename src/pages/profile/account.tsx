// Libs
import * as React from 'react';

// Types
import { IUser } from 'types/users';

// Includes
import { Profile } from './profile';
import { Company } from './company';
import { Hobby } from 'pages/profile/hobby';
import { Video } from 'pages/profile/video';
import { Skills } from 'pages/profile/skills';
import { Family } from 'pages/profile/family';
import { Education } from 'pages/profile/education';
import { Resume as ProfileResume } from "pages/profile/resume";
import { Vacancy as ProfileVacancy } from 'pages/profile/vacancy';

// Services
import * as UsersService from 'rest/users';

interface IProps {
  id: string;
  subPage?: string;
  user?: IUser;
}

interface IState {
  user?: IUser;
}

export class Account extends React.Component<IProps, IState> {
  public state: IState = {};

  public componentDidMount() {
    UsersService.getItem(this.props.id).then(user => this.setState({ user }));
  };

  public render() {
    return (
      <>
        {this.state.user && !this.props.subPage && (
          <>
            {this.state.user.type !== 'COMPANY' && (
              <Profile me={this.props.user} user={this.state.user} onUpdate={() => null} />
            )}

            {this.state.user.type === 'COMPANY' && (
              <Company me={this.props.user} user={this.state.user} onUpdate={() => null} />
            )}
          </>
        )}

        {this.state.user && this.props.subPage && (
          <>
            {this.props.subPage === 'education' && (
              <Education me={this.props.user} user={this.state.user} onUpdate={() => null} />
            )}

            {this.props.subPage === 'resume' && (
              <ProfileResume me={this.props.user} user={this.state.user} onUpdate={() => null} />
            )}

            {this.props.subPage === 'vacancy' && (
              <ProfileVacancy me={this.props.user} user={this.state.user} onUpdate={() => null} />
            )}

            {this.props.subPage === 'skills' && (
              <Skills me={this.props.user} user={this.state.user} onUpdate={() => null} />
            )}

            {this.props.subPage === 'family' && (
              <Family me={this.props.user} user={this.state.user} onUpdate={() => null} />
            )}

            {this.props.subPage === 'hobby' && (
              <Hobby me={this.props.user} user={this.state.user} onUpdate={() => null} />
            )}

            {this.props.subPage === 'video' && (
              <Video me={this.props.user} user={this.state.user} onUpdate={() => null} />
            )}
          </>
        )}
      </>
    );
  };
}