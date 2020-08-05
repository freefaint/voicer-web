// Libs
import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';

// Types
import { IUser } from 'types/users';

// Common
import { getName } from 'common/users';

// Components
import { Title, Faded, H1 } from 'components/inline';
import { Column, Row, Center } from 'components/styled';
import { Full, LeftBlock, RightBlock, RowSpace, PanelBlock, OverflowBlock, ColumnSpace } from 'components/blocks';

// Includes
import { Menu } from './menu';
import { getTitle, getSubTitle } from './router';

// Pages
import { Auth } from 'pages/auth/auth';
import { Login } from 'pages/auth/login';
import { Register } from 'pages/auth/register';

import { Type } from 'pages/user/type';
import { Name } from 'pages/user/name';
import { Verify } from 'pages/user/verify';

import { Resumes } from 'pages/resume/list';
import { Resume } from 'pages/resume/resume';

import { Vacancies } from 'pages/vacancy/list';
import { Vacancy } from 'pages/vacancy/vacancy';

import { Chat } from 'pages/social/item';
import { Chats } from 'pages/social/list';

import { Users } from 'pages/profile/list';
import { Account } from 'pages/profile/account';
import { Company } from 'pages/profile/company';
import { Profile } from 'pages/profile/profile';

import { Hobby } from 'pages/profile/hobby';
import { Video } from 'pages/profile/video';
import { Skills } from 'pages/profile/skills';
import { Family } from 'pages/profile/family';
import { Education } from 'pages/profile/education';
import { Resume as ProfileResume } from "pages/profile/resume";
import { Vacancy as ProfileVacancy } from 'pages/profile/vacancy';

import { Panel as ProfilePanel } from 'pages/profile/panel';
import { AccountPanel } from 'pages/profile/account-panel';

// Assets
import { ReactComponent as IconNotify } from 'assets/icons/icons-notify.svg';

interface IProps {
  user?: IUser;
  
  fetching?: boolean;
  badCredentials?: boolean;

  onUpdate: (user: IUser) => void;
  onLogout: () => void;
  onVerify: (data: { code: string }) => void;
  onRegister: (user: IUser) => void;
  onLogin: (data: { login: string; password: string }) => void;
}

export class Site extends React.Component<IProps> {
  public render() {
    const { user, onLogout, onUpdate, onVerify } = this.props;
    
    const title = user && getName(user);
    const ready = !!user && !!user.verified && !!user.type && !!title;

    return (
      <Full>
        {!user && (
          <>
            <Route path="/account" render={props => <Redirect {...props} to="/auth" />} />
            <Route path="/social" render={props => <Redirect {...props} to="/auth" />} />
          </>
        )}

        <LeftBlock>
          <Route path="/:page?/:id?/:subPage?" render={ props => <Menu user={user} {...props.match.params} /> } />

          <Route path="/profile/:id/:page?" render={props => (
            <PanelBlock>
              <AccountPanel user={user} id={props.match.params.id} url={'/profile/' + props.match.params.id + '/'} page={props.match.params.page} />
            </PanelBlock>
          )} />

          {user && ready && (
            <Route path="/account/:page?" render={props => (
              <PanelBlock>
                <ProfilePanel page={props.match.params.page} url={'/account/'} user={user} onUpdate={onUpdate} />
              </PanelBlock>
            )} />
          )}
        </LeftBlock>

        <RightBlock>
          <Route path="/" render={props => (
            <RowSpace>
              <Column>
                <Title>{getTitle(props.location.pathname)}</Title>
                
                <Faded>{getSubTitle(props.location.pathname)}</Faded>
              </Column>
              
              <Row style={{ alignItems: "center" }}>
                {user && (
                  <Column>
                    <IconNotify />
                  </Column>
                )}

                <Auth user={user} onLogout={onLogout} />
              </Row>
            </RowSpace>
          )} />

          <OverflowBlock>
            <>
              {!user && (
                <>
                  <Route path="/auth" render={ props => <Login {...props} {...this.props} />}></Route>
                  <Route path="/register" render={ props => <Register {...props} {...this.props} />}></Route>
                </>
              )}

              <Route path="/" exact={true} render={props => (
                <Row>
                  <Column>
                    <ColumnSpace>
                      <H1>Студенты</H1>
                    </ColumnSpace>
                  
                    <Users user={user} type="STUDENT" />
                  </Column>

                  <Column>
                    <ColumnSpace>
                      <H1>Профессионалы</H1>
                    </ColumnSpace>

                    <Users user={user} type="PRO" />
                  </Column>

                  <Column>
                    <ColumnSpace>
                      <H1>Работодатели</H1>
                    </ColumnSpace>
                  
                    <Users user={user} type="COMPANY" />
                  </Column>
                </Row>
              )} />

              {user && (
                <>
                  <Route path="/auth" exact={true} render={ props => <Redirect {...props} to="/account" /> } />
                  <Route path="/register" exact={true} render={ props => <Redirect {...props} to="/account" /> } />

                  <Route path="/account/education" exact={true} render={props => (
                    <Education me={user} user={user} onUpdate={onUpdate} />
                  )} />

                  <Route path="/account/resume" exact={true} render={props => (
                    <ProfileResume me={user} user={user} onUpdate={onUpdate} />
                  )} />

                  <Route path="/account/vacancy" exact={true} render={props => (
                    <ProfileVacancy me={user} user={user} onUpdate={onUpdate} />
                  )} />

                  <Route path="/account/skills" exact={true} render={props => (
                    <Skills me={user} user={user} onUpdate={onUpdate} />
                  )} />

                  <Route path="/account/family" exact={true} render={props => (
                    <Family me={user} user={user} onUpdate={onUpdate} />
                  )} />

                  <Route path="/account/hobby" exact={true} render={props => (
                    <Hobby me={user} user={user} onUpdate={onUpdate} />
                  )} />

                  <Route path="/account/video" exact={true} render={props => (
                    <Video me={user} user={user} onUpdate={onUpdate} />
                  )} />

                  <Route path="/account" exact={true} render={props => (
                    <>
                      {!ready && (
                        <Column style={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
                          <Column>
                            {!user.verified && (
                              <Verify onVerify={onVerify} />
                            )}
                  
                            {user.verified && !user.type && (
                              <Type onUpdate={onUpdate} />
                            )}
                  
                            {user.verified && user.type && !title && (
                              <Name user={user} onUpdate={onUpdate} />
                            )}
                          </Column>
                        </Column>
                      )}
      
                      {ready && (
                        <>
                          {user.type !== 'COMPANY' && (
                            <Profile me={user} user={user} onUpdate={onUpdate} />
                          )}

                          {user.type === 'COMPANY' && (
                            <Company me={user} user={user} onUpdate={onUpdate} />
                          )}
                        </>
                      )}
                    </>
                  )} />

                  <Route path="/social" exact={true} render={props => (
                    <Column>
                      <ColumnSpace>
                        <H1>Ваши чаты</H1>
                      </ColumnSpace>
                    
                      <Chats user={user} />
                    </Column>
                  )} />

                  <Route path="/social/:id" exact={true} render={props => (
                    <Column style={{ flexGrow: 1 }}>
                      <ColumnSpace>
                        <H1>Переписка</H1>
                      </ColumnSpace>
                    
                      <ColumnSpace style={{ flexGrow: 1 }}>
                        <Chat user={user} id={props.match.params.id} />
                      </ColumnSpace>
                    </Column>
                  )} />
                </>
              )}

              <Route path="/profile/:id/:subPage?" render={props => (
                <Account user={user} id={props.match.params.id} subPage={props.match.params.subPage} />
              )} />

              <Route path="/students" exact={true} render={props => (
                <Column>
                  <ColumnSpace>
                    <H1>Студенты, профессионалы</H1>
                  </ColumnSpace>
                
                  <Users user={user} type="STUDENT" />
                  <Users user={user} type="PRO" />
                </Column>
              )} />

              <Route path="/resume" exact={true} render={props => (
                <Column>
                  <ColumnSpace>
                    <H1>Поиск резюме</H1>
                  </ColumnSpace>
                
                  <Resumes user={user} />
                </Column>
              )} />

              <Route path="/resume/:id" exact={true} render={props => (
                <Column style={{ flexGrow: 1 }}>
                  <ColumnSpace>
                    <H1>Резюме</H1>
                  </ColumnSpace>
                
                  <Resume user={user} id={props.match.params.id} />
                </Column>
              )} />

              <Route path="/vacancy" exact={true} render={props => (
                <Column>
                  <ColumnSpace>
                    <H1>Поиск вакансий</H1>
                  </ColumnSpace>
                
                  <Vacancies user={user} />
                </Column>
              )} />

              <Route path="/vacancy/:id" exact={true} render={props => (
                <Column style={{ flexGrow: 1 }}>
                  <ColumnSpace>
                    <H1>Вакансия</H1>
                  </ColumnSpace>
                
                  <Vacancy user={user} id={props.match.params.id} />
                </Column>
              )} />

              <Route path="/employer" exact={true} render={props => (
                <Column>
                  <ColumnSpace>
                    <H1>Работодатели</H1>
                  </ColumnSpace>
                
                  <Users user={user} type="COMPANY" />
                </Column>
              )} />
            </>
          </OverflowBlock>
        </RightBlock>
      </Full>
    );
  };
}