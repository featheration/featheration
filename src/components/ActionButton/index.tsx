import { css, cx } from '@emotion/css';
import styled from '@emotion/styled';
import {
  ButtonHTMLAttributes,
  cloneElement,
  MouseEventHandler,
  PropsWithChildren,
  ReactElement,
} from 'react';
import { MediaBreakpoints } from '../../styles/breakpoints';
import { HasClassname, PropChildren } from '../../utils/type';

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

const styleAnimateIn = css`
  @keyframes forward {
    from {
      opacity: 0;
      transform: translate(-50%, -50%) rotate(-90deg);
    }
    to {
      opacity: 1;
      transform: translate(-50%, -50%) rotate(0deg);
    }
  }
  @keyframes backward {
    from {
      opacity: 0;
      transform: translate(-50%, -50%) rotate(90deg);
    }
    to {
      opacity: 1;
      transform: translate(-50%, -50%) rotate(0deg);
    }
  }

  &:not(.reverse) {
    animation: forward 0.2s linear;
  }

  &.reverse {
    animation: backward 0.2s linear;
  }
`;

const styleAnimateOut = css`
  @keyframes forward {
    from {
      opacity: 1;
      transform: translate(-50%, -50%) rotate(0deg);
    }
    to {
      opacity: 0;
      transform: translate(-50%, -50%) rotate(90deg);
    }
  }
  @keyframes backward {
    from {
      opacity: 1;
      transform: translate(-50%, -50%) rotate(0deg);
    }
    to {
      opacity: 0;
      transform: translate(-50%, -50%) rotate(-90deg);
    }
  }

  opacity: 0;

  &:not(.reverse) {
    animation: forward 0.2s linear;
  }

  &.reverse {
    animation: backward 0.2s linear;
  }
`;

export interface ActionButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
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
  ...props
}: PropsWithChildren<ActionButtonProps>): JSX.Element {
  return (
    <ActionButtonBase
      style={{
        '--button-background-normal': backgroundNormal,
        '--button-background-hover': backgroundHover,
        '--button-background-active': backgroundActive,
        '--text': color ?? '',
      }}
      {...props}
    >
      {children}
    </ActionButtonBase>
  );
}

export interface AnimateProps {
  reverse?: boolean;
}

ActionButton.AnimateIn = AnimateIn;
function AnimateIn<P extends HasClassname>({
  children,
  reverse,
}: AnimateProps & PropChildren<P>): JSX.Element {
  return cloneElement(children, {
    ...children.props,
    className: cx(
      children.props.className,
      styleAnimateIn,
      reverse && 'reverse',
    ),
  });
}

ActionButton.AnimateOut = AnimateOut;
function AnimateOut<P extends HasClassname>({
  children,
  reverse,
}: AnimateProps & PropChildren<P>): JSX.Element {
  return cloneElement(children, {
    ...children.props,
    className: cx(
      children.props.className,
      styleAnimateOut,
      reverse && 'reverse',
    ),
  });
}
