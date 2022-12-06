import { css, cx } from '@emotion/css';
import styled from '@emotion/styled';
import { Handler, useDrag } from '@use-gesture/react';
import { cloneElement, useCallback, useEffect, useRef } from 'react';
import { toPx } from '../../lib/to-px';
import { coerceIn } from '../../utils/range';
import { PropChildren, HasClassname, HasStyle, HasRef } from '../../utils/type';

const drawerBaseStyle = css`
  position: absolute;
  transition: transform 0s;
  will-change: transform;

  z-index: 15;

  &[data-animate] {
    transition: transform 300ms cubic-bezier(0.22, 0.61, 0.36, 1);
  }
`;

const Backdrop = styled.div`
  display: none;

  &[data-shown] {
    display: block;
  }

  position: absolute;
  left: 0;
  top: 0;
  width: 100dvw;
  height: 100dvh;

  background: rgba(0, 0, 0, 0.3);
  transition: opacity 0s;
  will-change: opacity;

  &[data-animate] {
    transition: opacity 300ms cubic-bezier(0.22, 0.61, 0.36, 1);
  }

  z-index: 10;

  backdrop-filter: blur(4px);
`;

export interface DrawerConfig {
  beginThreshold?: string;
  toggleThreshold?: string;
  gestureMode?: 'disable' | 'from-left' | 'anywhere';
}

export function useDrawer({
  beginThreshold: rawBeginThreshold,
  toggleThreshold = '50%',
  gestureMode = 'anywhere',
}: DrawerConfig = {}): {
  Drawer: typeof Drawer;
  open: () => void;
  close: () => void;
} {
  let beginThreshold: string;
  if (rawBeginThreshold) {
    beginThreshold = rawBeginThreshold;
  } else {
    beginThreshold = '1vmin';
  }

  const runnersRef = useRef<Handler<'drag'>[]>([]);
  const openRef = useRef<Array<() => void>>([]);
  const closeRef = useRef<Array<() => void>>([]);

  useDrag(
    (event) => {
      if (gestureMode !== 'disable') {
        runnersRef.current.forEach((runner) => runner(event));
      }
    },
    {
      axis: 'x',
      target: window,
    },
  );

  const open = useCallback(() => {
    openRef.current.forEach((f) => f());
  }, []);

  const close = useCallback(() => {
    closeRef.current.forEach((f) => f());
  }, []);

  function Drawer<P extends HasClassname & HasStyle & HasRef>({
    children,
  }: PropChildren<P>): JSX.Element {
    if (children.props.ref) {
      throw new Error('Drawer children should not have ref');
    }
    const childRef = useRef<HTMLElement>();
    const backdropRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      let isOpen = false;
      let isDragging = false;
      let ignoreGesture = false;
      let lastAnimation: number;

      function openDrawer() {
        if (!childRef.current) {
          return;
        }
        startAnimation();
        isOpen = true;
        childRef.current.style.transform = 'translateX(0)';
      }

      function closeDrawer() {
        if (!childRef.current) {
          return;
        }
        startAnimation();
        isOpen = false;
        childRef.current.style.transform = `translateX(-100%)`;
      }

      function startAnimation() {
        if (lastAnimation) {
          clearTimeout(lastAnimation);
        }
        const child = childRef.current;
        const backdrop = backdropRef.current;
        if (!child || !backdrop) {
          return;
        }
        child.dataset['animate'] = '';
        backdrop.dataset['animate'] = '';
        lastAnimation = window.setTimeout(() => {
          delete child.dataset['animate'];
          delete backdrop.dataset['animate'];
        }, 300);
      }

      const handler: Handler<'drag'> = ({
        down,
        movement: [mx, _my],
        values: [vx, _vy],
        first,
      }) => {
        if (!childRef.current) {
          return;
        }

        if (first) {
          if (vx > 64 && !isOpen) {
            ignoreGesture = true;
          }
          delete childRef.current.dataset['animate'];
        }

        if (ignoreGesture) {
          if (!down) {
            ignoreGesture = false;
          }
          return;
        }

        const evaluateToPx = (s: string) => toPx(s, childRef.current, 'width');

        const length = childRef.current.offsetWidth;

        if (!isOpen) {
          const threshold = evaluateToPx(beginThreshold);
          if (backdropRef.current) {
            backdropRef.current.dataset['shown'] = '';
          }
          if (mx > threshold && !isDragging) {
            isDragging = true;
            startAnimation();
          }
          if (isDragging) {
            childRef.current.style.transform = `translateX(calc(-100% + min(${vx}px, 100%)))`;
            if (backdropRef.current) {
              backdropRef.current.style.opacity = `${coerceIn(
                vx / length,
                0,
                1,
              )}`;
            }
          }
        } else {
          childRef.current.style.transform = `translateX(min(0px, max(${mx}px, -100%)))`;
          if (backdropRef.current) {
            backdropRef.current.dataset['shown'] = '';
            backdropRef.current.style.opacity = `${coerceIn(
              (length + mx) / length,
              0,
              1,
            )}`;
          }
        }
        if (!down) {
          isDragging = false;

          const threshold = evaluateToPx(toggleThreshold);

          const toOpen = !isOpen
            ? mx > 0 && vx > threshold
            : length + mx > threshold;

          if (toOpen) {
            openDrawer();
            if (backdropRef.current) {
              backdropRef.current.style.opacity = `1`;
            }
          } else {
            closeDrawer();
            if (backdropRef.current) {
              backdropRef.current.style.opacity = `0`;
            }
            setTimeout(() => {
              if (backdropRef.current) {
                delete backdropRef.current.dataset['shown'];
              }
            }, 300);
          }
        }
      };

      openRef.current.push(openDrawer);
      closeRef.current.push(closeDrawer);
      runnersRef.current.push(handler);
      return () => {
        runnersRef.current.splice(runnersRef.current.indexOf(handler), 1);
        openRef.current.splice(openRef.current.indexOf(openDrawer), 1);
        closeRef.current.splice(closeRef.current.indexOf(closeDrawer), 1);
      };
    }, []);

    const childrenWithProps = cloneElement(children, {
      ...children.props,
      className: cx(children.props.className, drawerBaseStyle),

      ref: childRef,
      style: {
        ...children.props.style,

        transform: `translateX(calc(-100%))`,
        left: 0,
      },
    });
    return (
      <>
        {childrenWithProps}
        <Backdrop ref={backdropRef} />
      </>
    );
  }

  return {
    Drawer,
    open,
    close,
  };
}
