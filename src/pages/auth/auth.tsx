// Libs
import * as React from 'react';

// Types
import { IUser } from 'types/users';

// Components
import { BlockLink } from 'components/blocks';
import { Button, Row, Column } from 'components/styled';
import { GoogleButton, FacebookButton } from 'components/buttons';
import { PromiseProvider } from 'mongoose';

export const Auth = (props: { user?: IUser; onLogout?: () => void; }) => {
  return (
    <Column>
      {props.user && (
        <Row>
          <Column style={{ margin: '0 1rem' }}>
            <Button onClick={props.onLogout}>Выйти</Button>
          </Column>
        </Row>
      )}

      {!props.user && (
        <Row>
          <Column style={{ margin: '0 1rem' }}>
            <BlockLink to="/auth">
              <Button>Войти</Button>
            </BlockLink>
          </Column>
          
          <Column style={{ margin: '0 1rem' }}>
            <BlockLink to="/register">
              <Button>Зарегистрироваться</Button>  
            </BlockLink>  
          </Column>
          
          {/* <Column style={{ margin: '0 1rem' }}>
            <a href="/auth/google">
              <GoogleButton>Аккаунт Google</GoogleButton>
            </a>
          </Column>
          
          <Column style={{ margin: '0 1rem' }}>
            <a href="/auth/facebook">
              <FacebookButton>Аккаунт Facebook</FacebookButton>
            </a>
          </Column> */}
        </Row>
      )}
    </Column>
  );
};