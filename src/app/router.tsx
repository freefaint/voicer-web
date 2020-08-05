// Libs
import * as React from 'react';

// Assets
import { ReactComponent as IconAccount } from 'assets/icons/icons-account.svg';
import { ReactComponent as IconVacancy } from 'assets/icons/icons-vacancy.svg';
import { ReactComponent as IconEmployer } from 'assets/icons/icons-employer.svg';
import { ReactComponent as IconAwards } from 'assets/icons/icons-awards.svg';
import { ReactComponent as IconSocial } from 'assets/icons/icons-social.svg';
import { ReactComponent as IconWeb } from 'assets/icons/icons-web.svg';
import { ReactComponent as IconStudent } from 'assets/icons/icons-hat.svg';
import { ReactComponent as IconResume } from 'assets/icons/icons-resume.svg';

interface IMenuItemData {
  key: string,
  to: string;
  icon: React.ReactNode;
  title: string;
  subTitle?: string;
  type?: 'STUDENT' | 'COMPANY' | 'PRO';
  personal?: boolean;
}

interface Title {
  to: string;
  title: string;
  subTitle?: string;
}

export const router: IMenuItemData[] = [
  {
    key: 'main',
    title: 'Профильстор',
    icon: <IconWeb />,
    to: '/',
  },
  {
    key: 'account',
    title: 'Профиль',
    icon: <IconAccount />,
    to: '/account',
    personal: true,
  },
  {
    key: 'employer',
    title: 'Работодатели',
    icon: <IconEmployer />,
    to: '/employer'
  },
  {
    key: 'students',
    title: 'Студенты',
    icon: <IconStudent />,
    to: '/students'
  },
  {
    key: 'vacancy',
    title: 'Вакансии',
    icon: <IconVacancy />,
    to: '/vacancy',
  },
  {
    key: 'resume',
    title: 'Резюме',
    icon: <IconResume />,
    to: '/resume'
  },
  // {
  //   key: 'awards',
  //   title: 'Награды',
  //   icon: <IconAwards />,
  //   to: '/awards',
  //   personal: true,
  // },
  {
    key: 'social',
    title: 'Сообщения',
    icon: <IconSocial />,
    to: '/social',
    personal: true,
  },
];

const titles: Title[] = [
  {
    to: '/',
    title: 'Профильстор',
  },
  {
    to: '/auth',
    title: 'Профильстор',
    subTitle: 'Аутентификация',
  },
  {
    to: '/register',
    title: 'Профильстор',
    subTitle: 'Регистрация',
  },
  {
    to: '/account',
    title: 'Профиль',
    subTitle: 'Персональные данные',
  },
  {
    to: '/account/education',
    title: 'Профиль',
    subTitle: 'Образование',
  },
  {
    to: '/account/skills',
    title: 'Профиль',
    subTitle: 'Ключевые навыки',
  },
  {
    to: '/account/video',
    title: 'Профиль',
    subTitle: 'Видео',
  },
  // {
  //   to: '/account/family',
  //   title: 'Профиль',
  //   subTitle: 'Семья',
  // },
  // {
  //   to: '/account/hobby',
  //   title: 'Профиль',
  //   subTitle: 'Хобби, спорт, искусства',
  // },
  {
    to: '/account/vacancy',
    title: 'Профиль',
    subTitle: 'Вакансии',
  },
  {
    to: '/account/resume',
    title: 'Профиль',
    subTitle: 'Резюме',
  },
  {
    title: 'Вакансии',
    to: '/vacancy',
  },
  {
    title: 'Работодатели',
    to: '/employer',
  },
  {
    title: 'Студенты',
    to: '/students',
  },
  {
    title: 'Резюме',
    to: '/resume',
  },
  {
    title: 'Награды',
    to: '/awards',
  },
  {
    title: 'Сообщения',
    to: '/social',
  },
];

export const getTitle = (path: string) => {
  const parts = path.split('/');
  const page = titles.find(page => page.to === path) || titles.find(page => page.to === '/' + path[1]);

  return page && page.title;
}

export const getSubTitle = (path: string) => {
  const page = titles.find(page => page.to === path);

  return page && page.subTitle;
}