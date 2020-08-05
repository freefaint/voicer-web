// Libs
import * as React from 'react';
import styled, { css } from 'styled-components';
import { Link, LinkProps } from 'react-router-dom';

// Components
import { Column } from 'components/styled';

// Includes
import { router } from './router';

// Types
import { IUser } from 'types/users';

interface IMenuItem {
  current?: boolean;
}

const MenuItemBlock = styled(Link)`
  display: flex;
  padding: 2.25rem;
  transition: 0.25s ease-out all;

  :hover {
    background-color: rgba(255, 255, 255, 0.08);
  }

  ${(p: IMenuItem) => p.current && css`
    cursor: default;
    background-color: rgba(255, 255, 255, 0.08);
  `};
`;

const MenuItem = (props: LinkProps & IMenuItem) => {
  return (
    <MenuItemBlock {...props} />
  );
};

const MenuBlock = styled(Column)`
  width: 6rem;
`;

interface IProps {
  page?: string;
  id?: string;
  subPage?: string;
  user?: IUser;
}

export class Menu extends React.Component<IProps> {
  public render() {
    console.log(this.props.page, this.props.id, this.props.subPage);
    
    return (
      <MenuBlock>
        {router.map(item => (!item.personal || (item.personal && !!this.props.user)) && (!item.type || (!!item.type && !!this.props.user && this.props.user.type === item.type)) && (
          <MenuItem current={this.props.page === item.to} children={item.icon} key={item.key} to={item.to} title={item.title} />
        ))}
      </MenuBlock>
    )
  }
}