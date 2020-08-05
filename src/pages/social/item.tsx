// Libs
import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Types
import { IUser } from 'types/users';
import { IMessage } from 'types/messages';

// Includes
import { Name } from '../profile/name';
import { Photo } from '../profile/photo';

// Services
import * as UsersService from 'rest/users';
import * as MessagesService from 'rest/messages';

// Components
import { Input } from 'components/input';
import { Tiny, ALink } from 'components/inline';
import { Column, Row, Button, CenterRow } from 'components/styled';
import { Loading, EmptyList, ColumnSpace } from 'components/blocks';

interface IProps {
  id: string;
  user: IUser;
}

interface IState {
  user?: IUser;
  msg?: string;
  items?: IMessage[];
  timer?: number;
}

const Message = styled(Column)`
  width:50%;
  margin-bottom: 1rem;
  border-radius: 1rem;
  padding: 1rem;
`;

const MyMessage = styled(Message)`
  border: 0.0625rem solid #e7e7e7;
`;

const MeMessage = styled(Message)`
  align-self: flex-end;
  background-color: #4c6;
  color: #fff;
`;

export class Chat extends React.Component<IProps, IState> {
  public state: IState = {};

  public componentDidMount() {
    UsersService.getItem(this.props.id).then(user => this.setState({ user }));

    this.handleLoad();
  };

  public componentWillUnmount() {
    if (this.state.timer) {
      clearTimeout(this.state.timer);
    }
  };

  public render() {
    const { id } = this.props;
    const { user } = this.state;
    
    return (
      <>
        {user && (
          <CenterRow>
            <Column style={{ marginRight: "2rem" }}>
              <Link to={`/profile/${user._id}`}>
                <Photo small={true} user={user} />
              </Link>
            </Column>

            <Column>
              <ALink to={`/profile/${user._id}`}>
                <Name small={true} user={user} />
              </ALink>
            </Column>
          </CenterRow>
        )}

        <Column style={{ flexGrow: 1 }}>
          <>
            {(!this.state.items || !this.state.user) && (
              <Loading />
            )}

            {this.state.items && !this.state.items.length && (
              <EmptyList />
            )}

            {this.state.items && !!this.state.items.length && (
              <Column style={{ flexGrow: 1, justifyContent: "flex-end" }}>
                {this.state.items.sort((i, j) => {
                  if (i.date && j.date && i.date > j.date) {
                    return 1;
                  }

                  if (i.date && j.date && i.date < j.date) {
                    return -1;
                  }

                  return 0;
                }).map(item => (
                  <>
                    {item.to === this.props.id ? (
                      <MyMessage>
                        <div>{item.text}</div>

                        <Tiny style={{ textAlign: "right" }}>{item.date && (new Date(item.date).toLocaleString())}</Tiny>
                      </MyMessage>
                    ) : (
                      <MeMessage>
                        <div>{item.text}</div>

                        <Tiny style={{ textAlign: "right" }}>{item.date && (new Date(item.date).toLocaleString())}</Tiny>
                      </MeMessage>
                    )}
                  </>
                ))}
              </Column>
            )}
          </>

          <form onSubmit={this.handleSend}>
            <Row style={{ marginTop: "1rem" }}>
              <Column style={{ flexGrow: 1, marginRight: "1rem" }}>
                <Input autoFocus={true} name="msg" value={this.state.msg} placeholder={"Сообщение"} onChange={this.handleChange}></Input>
              </Column>
              
              <Button disabled={!this.state.msg}>Отправить</Button>
            </Row>
          </form>
        </Column>
      </>
    );
  };

  private handleSend = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (this.state.msg) {
      MessagesService.send(this.props.id, { text: this.state.msg }).then(() => {
        this.setState(state => {
          const items = [ ...state.items || [] ];

          items.push({ from: this.props.user._id, to: this.props.id, date: new Date().toISOString(), text: state.msg });

          return { msg: '', items };
        });
      })
    }
  };

  private handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({ msg: e.currentTarget.value });
  };

  private handleLoad = () => {
    MessagesService.getDialog(this.props.id).then(items => {
      this.setState({ items, timer: setTimeout(this.handleLoad, 5000) });
    });
  };
}