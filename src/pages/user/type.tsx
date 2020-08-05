// Libs
import * as React from 'react';

// Types
import { IUser } from 'types/users';

// Components
import { H1 } from 'components/inline';
import { FullCenter } from 'components/blocks';
import { Button, Column, Row } from 'components/styled';

export class Type extends React.Component<{ onUpdate: (user: IUser) => void }> {
  public render() {
    return (
      <FullCenter>
        <Column style={{ textAlign: "center" }}>
          <H1>Выберите тип аккаунта</H1>

          <Row>
            <Column style={{ margin: "0 1rem" }}>
              <Button onClick={this.handleStudent}>Я студент</Button>
            </Column>

            <Column style={{ margin: "0 1rem" }}>
              <Button onClick={this.handlePro}>Я профессионал</Button>
            </Column>

            <Column style={{ margin: "0 1rem" }}>
              <Button onClick={this.handleCompany}>Я ищу специалистов</Button>
            </Column>
          </Row>
        </Column>
      </FullCenter>
    );
  };

  private handleStudent = () => {
    this.props.onUpdate({ type: 'STUDENT' });
  };

  private handleCompany = () => {
    this.props.onUpdate({ type: 'COMPANY' });
  };

  private handlePro = () => {
    this.props.onUpdate({ type: 'PRO' });
  };
}