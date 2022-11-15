import { styled } from '@linaria/react';
import { PropsWithChildren } from 'react';

const ActionButtonBase = styled.button`
  // As Material Design said, its size should be 56 x 56dp(same as px on the web).
  width: 56px;
  height: 56px;
  padding: 16px;

  font-size: 24px;

  border-radius: 28px;

  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  right: 24px;
  bottom: 24px;

  text-transform: uppercase;

  background: var(--button-background-normal);
  color: var(--text);

  outline-color: var(--button-background-normal);

  &:focus-visible {
    outline-width: 2px;
    outline-style: solid;
    outline-offset: 2px;
  }

  &:hover {
    background: var(--button-background-hover);
    outline-color: var(--button-background-hover);
  }

  &:active {
    background: var(--button-background-active);
    outline-color: var(--button-background-active);
  }
`;

export interface ActionButtonProps {
  backgroundNormal: string;
  backgroundHover: string;
  backgroundActive: string;
  color?: string;
}

export function ActionButton({
  children,
  backgroundNormal,
  backgroundHover,
  backgroundActive,
  color,
}: PropsWithChildren<ActionButtonProps>) {
  return (
    <ActionButtonBase
      style={{
        '--button-background-normal': backgroundNormal,
        '--button-background-hover': backgroundHover,
        '--button-background-active': backgroundActive,
        '--text': color ?? '',
      }}
    >
      {children}
    </ActionButtonBase>
  );
}
