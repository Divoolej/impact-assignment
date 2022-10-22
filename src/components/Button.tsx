import styled, { css } from 'styled-components';

type ButtonProps = {
  primary?: boolean;
  small?: boolean;
};

export const Button = styled.button<ButtonProps>`
  padding: 11px 24px;
  border: none;
  border-radius: 4px;
  background: var(--blue);
  color: var(--white);
  cursor: pointer;

  &:hover {
    opacity: 0.94;
  }

  ${({ primary }) => primary && 'background: var(--green);'}
  ${({ small }) => small && 'padding: 8px 16px;'}
  ${({ disabled }) =>
    disabled &&
    css`
      background: var(--gray);
      cursor: not-allowed;

      &:hover {
        opacity: 1;
      }
    `}
`;
