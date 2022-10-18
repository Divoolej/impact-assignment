import styled from 'styled-components';

export const Button = styled.button<{ primary: boolean }>`
  padding: 8px;
  border: none;
  border-radius: 4px;
  color: var(--white);
  cursor: pointer;

  ${({ primary }) => 'background: var(--green);'}
`;
