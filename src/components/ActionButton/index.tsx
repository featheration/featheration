import { styled } from '@linaria/react';
import { PropsWithChildren } from 'react';

const StyledButton = styled.button`
  // As Material Design said, its size should be 56 x 56dp.
  // We're on the web, so we use px instead of dp.
  width: 56px;
  height: 56px;

  border-radius: 50%;
`;

export function ActionButton({ children }: PropsWithChildren<{}>): JSX.Element {
  return <StyledButton>{children}</StyledButton>;
}
