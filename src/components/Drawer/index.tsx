import { css, cx } from '@linaria/core';
import { Handler, useDrag } from '@use-gesture/react';
import { cloneElement, RefObject, useEffect, useRef, useState } from 'react';
import { toPx } from '../../lib/to-px';
import { coerceIn } from '../../utils/range';
import { PropChildren, HasClassname, HasStyle, HasRef } from '../../utils/type';

export const Side = Object.freeze({
  Left: 'left',
  Right: 'right',
  Top: 'top',
  Bottom: 'bottom',
});
export type Side = typeof Side[keyof typeof Side];

const drawerBaseStyle = css`
  position: absolute;
  transition: transform 0s;
  will-change: transform;

  &[data-animate] {
    transition: transform 300ms cubic-bezier(0.22, 0.61, 0.36, 1);
  }
`;

export interface DrawerConfig<Global extends boolean> {
  side: Side;
  beginThreshold?: string;
  toggleThreshold?: string;
  global?: Global;
}

export function useDrawer<Global extends boolean>({
  side,
  beginThreshold: rawBeginThreshold,
  toggleThreshold = '50%',
  global,
}: DrawerConfig<Global>): {
  Drawer: typeof Drawer;
} {
  let beginThreshold: string;
  if (rawBeginThreshold) {
    beginThreshold = rawBeginThreshold;
  } else {
    beginThreshold = '1vmin';
  }
  const runnersRef = useRef<Handler<'drag'>[]>([]);
  useDrag(
    (event) => {
      runnersRef.current.forEach((runner) => runner(event));
    },
    {
      axis: side === Side.Left || side === Side.Right ? 'x' : 'y',
      target: window,
    },
  );

  function Drawer<P extends HasClassname & HasStyle & HasRef>({
    children,
  }: PropChildren<P>): JSX.Element {
    if (children.props.ref) {
      throw new Error('Drawer children should not have ref');
    }
    const ref = useRef<HTMLElement>();

    useEffect(() => {
      let isOpen = false;
      let isDragging = false;
      let removeAnimationId: number;

      let multiplier: number;
      let transformFunction: string;
      switch (side) {
        case Side.Left:
          multiplier = 1;
          transformFunction = 'translateX';
          break;
        case Side.Right:
          multiplier = -1;
          transformFunction = 'translateX';
          break;
        case Side.Top:
          multiplier = 1;
          transformFunction = 'translateY';
          break;
        case Side.Bottom:
          multiplier = -1;
          transformFunction = 'translateY';
          break;
      }

      function open() {
        if (!ref.current) {
          return;
        }
        isOpen = true;
        ref.current.style.transform = `${transformFunction}(0)`;
      }

      function close() {
        if (!ref.current) {
          return;
        }
        isOpen = false;
        ref.current.style.transform = `${transformFunction}(calc(${multiplier} * -100%))`;
      }

      const handler: Handler<'drag'> = ({
        down,
        direction,
        movement,
        values,
      }) => {
        if (!ref.current) {
          return;
        }
        switch (side) {
          case Side.Left:
          case Side.Right: {
            const length = ref.current.offsetWidth;
            const parentLength =
              ref.current.parentElement?.offsetWidth ?? length;
            const index = 0;

            const currentlyDrawn =
              side === Side.Left ? values[index] : parentLength - values[index];
            const movementX = multiplier * movement[index];

            if (!isOpen) {
              const threshold = toPx(beginThreshold, ref.current, 'width');
              if (movementX > threshold && !isDragging) {
                isDragging = true;
                ref.current.dataset['animate'] = '';
                removeAnimationId = window.setTimeout(() => {
                  if (ref.current) {
                    delete ref.current.dataset['animate'];
                  }
                }, 300);
              }
              if (isDragging) {
                ref.current.style.transform = `${transformFunction}(calc(${multiplier} * (-100% + min(${currentlyDrawn}px, 100%))))`;
              }
            } else {
              ref.current.style.transform = `${transformFunction}(calc(${multiplier} * min(0px, max(${movementX}px, -100%))))`;
            }
            if (!down) {
              isDragging = false;
              clearInterval(removeAnimationId);
              ref.current.dataset['animate'] = '';
              removeAnimationId = window.setTimeout(() => {
                if (ref.current) {
                  delete ref.current.dataset['animate'];
                }
              }, 300);

              const threshold = toPx(toggleThreshold, ref.current, 'width');

              const condition = !isOpen
                ? Math.sign(movement[index]) === multiplier &&
                  currentlyDrawn > threshold
                : length + movementX > threshold;

              if (condition) {
                open();
              } else {
                close();
              }
            }
            break;
          }
          case Side.Top:
          case Side.Bottom: {
            const length = ref.current.offsetHeight;
            const parentLength =
              ref.current.parentElement?.offsetHeight ?? length;
            const index = 1;

            const currentlyDrawn =
              side === Side.Top ? values[index] : parentLength - values[index];
            const movementX = multiplier * movement[index];

            if (!isOpen) {
              const threshold = toPx(beginThreshold, ref.current, 'height');
              if (movementX > threshold && !isDragging) {
                isDragging = true;
                ref.current.dataset['animate'] = '';
                removeAnimationId = window.setTimeout(() => {
                  if (ref.current) {
                    delete ref.current.dataset['animate'];
                  }
                }, 300);
              }
              if (isDragging) {
                ref.current.style.transform = `${transformFunction}(calc(${multiplier} * (-100% + min(${currentlyDrawn}px, 100%))))`;
              }
            } else {
              ref.current.style.transform = `${transformFunction}(calc(${multiplier} * min(0px, max(${movementX}px, -100%))))`;
            }
            if (!down) {
              isDragging = false;
              clearInterval(removeAnimationId);
              ref.current.dataset['animate'] = '';
              removeAnimationId = window.setTimeout(() => {
                if (ref.current) {
                  delete ref.current.dataset['animate'];
                }
              }, 300);

              const threshold = toPx(toggleThreshold, ref.current, 'height');

              const condition = !isOpen
                ? Math.sign(movement[index]) === multiplier &&
                  currentlyDrawn > threshold
                : length + movementX > threshold;

              if (condition) {
                open();
              } else {
                close();
              }
            }
            break;
          }
        }
      };

      runnersRef.current.push(handler);
      return () => {
        runnersRef.current.splice(runnersRef.current.indexOf(handler), 1);
      };
    }, []);

    const childrenWithProps = cloneElement(children, {
      ...children.props,
      className: cx(children.props.className, drawerBaseStyle),
      ref,
      style: {
        ...children.props.style,

        ...(side === Side.Left
          ? { left: 0, transform: 'translateX(-100%)' }
          : {}),
        ...(side === Side.Right
          ? { right: 0, transform: 'translateX(100%)' }
          : {}),
        ...(side === Side.Top
          ? { top: 0, transform: 'translateY(-100%)' }
          : {}),
        ...(side === Side.Bottom
          ? { bottom: 0, transform: 'translateY(100%)' }
          : {}),
      },
    });
    return childrenWithProps;
  }

  return {
    Drawer,
  };
}
