import { css, cx } from '@linaria/core';
import { Handler, useDrag } from '@use-gesture/react';
import { cloneElement, RefObject, useEffect, useRef } from 'react';
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
`;

export interface DrawerProps {
  drawSpeedMultiplier?: number;
  dragHandle?: HTMLElement | RefObject<HTMLElement>;
}

export function useDrawer(side: Side): {
  bind: ReturnType<typeof useDrag>;
  Drawer: typeof Drawer;
} {
  const runnersRef = useRef<Handler<'drag'>[]>([]);
  const bind = useDrag(
    (event) => {
      runnersRef.current.forEach((runner) => runner(event));
    },
    {
      axis: side === Side.Left || side === Side.Right ? 'x' : 'y',
    },
  );

  function Drawer<P extends HasClassname & HasStyle & HasRef>({
    drawSpeedMultiplier = 3,
    children,
  }: DrawerProps & PropChildren<P>): JSX.Element {
    if (children.props.ref) {
      throw new Error('Drawer children should not have ref');
    }
    const ref = useRef<HTMLElement>();

    useEffect(() => {
      const drawnRef = {
        value: 0,
        uncomitted: 0,
      };

      const handler: Handler<'drag'> = ({ down, direction, movement }) => {
        if (!ref.current) {
          return;
        }
        switch (side) {
          case Side.Left:
          case Side.Right: {
            const lr = side === Side.Left ? 1 : -1;
            drawnRef.uncomitted = lr * movement[0] * drawSpeedMultiplier;
            drawnRef.uncomitted = Math.min(
              Math.max(-drawnRef.value, drawnRef.uncomitted),
              ref.current.offsetWidth - drawnRef.value,
            );
            console.log(drawnRef.value, drawnRef.uncomitted);
            ref.current.style.transform = `translateX(calc(${lr} * (-100% + min(${
              drawnRef.value + drawnRef.uncomitted
            }px, 100%))))`;
            if (!down) {
              drawnRef.value += drawnRef.uncomitted;
              drawnRef.uncomitted = 0;
            }
            break;
          }
          case Side.Top:
          case Side.Bottom: {
            const lr = side === Side.Top ? 1 : -1;
            drawnRef.uncomitted = lr * movement[1] * drawSpeedMultiplier;
            drawnRef.uncomitted = Math.min(
              Math.max(-drawnRef.value, drawnRef.uncomitted),
              ref.current.offsetWidth - drawnRef.value,
            );
            ref.current.style.transform = `translateY(calc(${lr} * (-100% + min(${
              drawnRef.value + drawnRef.uncomitted
            }px, 100%))))`;
            if (!down) {
              drawnRef.value += drawnRef.uncomitted;
              drawnRef.uncomitted = 0;
            }
            break;
          }
        }
      };

      handler({ direction: [0, 0], movement: [0, 0] } as any);

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

  return { bind, Drawer };
}
