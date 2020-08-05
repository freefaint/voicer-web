// Libs
import * as React from 'react';
import { Link } from 'react-router-dom';

// Types
import { IUser } from 'types/users';
import { IVacancy } from 'types/vacancy';

// Includes
import { Name } from '../profile/name';
import { Photo } from '../profile/photo';

// Components
import { ALink } from 'components/inline';
import { CenterRow, Column, Row } from 'components/styled';
import { ColumnSpace, ColumnGrow } from 'components/blocks';

// Assets
import { ReactComponent as IconMail } from 'assets/icons/icons-mail-blue.svg';

interface IProps {
  item: IVacancy;
  to?: string;
  user?: IUser;
}

export class Vacancy extends React.Component<IProps> {
  public render() {
    const item = this.props.item;

    if (!item.user) {
      return;
    }

    return (
      <CenterRow>
        <ColumnSpace small={true} style={{ flexGrow: 1 }}>
          <Row>
            <Column style={{ marginRight: "1rem" }}>
              <Link to={this.props.to || `/profile/${item.user._id}`}>
                <Photo small={true} user={item.user} />
              </Link>
            </Column>

            <ColumnGrow>
              <ALink to={this.props.to || `/vacancy/${item._id}`}>
                {item.name}, {item.salary && item.salary + ' руб/мес'}
              </ALink>

              <Name small={true} user={item.user} />
            </ColumnGrow>

            {this.props.user && (
              <Column style={{ marginLeft: "1rem" }}>
                <Link title="Чат" to={`/social/${item.user._id}`} style={{ textDecoration: "none" }}>
                  <IconMail />
                </Link>
              </Column>
            )}
          </Row>
        </ColumnSpace>
      </CenterRow>
    );
  };
}