import { cx } from '@linaria/core';
import { styled } from '@linaria/react';
import {
  cloneElement,
  MouseEventHandler,
  PropsWithChildren,
  ReactElement,
} from 'react';
import { MediaBreakpoints } from '../../styles/breakpoints';

const ActionButtonBase = styled.button`
  // As Material Design said, its size should be 56 x 56dp(same as px on the web).
  width: 56px;
  height: 56px;
  padding: 16px;

  font-size: 24px;

  border-radius: 28px;

  position: relative;

  & > * {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  @keyframes action-button-animation-in {
    from {
      opacity: 0;
      transform: translate(-50%, -50%) rotate(-90deg);
    }
    to {
      opacity: 1;
      transform: translate(-50%, -50%) rotate(0deg);
    }
  }

  @keyframes action-button-animation-in-reverse {
    from {
      opacity: 0;
      transform: translate(-50%, -50%) rotate(90deg);
    }
    to {
      opacity: 1;
      transform: translate(-50%, -50%) rotate(0deg);
    }
  }

  & > .animation-in {
    animation: action-button-animation-in 0.2s linear;
  }

  & > .animation-in-reverse {
    animation: action-button-animation-in-reverse 0.2s linear;
  }

  @keyframes action-button-animation-out {
    from {
      opacity: 1;
      transform: translate(-50%, -50%) rotate(0deg);
    }
    to {
      opacity: 0;
      transform: translate(-50%, -50%) rotate(90deg);
    }
  }

  @keyframes action-button-animation-out-reverse {
    from {
      opacity: 1;
      transform: translate(-50%, -50%) rotate(0deg);
    }
    to {
      opacity: 0;
      transform: translate(-50%, -50%) rotate(-90deg);
    }
  }

  & > .animation-out {
    animation: action-button-animation-out 0.2s linear;
  }

  & > .animation-out-reverse {
    animation: action-button-animation-out-reverse 0.2s linear;
  }

  & > .animation-out,
  & > .animation-out-reverse {
    opacity: 0;
  }

  position: absolute;
  right: 24px;
  bottom: 24px;

  @media screen and (max-width: ${MediaBreakpoints.Small}) {
    right: 16px;
    bottom: 16px;
  }

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
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export function ActionButton({
  children,
  backgroundNormal,
  backgroundHover,
  backgroundActive,
  color,
  onClick,
}: PropsWithChildren<ActionButtonProps>): JSX.Element {
  return (
    <ActionButtonBase
      style={{
        '--button-background-normal': backgroundNormal,
        '--button-background-hover': backgroundHover,
        '--button-background-active': backgroundActive,
        '--text': color ?? '',
      }}
      onClick={onClick}
    >
      {children}
    </ActionButtonBase>
  );
}

ActionButton.AnimationIn = AnimationIn;
function AnimationIn<P extends { className?: string }>({
  children,
  reverse,
}: {
  children: ReactElement<P>;
  reverse?: boolean;
}): JSX.Element {
  return cloneElement(children, {
    ...children.props,
    className: cx(
      children.props.className,
      reverse ? 'animation-in-reverse' : 'animation-in',
    ),
  });
}

ActionButton.AnimationOut = AnimationOut;
function AnimationOut<P extends { className?: string }>({
  children,
  reverse,
}: {
  children: ReactElement<P>;
  reverse?: boolean;
}): JSX.Element {
  return cloneElement(children, {
    ...children.props,
    className: cx(
      children.props.className,
      reverse ? 'animation-out-reverse' : 'animation-out',
    ),
  });
}
