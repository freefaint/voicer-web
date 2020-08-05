// Libs
import * as React from 'react';
import styled, { css } from 'styled-components';

// Assets
import cameraSvgSrc from 'assets/camera.svg';

const Image = styled.div`
  display: flex;
  border-radius: 50%;
  box-shadow: inset 0px 0px 0.5rem rgba(0,0,0,1);
  transition: all 0.25s ease-out;

  ${(p: { main?: boolean; none?: boolean, src: string, active?: boolean; small?: boolean; }) => css`
    width: ${p.small ? '4rem' : '6rem'};
    height: ${p.small ? '4rem' : '6rem'};
    cursor: ${p.active ? 'pointer' : 'default'}
    opacity: ${p.none ? 0.25 : 1};
    background-color: #fff;
    background-image: url(${p.src});
    background-repeat: no-repeat;
    background-position: center center;
    background-size: ${p.none ? '50%' : 'cover'};
    transition: 200ms ease-out all;

    :hover {
      opacity: ${p.none ? p.active ? 0.5 : 0.25 : 1};
    }

    ${p.main && css`
      transform: scale(1.2);
    `};
  `};
`;

export class Avatar extends React.Component<{ main?: boolean; active?: boolean; small?: boolean; } & React.HTMLProps<HTMLImageElement>> {
  public render() {
    const { src, main, small, active, onClick } = this.props;

    return (
      <Image main={main} small={small} none={!src} onClick={active ? onClick : () => window.open(src, '_blank')} active={active} src={src || cameraSvgSrc} />
    );
  }
}
