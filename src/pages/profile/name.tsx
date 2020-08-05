// Libs
import * as React from 'react';

// Types
import { IUser } from 'types/users';

// Common
import { getName } from 'common/users';

// Components
import { Column } from 'components/styled';
import { H1, H2, FadedTiny } from 'components/inline';

export const Name = (props: { user: IUser; small?: boolean; }) => (
  <Column>
    <FadedTiny>{props.user.type === 'STUDENT' ? 'Студент' : props.user.type === 'PRO' ? 'Профессионал' : 'Работодатель'}</FadedTiny>
    
    {!!props.small && <H2 small={true}>{getName(props.user)}</H2>}
    {!props.small && <H1>{getName(props.user)}</H1>}
  </Column>
);
