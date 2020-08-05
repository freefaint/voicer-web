// Libs
import * as React from 'react';
import { Link } from 'react-router-dom';

// Types
import { IUser } from 'types/users';

// Includes
import { Name } from './name';
import { Photo } from './photo';

// Components
import { ALink } from 'components/inline';
import { CenterRow, Column, Row } from 'components/styled';
import { ColumnSpace, ColumnGrow } from 'components/blocks';

// Assets
import { ReactComponent as IconMail } from 'assets/icons/icons-mail-blue.svg';

interface IProps {
  item: IUser;
  small?: boolean;
  to?: string;
  user?: IUser;
}

export class User extends React.Component<IProps> {
  public render() {
    const user = this.props.item;

    return (
      <CenterRow>
        <ColumnSpace small={true} style={{ flexGrow: 1 }}>
          <Row>
            <Column style={{ marginRight: "1rem" }}>
              <Link to={this.props.to || `/profile/${user._id}`}>
                <Photo small={this.props.small} user={user} />
              </Link>
            </Column>

            <ColumnGrow>
              <ALink to={this.props.to || `/profile/${user._id}`}>
                <Name small={this.props.small} user={user} />
              </ALink>
            </ColumnGrow>

            {this.props.user && (
              <Column style={{ marginLeft: "1rem" }}>
                <ALink title="Чат" to={`/social/${user._id}`} style={{ textDecoration: "none" }}>
                  <IconMail />
                </ALink>
              </Column>
            )}
          </Row>
        </ColumnSpace>
      </CenterRow>
    );
  };
}