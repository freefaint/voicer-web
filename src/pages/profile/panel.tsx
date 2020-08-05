// Libs
import * as React from 'react';
import styled from 'styled-components';
import { Link, LinkProps } from 'react-router-dom';

// Types
import { IUser } from 'types/users';

// Common
import { getName } from 'common/users';

// Includes
import { Photo } from './photo';

// Components
import { Justify } from 'components/blocks';
import { Column, Center } from 'components/styled';
import { WhiteTitle, FadedWhite, White } from 'components/inline';

// Assets
import { ReactComponent as IconNext } from 'assets/icons/icons-next.svg';


interface IProps {
  url: string;
  me?: IUser;
  page?: string;
  user: IUser;
  onUpdate: (user: IUser) => void;
}

export class Panel extends React.Component<IProps> {
  public render() {
    const title = getName(this.props.user);

    const { nick } = this.props.user;

    return (
      <Center style={{ marginTop: "6rem" }}>
        <Photo readOnly={this.props.me && this.props.me._id !== this.props.user._id} user={this.props.user} onUpdate={this.props.onUpdate} />

        <Column style={{ marginTop: "1.25rem" }}>
          <WhiteTitle>{title}</WhiteTitle>
          {nick && <FadedWhite>@{nick}</FadedWhite>}
        </Column>

        <Column style={{ marginTop: "1.5rem" }}>
          <FadedWhite>Заполненность профиля: 65%</FadedWhite>
        </Column>
        
        <Column style={{ marginTop: "4rem" }}>
          <Submenu to={this.props.page || ''} url={this.props.url} user={this.props.user} />
        </Column>
      </Center>
    );
  }
}

const SubLinkRow = styled(Justify)`
  width: 14rem;
  margin: 0.5rem 0;
`;

interface ISubMenu {
  types?: string[];
}

interface LinkCurrentProps {
  current: boolean;
}

const SubLink = (props: LinkProps & LinkCurrentProps) => props.current ?
  (
    <SubLinkRow>
      <White>{props.title}</White>

      <IconNext />
    </SubLinkRow>
  ) : (
    <Link style={{ textDecoration: 'none' }} to={props.to}>
      <SubLinkRow>
        <FadedWhite>{props.title}</FadedWhite>
      </SubLinkRow>
    </Link>
  );

const submenu: Array<ISubMenu & LinkProps> = [
  {
    to: '',
    title: 'Персональные данные',
    types: ['STUDENT', 'PRO'],
  },
  {
    to: '',
    title: 'Описание',
    types: ['COMPANY'],
  },
  {
    to: 'education',
    title: 'Образование',
    types: ['STUDENT', 'PRO'],
  },
  {
    to: 'resume',
    title: 'Резюме',
    types: ['STUDENT', 'PRO'],
  },
  {
    to: 'vacancy',
    title: 'Вакансии',
    types: ['COMPANY'],
  },
  {
    to: 'skills',
    title: 'Ключевые навыки',
    types: ['STUDENT', 'PRO'],
  },
  {
    to: 'video',
    title: 'Видео',
    types: ['STUDENT', 'PRO'],
  },
  // {
  //   to: '/account/family',
  //   title: 'Семья',
  //   types: ['STUDENT', 'PRO'],
  // },
  // {
  //   to: '/account/hobby',
  //   title: 'Хобби, спорт, искусства',
  //   types: ['STUDENT', 'PRO'],
  // },
];

const Submenu = (props: { url: string; to: string; user: IUser; }) => {
  return (
    <>
      {submenu.map(item => (!item.types || (!props.user.type || item.types.indexOf(props.user.type) !== -1)) && (
        <SubLink {...item} current={props.to === item.to} to={props.url + item.to} />
      ))}
    </>
  );
}