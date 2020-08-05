// Libs
import * as React from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

// Components
import { Row, Column } from 'components/styled';

// Assets
import { ReactComponent as IconAdd } from 'assets/icons/icons-add-mini.svg';

export const Text = styled.span`
  font-size: 1rem;
  line-height: 1.5rem;
`;

export const Tiny = styled.span`
  font-size: 0.75rem;
  line-height: 1rem;
`;

export const White = styled(Text)`
  color: #fff;
`;

export const Faded = styled(Text)`
  opacity: 0.64;
`;

export const FadedTiny = styled(Tiny)`
  opacity: 0.64;
`;

export const FadedWhite = styled(White)`
  opacity: 0.64;
`;

export const Title = styled(Text)`
  font-family: SFProRounded;
  font-size: 1.375rem;
  font-weight: bold;
  line-height: 1.1;
  color: #363636;
`;

export const WhiteTitle = styled(White)`
  font-family: SFProRounded;
  font-weight: 500;
  font-size: 1.125rem;
  line-height: 1.33;
`;

export const H1 = styled.h1`
  font-family: SFProRounded;
  font-size: 2rem;
  font-weight: 500;
  line-height: 1;
  margin: 0;
`;

export const H2 = styled.h2`
  font-family: SFProRounded;
  font-size: 1.125rem;
  font-weight: 500;
  line-height: 1.33;

  ${(p: { small?: boolean; }) => p.small && css`
    margin: 0;
  `};
`;

export const ALink = styled(Link)`
  text-decoration: none;
  color: #277bc9;
`;

export class AddLink extends React.Component<{ onClick?: () => void }> {
  public render() {
    return (
      <Row style={{ cursor: "pointer" }} onClick={this.props.onClick}>
        <IconAdd style={{ fill: "#277bc9", width: "1rem", marginRight: "0.5rem" }} />
  
        <Tiny style={{ color: "#277bc9" }}>Добавить</Tiny>
      </Row>
    );
  }
};