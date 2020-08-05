// Libs
import * as React from 'react';
import { Provider, connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { BrowserRouter } from 'react-router-dom';

// Store
import { Store, IStore } from 'store';
import * as storeActions from 'store/functions';

// Types
import { IUser } from 'types/users';

// Includes
import { Site } from './site';

// Components
import { Loading } from 'components/blocks';
import { FullPage } from 'components/styled';

class Container extends React.Component<TMainProps> {
  public componentDidMount() {
    this.props.getUser();
  }

  public render() {
    const { user, fetching, badCredentials, register, login, verify, logout, updateUser } = this.props;

    if (!this.props.loaded) {
      return (
        <FullPage>
          <Loading />
        </FullPage>
      );
    }

    return (
      <BrowserRouter>
        <Site
          user={user}
          badCredentials={badCredentials}
          fetching={fetching}
          onLogout={logout}
          onLogin={login} 
          onUpdate={updateUser}
          onVerify={verify}
          onRegister={register}
        />
      </BrowserRouter>
    );
  }
}

interface IProps {
  user?: IUser;
  loaded?: boolean;
  fetching?: boolean;
  badCredentials?: boolean;
}

interface IActions {
  login: (data: { login: string; password: string }) => void;
  verify: (data: { code: string }) => void;
  register: (user: IUser) => void;
  logout: () => void;
  getUser: () => void;
  updateUser: (user: IUser) => void;
}

type TMainProps = IProps & IActions;

function mapStateToProps(state: IStore): IProps {
  const { store } = state;

  return { ...store };
}

function mapDispatchToProps(dispatch: Dispatch): IActions {
  return bindActionCreators(storeActions, dispatch);
}

const enhance = connect(mapStateToProps, mapDispatchToProps);

const Main = enhance(Container);

export class App extends React.Component {
  public render() {
    return (
      <Provider store={Store}>
        <Main />
      </Provider>
    );
  }
}
