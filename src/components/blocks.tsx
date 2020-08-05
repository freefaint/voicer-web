// Libs
import * as React from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

// Styles
import { COLORS } from 'styles/colors';
import { scaleInfinity } from 'styles/animations';

// Components
import { Row, Column } from 'components/styled';

export const Full = styled.div`
  display: flex;
  width: calc(100vw);
  height: calc(100vh);
`;

export const LeftBlock = styled(Row)`
  background: linear-gradient(180deg, #2783d8 0%, #371396 100%);
`;

export const RightBlock = styled(Column)`
  flex-grow: 1;
`;

export const Justify = styled(Row)`
  justify-content: space-between;
  justify-items: center;
`;

export const RowSpace = styled(Row)`
  justify-content: space-between;
  justify-items: center;
  padding: 2rem 3.5rem;
  border-bottom: 0.0625rem solid #c5c5c5;
`;

export const ColumnSpace = styled(Column)`
  padding: ${(p: { small?: boolean }) => p.small ? '1rem 2rem 1rem 3.5rem' : '3rem 3.5rem'};
`;

export const ColumnGrow = styled(Column)`
  flex-grow: 1;
`;

export const FullCenter = styled(Row)`
  justify-content: center;
  flex-grow: 1;
  align-items: center;
`;

export const BlockLink = styled(Link)`
  display: flex;
  text-decoration: none;
`;

export const EmptyArea = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;

  align-items: center;
  justify-content: center;

  font-size: 1.25rem;
  color: ${COLORS.GRAY};
`;

export const OverflowBlock = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fafafa;
  overflow-y: auto;
  flex-grow: 1;

  ::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 4px;
    height: 4px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

export function EmptyList(p: { text?: string }) {
  return <EmptyArea style={{ margin: '0.5rem 0' }}>{p.text || 'Список не содержит записей'}</EmptyArea>;
}

export function NotExists(p: { text?: string }) {
  return <EmptyArea style={{ margin: '0.5rem 0' }}>{p.text || 'Элемент не существует'}</EmptyArea>;
}

interface IBallProps {
  delay?: string;
}

const Ball = styled.div`
  display: flex;

  width: 0.5rem;
  height: 0.5rem;
  margin: 0 0.25rem;

  border-radius: 50%;
  background-color: ${COLORS.BLUE};

  animation-iteration-count: infinite;
  animation-name: ${scaleInfinity};
  animation-duration: 2s;

  ${(p: IBallProps) =>
    p.delay &&
    css`
      animation-delay: ${p.delay};
    `};
`;

export const Loading = () => (
  <EmptyArea>
    <Row>
      <Ball delay="-0.8s" />
      <Ball delay="-0.6s" />
      <Ball delay="-0.4s" />
      <Ball delay="-0.2s" />
      <Ball />
    </Row>
  </EmptyArea>
);

export const PanelBlock = styled.div`
  width: 19.5rem;
  background: rgba(255, 255, 255, 0.08);
`;
