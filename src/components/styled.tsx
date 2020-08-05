// React
import styled, { css } from 'styled-components';

// Styles
import { KIND_COLORS } from 'styles/colors';

interface IInputProps {
  invalid?: boolean;
}

export const FullPage = styled.div`
  display: flex;
  width: calc(100vw);
  height: calc(100vh);
  justify-content: center;
  align-items: center;
`;

export const Error = styled.div`
  padding: 1rem;
  font-size: 0.75rem;
  line-height: 1rem;
  padding: 0.4375rem 0.6875rem;
  border-radius: 0.1875rem;
  color: ${KIND_COLORS.danger.A100};
  background-color: ${KIND_COLORS.danger.A10};
  border: 0.0625rem solid ${KIND_COLORS.danger.B70};
`;

export const Field = styled.input`
  font-size: 1rem;
  line-height: 1.5rem;
  border: none;
  color: #000;

  :focus {
    outline: none;
  }
`;

export const MultiLine = styled.textarea`
  font-size: 1rem;
  line-height: 1.5rem;
  border: none;
  color: #000;

  :focus {
    outline: none;
  }
`;

export const Button = styled.button`
  display: flex;
  justify-content: center;
  font-style: bold;
  font-family: SFProRounded;
  text-decoration: none;
  cursor: pointer;
  padding: 0.625rem 1.5rem;
  font-size: 0.75rem;
  line-height: 1rem;
  border-radius: 0.1875rem;
  color: #fff;
  background-color: #277bc9;
  border: none;
  transition: 0.25s all ease-out;
  box-shadow: 0 3px 4px 0 rgba(0,0,0,.25);

  :disabled {
    cursor: default;
    opacity: 0.25;
  }

  :not(:disabled):active {
    background-color: #1669F2;
  }

  :not(:disabled):active,
  :not(:disabled):hover {
    box-shadow: 0 0 6px #4285f4;
  }
`;

export const Row = styled.div`
  display: flex;
`;

export const Justify = styled(Row)`
  justify-content: "space-between";
`;

export const CenterRow = styled(Row)`
  align-items: center;
`;

export const Column = styled(Row)`
  flex-direction: column;
`;

export const Center = styled(Column)`
  text-align: center;
  align-items: center;
`;

interface IInputState {
  focused?: boolean;
  filled?: boolean;
}

export const Label = styled.div`
  width: min-content;
  position: relative;
  pointer-events: none;
  white-space: nowrap;
  font-size: 0.75rem;
  line-height: 1rem;

  ${(p: IInputState & IInputProps) => css`
    color: ${p.invalid ? KIND_COLORS.danger.A100 : '#9b9b9b'};
  `};
`;
